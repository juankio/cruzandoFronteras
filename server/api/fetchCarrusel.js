// server/api/fetchCarrusel.js
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const cloudinaryUrl = config.cloudinaryUrl;
    const username = config.cloudinaryUser;
    const password = config.cloudinaryPassword;
  
    console.log('Config:', { cloudinaryUrl, username, password });
  
    if (!cloudinaryUrl || !username || !password) {
      throw new Error('Missing Cloudinary configuration');
    }
  
    try {
      const response = await fetch(`${cloudinaryUrl}?type=upload&prefix=carrusel/`, {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        }
      });
  
      console.log('Cloudinary response status:', response.status);
      console.log('Cloudinary response statusText:', response.statusText);
  
      if (!response.ok) {
        throw new Error(`Error fetching images: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      console.log('Cloudinary response data:', data);
  
      if (!data.resources || data.resources.length === 0) {
        console.log('No images found in Cloudinary response');
        return [];
      }
  
      const images = data.resources.map(image => ({
        secure_url: image.secure_url,
        public_id: image.public_id,
      }));
  
      console.log('Fetched images:', images);
  
      return images;
    } catch (error) {
      console.error('Error fetching images from Cloudinary', error.message);
      return { error: error.message };
    }
  });
  