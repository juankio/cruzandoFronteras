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
      if (!acc[folder]) acc[folder] = { description: '', images: [] };
      
      let imageData = {
        secure_url: resource.secure_url,
        public_id: resource.public_id,
      };

      // Verifica si el archivo es un texto
      if (resource.format === 'txt') {
        // Obtener el contenido del archivo de texto
        const textResponse = await fetch(resource.secure_url);
        const textContent = await textResponse.text();
        
        imageData.content = textContent; // Agrega el contenido del archivo de texto
      }

      // Verificar si la imagen tiene la metadata "last_updated"
      if (resource.last_updated && resource.last_updated.updated_at) {
        // Hacer una llamada adicional para obtener la metadata completa
        const metadataResponse = await fetch(`${cloudinaryUrl}/upload/${resource.public_id}`, {
          headers: {
            'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
          }
        });

        if (metadataResponse.ok) {
          const metadata = await metadataResponse.json();
          console.log(`Metadata for ${resource.public_id}:`, JSON.stringify(metadata, null, 2)); // Log de la metadata obtenida
          imageData.metadata = metadata; // Agregar la metadata completa

          // Si la imagen tiene una descripción, asignarla a la carpeta
          if (metadata.context && metadata.context.custom && metadata.context.custom.alt) {
            acc[folder].description = metadata.context.custom.alt;
          }
        } else {
          console.log(`Failed to fetch metadata for ${resource.public_id}: ${metadataResponse.statusText}`);
        }
      }

      acc[folder].images.push(imageData);
      return acc;
    }, Promise.resolve({}));

    return imagesByFolder;
  } catch (error) {
    return { error: error.message };
  }
});
