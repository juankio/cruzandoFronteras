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
    const imagesByFolder = await data.resources.reduce(async (accPromise, resource) => {
      const acc = await accPromise;
      const folder = resource.folder.split('/')[1];
      if (!acc[folder]) acc[folder] = [];
      
      // Verifica si el archivo es un texto
      if (resource.format === 'txt') {
        // Obtener el contenido del archivo de texto
        const textResponse = await fetch(resource.secure_url);
        const textContent = await textResponse.text();
        
        acc[folder].push({
          secure_url: resource.secure_url,
          public_id: resource.public_id,
          content: textContent, // Agrega el contenido del archivo de texto
        });
      } else {
        acc[folder].push({
          secure_url: resource.secure_url,
          public_id: resource.public_id,
        });
      }
      return acc;
    }, Promise.resolve({}));

    return imagesByFolder;
  } catch (error) {
    console.error('Error fetching images from Cloudinary', error.message);
    return { error: error.message };
  }
});
