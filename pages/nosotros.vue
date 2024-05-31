<template>
    <div>
        <div>
            <h1 class="text-orange-500 font-bold text-6xl text-center mb-12 dark:text-orange-400">¿Quienes Somos?</h1>
        </div>
        <div
            class="relative p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <VisFundacion />
        </div>
        <div class="text-center m-10">
            <h2 class="text-6xl font-bold mb-4 text-orange-500 dark:text-orange-400">Nuestra Misión, Visión
                y Valores</h2>
            <p class="text-lg text-gray-700 dark:text-gray-300">Conoce más sobre lo que nos motiva y nos
                guía.</p>
        </div>
        <div>
            <VisNosotros />
        </div>
        <div class="text-center m-6">
            <h2 class="text-6xl font-bold mb-4 text-orange-500 dark:text-orange-400">Impacto y Alcance</h2>
            <p class="text-lg text-gray-700 dark:text-gray-300">Descubre cómo estamos impactando vidas y comunidades a
                través de nuestras iniciativas y proyectos.</p>
        </div>
        <div>
            <VisContador />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
/* Animaciones personalizadas para Tailwind */
.counter-box {
    transition: background-color 0.3s ease;
}

.counter-box:hover {
    background-color: #f5f5f5;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.fade-in {
    opacity: 0;
    animation: fadeIn 1s forwards;
}

.delay-0 {
    animation-delay: 0s;
}

.delay-2 {
    animation-delay: 0.5s;
}

.delay-4 {
    animation-delay: 1s;
}

.delay-6 {
    animation-delay: 1.5s;
}

.delay-8 {
    animation-delay: 2s;
}

.delay-10 {
    animation-delay: 2.5s;
}

.delay-12 {
    animation-delay: 3s;
}
</style>