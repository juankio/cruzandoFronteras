<template>
  <div>
    <div class="grid grid-cols-1 gap-y-16">
      <div v-for="(proyecto, index) in proyectos" :key="index">
        <div class="w-full mb-8">
          <div class="group">
            <h3 class="mt-4 text-2xl text-orange-500 dark:text-orange-400 font-bold">{{ proyecto.titulo }}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">
              {{ proyecto.descripcion }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 xl:grid-cols-4 mt-4">
            <div v-for="(imagen, key) in Object.values(proyecto.img)" :key="key"
              class="w-full h-full shadow-2xl hover:shadow-yellow-500/50 dark:hover:shadow-yellow-300 group">
              <div @click="isOpen = true">
                <UModal v-model="isOpen">
                  <div class="p-4 dark:bg-black">
                    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-black dark:bg-white">
                      <p class="text-orange-500 dark:text-orange-400">{{ imagen.titulo }}</p>
                      <img :src="imagen.ime" :alt="imagen.titulo" class="h-full w-full object-cover" />
                    </div>
                  </div>
                </UModal>



                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-black dark:bg-white">
                  <img :src="imagen.ime" :alt="imagen.titulo"
                    class="h-full w-full object-fill group-hover:opacity-75" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->

    <!-- Fondo oscurecido -->
    <div v-if="isOpen" class="fixed inset-0 bg-white dark:bg-black opacity-50 z-50" @click="isOpen = false"></div>
  </div>
</template>

<script setup>

const isOpen = ref(false)
const proyectos = ref([
  {
    titulo: "MODALIDAD FAMILIAR",
    descripcion: "Descripción del Proyecto de Yopal.",
    img: {
      img1: {
        titulo: "Imagen 1",
        ime: "https://picsum.photos/200/300",
      },
      img2: {
        titulo: "Imagen 2",
        ime: "https://picsum.photos/300/200",
      },
      img3: {
        titulo: "Imagen 3",
        ime: "https://picsum.photos/250/250",
      },
      img4: {
        titulo: "Imagen 4",
        ime: "https://picsum.photos/350/150",
      },
    },
  },
  {
    titulo: "Proyecto de Casanare",
    descripcion: "Descripción del Proyecto de Casanare.",
    img: {
      img1: {
        titulo: "Imagen 1",
        ime: "https://picsum.photos/400/200",
      },
      img2: {
        titulo: "Imagen 2",
        ime: "https://picsum.photos/350/250",
      },
      img3: {
        titulo: "Imagen 3",
        ime: "https://picsum.photos/300/300",
      },
    },
  },
]);
</script>
