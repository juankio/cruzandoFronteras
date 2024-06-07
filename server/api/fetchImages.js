import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios');

export default defineEventHandler(async (event) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/djcirz1cc/resources/image`;

  try {
    const response = await axios.get(cloudinaryUrl, {
      params: {
        type: 'upload',
        prefix: 'niños/',
      },
      auth: {
        username: '277212769995639',
        password: '0_ghKfJ-Ms_VArdhBxByPoeAlPU',
      },
    });

    // Filtrar y mapear solo los datos necesarios
    const images = response.data.resources.map((image) => ({
      secure_url: image.secure_url,
      public_id: image.public_id,
    }));

    return images;
  } catch (error) {
    console.error('Error fetching images from Cloudinary', error.message);
    return [];
  }
});
