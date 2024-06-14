export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cloudinaryUrl = config.cloudinaryUrl;
  const username = config.cloudinaryUser;
  const password = config.cloudinaryPassword;

  if (!cloudinaryUrl || !username || !password) {
    throw new Error('Missing Cloudinary configuration');
  }

  try {
    const response = await fetch(`${cloudinaryUrl}?type=upload&prefix=Fundacion/`, {
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

    const firstImage = {
      secure_url: data.resources[0].secure_url,
      public_id: data.resources[0].public_id,
    };

    return firstImage;
  } catch (error) {
    return { error: error.message };
  }
});
