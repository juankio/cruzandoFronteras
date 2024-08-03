<template>
    <div>
        <footer
            :class="['relative bg-red-700 dark:bg-pink-600 text-white py-8 mt-8 shadow-lg transition-nav', { 'bg-red-700 dark:bg-pink-600': isScrolled }]">
            <!-- Curva superior -->
            <div class="absolute inset-x-0 -top-24">
                <svg class="w-full h-24 text-red-700 dark:text-pink-600 rotate-180" preserveAspectRatio="none"
                    viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor"
                        d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,170.7C672,160,768,128,864,122.7C960,117,1056,139,1152,138.7C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
                    </path>
                </svg>
            </div>
            <!-- Contenido del footer -->
            <div
                class="container mx-auto px-4 flex flex-col items-center md:flex-row md:justify-evenly space-y-4 md:space-y-0">
                <div class="text-center md:text-left">
                    <p class="font-bold mb-2">Fundación Cruzando Fronteras</p>
                    <p class="font-semibold">Dirección Principal</p>
                    <p>Calle 117 No. 6 - 60 Oficina 506 barrio Usaquen</p>
                    <p>Bogotá, Colombia</p>
                </div>
                <div class="text-center md:text-left">
                    <p class="font-bold mb-2">Dirección Secundaria</p>
                    <p>Calle 19 No. 41 - 83</p>
                    <p>Villavicencio, Meta</p>
                    <p>Colombia</p>
                </div>
                <div class="text-center md:text-left">
                    <p class="font-bold mb-2">Información de Contacto</p>
                    <p><a href="tel:+573204423676" class="text-white hover:underline">+57 (320) 442-3676</a></p>
                    <p><a href="mailto:fcruzandoFronteras@gmail.com"
                            class="text-white hover:underline">fcruzandoFronteras@gmail.com</a></p>
                    <p><a href="https://cruzando-fronteras.vercel.app/" target="_blank"
                            class="text-white hover:underline">www.cruzando-fronteras.vercel.app</a></p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Transiciones para el contenedor rojo */
.transition-nav {
    transition: background-color 0.5s, transform 0.5s;
}
</style>