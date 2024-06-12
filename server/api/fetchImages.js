export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cloudinaryUrl = config.cloudinaryUrl;
  const username = config.cloudinaryUser;
  const password = config.cloudinaryPassword;
 
  
  if (!cloudinaryUrl || !username || !password) {
    throw new Error('Missing Cloudinary configuration');
  }

  try {
    const response = await fetch(`${cloudinaryUrl}?type=upload&prefix=proyectos/`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching images: ${response.statusText}`);
    }

    const data = await response.json();

    // Filtrar y mapear solo los datos necesarios, organizándolos por carpeta
    const imagesByFolder = data.resources.reduce((acc, image) => {
      const folder = image.folder.split('/')[1];
      if (!acc[folder]) acc[folder] = [];
      acc[folder].push({
        secure_url: image.secure_url,
        public_id: image.public_id,
      });
      return acc;
    }, {});

    return imagesByFolder;
  } catch (error) {
    console.error('Error fetching images from Cloudinary', error.message);
    return { error: error.message };
  }
});
