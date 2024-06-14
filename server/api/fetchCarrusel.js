
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const cloudinaryUrl = config.cloudinaryUrl;
    const username = config.cloudinaryUser;
    const password = config.cloudinaryPassword;
  
  
    if (!cloudinaryUrl || !username || !password) {
      throw new Error('Missing Cloudinary configuration');
    }
  
    try {
      const response = await fetch(`${cloudinaryUrl}?type=upload&prefix=carrusel/`, {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        }
      });
  
  
      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.statusText}`);
      }
  
      const data = await response.json();
  
  
      if (!data.resources || data.resources.length === 0) {
        return [];
      }
  
      const images = data.resources.map(image => ({
        secure_url: image.secure_url,
        public_id: image.public_id,
      }));
  
  
      return images;
    } catch (error) {
      return { error: error.message };
    }
  });
  