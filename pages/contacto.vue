<template>
    <div class="flex flex-col items-center justify-center ">
        <h2
            class="text-4xl pb-10 md:text-6xl text-center font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-600 dark:from-pink-500 dark:via-pink-600 dark:to-pink-500 text-transparent bg-clip-text animate-shine font-sans">

            Contáctanos
        </h2>
        <div class="w-full max-w-lg mx-auto">
            <VisFormulario />
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Fundación Cruzando Fronteras - Contacto',
    htmlAttrs: {
        lang: 'es'
    },
    meta: [
        { name: 'description', content: 'Ponte en contacto con Fundación Cruzando Fronteras para más información sobre nuestros servicios y cómo puedes contribuir.' },
        { name: 'keywords', content: 'Fundación, Cruzando Fronteras, contacto, ayuda, contribución' }
    ]
})
</script>

<style scoped>
.animate-shine {
    animation: shine 2s linear infinite;
}

@keyframes shine {
    0% {
        background-position: -500%;
    }

    100% {
        background-position: 500%;
    }
}
</style>