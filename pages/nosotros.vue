<template>
    <div>
        <div>
            <h2
                class="text-4xl md:text-6xl p-10 text-center font-bold bg-gradient-to-r mb-12 from-orange-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text animate-shine">
                ¿Quienes Somos?
            </h2>
        </div>
        <div>
            <VisFundacion />
        </div>
        <div class="text-center m-10">
            <h2
                class="text-4xl md:text-6xl p-10  text-center font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text animate-shine">
                Nuestra Misión, Visión
                y Valores
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300">Conoce más sobre lo que nos motiva y nos
                guía.</p>
        </div>
        <div>
            <VisNosotros />
        </div>
        <div class="text-center m-6">
            <h2
                class="text-4xl md:text-6xl p-10  text-center font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text animate-shine">
                Impacto y Alcance
            </h2>
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