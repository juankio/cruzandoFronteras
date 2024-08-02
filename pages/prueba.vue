<template>
  <div>
    <h1>Images from Cloudinary</h1>
    <div v-if="error">
      <p>Error fetching images: {{ error }}</p>
    </div>
    <div v-else-if="!images">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-for="image in images" :key="image.public_id">
        <NuxtImg :src="image.secure_url" :alt="image.public_id" width="300" height="200" />
      </div>
    </div>
  </div>
</template>

<script setup>

const { data: images, error } = useFetch('/api/fetchImages')
</script>
