export default defineEventHandler(async (event) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/djcirz1cc/resources/image`;
  const username = '277212769995639';
  const password = '0_ghKfJ-Ms_VArdhBxByPoeAlPU';

  try {
    const response = await fetch(`${cloudinaryUrl}?type=upload&prefix=niños/`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching images: ${response.statusText}`);
    }

    const data = await response.json();

    // Filtrar y mapear solo los datos necesarios
    const images = data.resources.map((image) => ({
      secure_url: image.secure_url,
      public_id: image.public_id,
    }));

    return images;
  } catch (error) {
    console.error('Error fetching images from Cloudinary', error.message);
    return [];
  }
});
