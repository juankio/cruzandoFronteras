<template>
  <div>
    <div class="mt-10" v-for="(proyecto, index) in proyectos" :key="index">
      <h1 class="font-bold text-xl">{{ proyecto.titulo }}</h1>
      <p>{{ proyecto.descripcion }}</p>
      <div class="grid grid-cols-1 pt-10 md:grid-cols-2 gap-4 xl:grid-cols-4 ">
        <div v-for="(imagen, key) in proyecto.img" :key="key" class="w-full h-full shadow-2xl">
          <div class="bg-green-200 p-4 font-bold">{{ imagen.titulo }}</div>
          <div class="w-full h-56">
            <img class="w-full h-full object-cover" :src="imagen.ime" :alt="imagen.titulo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = "light";
  },
});
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
