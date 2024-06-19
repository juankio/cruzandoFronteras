
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

async function fetchMetadata(cloudinaryUrl, username, password, publicId) {
  const metadataResponse = await fetch(`${cloudinaryUrl}/upload/${publicId}`, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
  });

  if (!metadataResponse.ok) {
    return null; 
  }

  return await metadataResponse.json();
}

async function getImagesByFolder(cloudinaryUrl, username, password, prefix) {
  const data = await fetchDataFromCloudinary(cloudinaryUrl, username, password, prefix);
  const folderStructure = {};

  for (const resource of data.resources) {
    const path = resource.public_id.replace(prefix, '').split('/');
    let currentLevel = folderStructure;

    for (let index = 0; index < path.length; index++) {
      const folder = path[index];

      if (index === path.length - 1) {
       
        if (!currentLevel.images) {
          currentLevel.images = [];
        }

        let imageData = {
          secure_url: resource.secure_url,
          public_id: resource.public_id,
        };

       
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
        
        if (!currentLevel[folder]) {
          currentLevel[folder] = {};
        }
        currentLevel = currentLevel[folder];
      }
    }
  }

  return folderStructure;
}


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
    return { error: error.message };
  }
});
