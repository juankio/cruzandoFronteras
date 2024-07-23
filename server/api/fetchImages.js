import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 * 10, checkperiod: 60 * 5 }); // Cache TTL: 10 minutes, check for expired keys every 5 minutes

async function fetchDataFromCloudinary(cloudinaryUrl, username, password, prefix, nextCursor = null) {
  console.log('Fetching data from Cloudinary with prefix:', prefix);
  let url = `${cloudinaryUrl}?type=upload&prefix=${prefix}`;
  if (nextCursor) {
    url += `&next_cursor=${nextCursor}`;
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching images: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

async function fetchAllDataFromCloudinary(cloudinaryUrl, username, password, prefix) {
  let allResources = [];
  let nextCursor = null;

  do {
    const data = await fetchDataFromCloudinary(cloudinaryUrl, username, password, prefix, nextCursor);
    allResources = allResources.concat(data.resources);
    nextCursor = data.next_cursor;
  } while (nextCursor);

  return { resources: allResources };
}

async function fetchFolderNames(cloudinaryUrl, username, password, prefix) {
  console.log('Fetching folder names with prefix:', prefix);
  const cacheKey = `folders_${prefix}`;
  const cachedFolders = cache.get(cacheKey);

  if (cachedFolders) {
    return cachedFolders;
  }

  const data = await fetchAllDataFromCloudinary(cloudinaryUrl, username, password, prefix);
  const folders = new Set();

  if (data.resources) {
    for (const resource of data.resources) {
      const folderPath = resource.public_id.split('/').slice(0, -1).join('/');
      folders.add(folderPath);
    }
  }

  const folderArray = Array.from(folders);
  cache.set(cacheKey, folderArray); // Cache the folder names
  return folderArray;
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

  const metadata = await metadataResponse.json();
  return metadata;
}

async function getImagesByFolder(cloudinaryUrl, username, password, prefix) {
  const cacheKey = `images_${prefix}`;
  const cachedImages = cache.get(cacheKey);

  if (cachedImages) {
    return cachedImages;
  }

  const data = await fetchAllDataFromCloudinary(cloudinaryUrl, username, password, prefix);
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

  cache.set(cacheKey, folderStructure); // Cache the images by folder
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
    console.error('Error:', error);
    return { error: error.message };
  }
});
