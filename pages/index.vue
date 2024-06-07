<template>
  <div>
    <div>
      <h2
        class="text-4xl md:text-6xl text-center font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text animate-shine font-sans">
        NUESTROS PROYECTOS
      </h2>
    </div>
    <div>
      <h3 class="mt-4 text-2xl text-orange-500 dark:text-orange-400 font-bold font-sans">MODALIDAD FAMILIAR</h3>
      <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white font-sans">
        Descripción del Proyecto de Yopal.
      </p>
    </div>
    <div v-if="error" class="text-red-500 text-center">
      <p>Error fetching images: {{ error.message }}</p>
    </div>
    <div v-else-if="!images.length" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else class="grid grid-cols-1 gap-y-16">
      <div class="w-full mb-8">
        <div class="grid grid-cols-2 gap-4 xl:grid-cols-4 mt-4">
          <div v-for="(imagen, key) in images" :key="key"
            class="w-full h-full shadow-2xl hover:shadow-orange-500 dark:hover:shadow-orange-300 group">
            <div @click="openModal(imagen)">
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-black dark:bg-white">
                <NuxtImg :src="imagen.secure_url" :alt="imagen.public_id"
                  class="h-full w-full object-fill group-hover:opacity-75" />
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
        <h2 class="text-orange-500 dark:text-orange-400 text-center font-bold text-4xl mb-4">{{ selectedImage.public_id
          }}</h2>
        <div class="flex justify-center">
          <NuxtImg :src="selectedImage.secure_url" :alt="selectedImage.public_id"
            class="max-h-screen max-w-full object-contain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const isOpen = ref(false)
const selectedImage = ref({})
const { data: images, error } = await useFetch('/api/fetchImages')

const openModal = (image) => {
  selectedImage.value = image
  isOpen.value = true
}
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
</style>
