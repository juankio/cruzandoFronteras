<template>
  <template>
    <div class="bg-white mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-2 lg:px-8">
      <h2 class="sr-only">Proyectos</h2>

      <div class="grid grid-cols-1 gap-y-10">
        <div v-for="(proyecto, index) in proyectos" :key="index">
          <div class="w-full mb-8">
            <div class="group">
              <h3 class="mt-4 text-sm text-gray-700 font-bold">{{ proyecto.titulo }}</h3>
              <p class="mt-1 text-lg font-medium text-gray-900">{{ proyecto.descripcion }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4 xl:grid-cols-4 mt-4">
              <div v-for="(imagen, key) in proyecto.img" :key="key" class="w-full h-full shadow-2xl group">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                  <img :src="imagen.ime" :alt="imagen.titulo"
                    class="h-full w-full object-cover object-center group-hover:opacity-75" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>

const proyectos = ref([
  {
    titulo: "Proyecto de Yopal",
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
