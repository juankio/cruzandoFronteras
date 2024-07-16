<template>
  <div>
    <div>
      <h2
        class="text-4xl md:text-6xl text-center font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text animate-shine font-sans">
        NUESTROS PROYECTOS
      </h2>
    </div>
    <div v-if="error" class="text-red-500 text-center">
      <p>Error fetching images: {{ error }}</p>
    </div>
    <div v-else-if="!Object.keys(imagesByFolder).length" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-for="(subfolders, folder) in imagesByFolder" :key="folder">
        <h3
          class="text-2xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text animate-shine font-sans mt-16">
          {{ folder }}</h3>
        <div v-for="(subfolderData, subfolder) in subfolders" :key="subfolder">
          <h4 class="text-xl md:text-3xl font-bold text-orange-400 dark:text-orange-300 mt-12">{{ subfolder }}</h4>
          <div v-if="subfolderData.description" class="text-sm md:text-2xl mb-8 text-gray-600 dark:text-gray-400">
            {{ subfolderData.description }}
          </div>
          <div class="grid grid-cols-2 gap-4 xl:grid-cols-4 mt-4">
            <div v-for="(image, key) in subfolderData.images" :key="key"
              class="relative rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
              <div @click="openModal(image)">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-black dark:bg-white">
                  <NuxtImg :src="image.secure_url" :alt="image.public_id" class="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/30 bg-opacity-50"
      @click="isOpen = false">
      <div class="bg-white/40 dark:bg-black/30 p-6 rounded-lg shadow-2xl w-50 max-w-6xl mx-auto relative" @click.stop>
        <button @click="isOpen = false" class="absolute top-2 right-2 text-black dark:text-white">
          <UIcon class="text-3xl hover:text-red-500" name="i-heroicons-x-circle-16-solid" />
        </button>
        <div class="flex justify-center">
          <NuxtImg :src="selectedImage.secure_url" :alt="selectedImage.public_id"
            class="max-h-screen max-w-full object-contain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const selectedImage = ref({});
const { data: imagesByFolder, error } = await useFetch('/api/fetchImages');

if (imagesByFolder) {
  for (const [folder, subfolders] of Object.entries(imagesByFolder.value)) {
    for (const [subfolder, subfolderData] of Object.entries(subfolders)) {
      if (subfolderData.images) {
        subfolderData.images.forEach((image, index) => {

        });
      }
    }
  }
}

useHead({
  title: 'Fundación Cruzando Fronteras - Inicio',
  meta: [
    { name: 'description', content: 'Fundación Cruzando Fronteras ofrece servicios de educación, recreación, bienestar, nutrición y salud a comunidades vulnerables en Colombia.' },
    { name: 'keywords', content: 'Fundación, Cruzando Fronteras, bienestar familiar, educación, salud, nutrición, recreación' }
  ]
});

const openModal = (image) => {
  selectedImage.value = image;
  isOpen.value = true;
};
</script>

<style scoped>
.text-orange-500 {
  color: #ff8c00;
  font-weight: 700;
  font-family: 'Permanent Marker', sans-serif;
}

@keyframes shine {
  0% {
    background-position: 200% center;
  }

  100% {
    background-position: -200% center;
  }
}

.animate-shine {
  background-size: 200%;
  animation: shine 6s linear infinite;
}

.max-h-screen {
  max-height: 90vh;
}

.max-w-full {
  max-width: 100%;
}
</style>
