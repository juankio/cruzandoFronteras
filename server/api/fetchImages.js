// Función para obtener datos de Cloudinary
async function fetchDataFromCloudinary(cloudinaryUrl, username, password, prefix) {
  const response = await fetch(`${cloudinaryUrl}?type=upload&prefix=${prefix}`, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching images: ${response.statusText}`);
  }

  return await response.json();
}

// Función para obtener los nombres de las carpetas de Cloudinary
async function fetchFolderNames(cloudinaryUrl, username, password, prefix) {
  const response = await fetch(`${cloudinaryUrl}?type=upload&prefix=${prefix}`, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching folder names: ${response.statusText}`);
  }

  const data = await response.json();
  const folders = new Set();

  if (data.resources) {
    for (const resource of data.resources) {
      const folderPath = resource.public_id.split('/').slice(0, -1).join('/');
      folders.add(folderPath);
    }
  }

  return Array.from(folders);
}

// Función para buscar actualizaciones y agregar metadatos
async function fetchMetadata(cloudinaryUrl, username, password, publicId) {
  const metadataResponse = await fetch(`${cloudinaryUrl}/upload/${publicId}`, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
  });

  if (!metadataResponse.ok) {
    console.error(`Error fetching metadata for ${publicId}: ${metadataResponse.statusText}`);
    return null; // Retorna null en caso de error
  }

  return await metadataResponse.json();
}

// Función para obtener imágenes por carpeta
async function getImagesByFolder(cloudinaryUrl, username, password, prefix) {
  const data = await fetchDataFromCloudinary(cloudinaryUrl, username, password, prefix);
  const folderStructure = {};

  for (const resource of data.resources) {
    const path = resource.public_id.replace(prefix, '').split('/');
    let currentLevel = folderStructure;

    for (let index = 0; index < path.length; index++) {
      const folder = path[index];

      if (index === path.length - 1) {
        // Estamos en el nivel de la imagen
        if (!currentLevel.images) {
          currentLevel.images = [];
        }

        let imageData = {
          secure_url: resource.secure_url,
          public_id: resource.public_id,
        };

        // Fetch additional metadata if available
        if (resource.last_updated && resource.last_updated.updated_at) {
          const metadata = await fetchMetadata(cloudinaryUrl, username, password, resource.public_id);
          if (metadata) {
            imageData.metadata = metadata;

            if (metadata.context && metadata.context.custom && metadata.context.custom.alt) {
              currentLevel.description = metadata.context.custom.alt;
            }
          }
        }

        currentLevel.images.push(imageData);
      } else {
        // Estamos en un subfolder
        if (!currentLevel[folder]) {
          currentLevel[folder] = {};
        }
        currentLevel = currentLevel[folder];
      }
    }
  }

  return folderStructure;
}

// Función para obtener la estructura completa de carpetas
async function getCompleteFolderStructure(cloudinaryUrl, username, password, prefix) {
  const folders = await fetchFolderNames(cloudinaryUrl, username, password, prefix);
  const folderStructure = {};

  for (const folder of folders) {
    const folderName = folder.replace(prefix, '').split('/')[0];
    const subfolderPrefix = `${prefix}${folderName}/`;
    if (!folderStructure[folderName]) {
      folderStructure[folderName] = {};
    }
    const imagesByFolder = await getImagesByFolder(cloudinaryUrl, username, password, subfolderPrefix);
    folderStructure[folderName] = {
      ...folderStructure[folderName],
      ...imagesByFolder,
    };
  }

  return folderStructure;
}

// Handler principal
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cloudinaryUrl = config.cloudinaryUrl;
  const username = config.cloudinaryUser;
  const password = config.cloudinaryPassword;

  if (!cloudinaryUrl || !username || !password) {
    throw new Error('Missing Cloudinary configuration');
  }

  try {
    const completeFolderStructure = await getCompleteFolderStructure(cloudinaryUrl, username, password, 'proyectos/');
    return completeFolderStructure;
  } catch (error) {
    console.error("Error in fetch: ", error);
    return { error: error.message };
  }
});
