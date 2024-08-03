<template>
    <div>
        <div>
            <h2
                class="text-4xl p-6 md:text-6xl text-center font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-600 dark:from-pink-500 dark:via-pink-600 dark:to-pink-500 text-transparent bg-clip-text animate-shine font-sans">
                ¿Quienes Somos?
            </h2>
        </div>
        <div class="w-full max-w-7xl mx-auto">
            <VisFundacion />
        </div>
        <div class="text-center m-10">
            <h2
                class="text-4xl p-6 md:text-6xl text-center font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-600 dark:from-pink-500 dark:via-pink-600 dark:to-pink-500 text-transparent bg-clip-text animate-shine font-sans">
                Nuestra Misión, Visión y Valores
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300">Conoce más sobre lo que nos motiva y nos guía.</p>
        </div>
        <div>
            <VisNosotros />
        </div>
        <div class="text-center m-6">
            <h2
                class="text-4xl p-6 md:text-6xl text-center font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-600 dark:from-pink-500 dark:via-pink-600 dark:to-pink-500 text-transparent bg-clip-text animate-shine font-sans">
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
useHead({
    title: 'Fundación Cruzando Fronteras - Nosotros',
    htmlAttrs: {
        lang: 'es'
    },
    meta: [
        { name: 'description', content: 'Conoce más sobre Fundación Cruzando Fronteras, nuestra historia, misión y equipo.' },
        { name: 'keywords', content: 'Fundación, Cruzando Fronteras, nosotros, misión, equipo' }
    ]
});
</script>