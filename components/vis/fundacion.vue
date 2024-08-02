<template>
    <div
        class="relative p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2">
        <div class="top-line bg-red-700 dark:bg-pink-500 w-full h-1 absolute top-0 left-0"></div>
        <section class="container mx-auto flex flex-col lg:flex-row-reverse items-center">
            <div class="w-full md:w-1/2">
                <nuxt-img :src="imageUrl" alt="Fundacion Cruzando Fronteras" class="w-full h-auto mb-8" />
            </div>
            <div class="w-full md:w-1/2">
                <h1 class="text-2xl md:text-4xl font-bold mb-4 text-red-700 dark:text-pink-500">FUNDACION CRUZANDO
                    FRONTERAS</h1>
                <p class="mb-4 text-gray-800 dark:text-gray-300">
                    Es una entidad sin ánimo de lucro, que tiene como objeto social "Mejorar la calidad de vida del ser
                    humano, con atención oportuna en salud, educación, cultura y propendiendo por el desarrollo
                    económico de las comunidades y población vulnerable garantizando sus derechos y el acceso a una
                    sociedad incluyente."
                </p>
                <p class="mb-4 text-gray-800 dark:text-gray-300">
                    Fundacion Cruzando Fronteras busca garantizar que la niñez de Colombia pueda crecer con talentos,
                    intelecto, salud y oportunidades que fundamentan la base para su evolución en la sociedad,
                    trabajamos con entidades públicas y privadas para lograr nuestros objetivos, brindando atención
                    integral, formación y cualificación:
                </p>
                <ul class="list-disc pl-5 mb-4 text-gray-800 dark:text-gray-300">
                    <li
                        class="fade-in delay-0 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 text-red-700 dark:text-pink-500">
                        <p class="text-gray-800 dark:text-gray-300">PEDAGOGÍA</p>
                    </li>
                    <li
                        class="fade-in delay-2 text-red-700 dark:text-pink-500 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 text-red-700 dark:text-pink-500">
                        <p class="text-gray-800 dark:text-gray-300">PSICOLOGÍA</p>
                    </li>
                    <li
                        class="fade-in delay-4 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 text-red-700 dark:text-pink-500">
                        <p class="text-gray-800 dark:text-gray-300">SALUD Y NUTRICIÓN</p>
                    </li>
                    <li
                        class="fade-in delay-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 text-red-700 dark:text-pink-500">
                        <p class="text-gray-800 dark:text-gray-300">CUALIFICACIÓN AGENTES EDUCATIVOS</p>
                    </li>
                    <li
                        class="fade-in delay-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 text-red-700 dark:text-pink-500">
                        <p class="text-gray-800 dark:text-gray-300">FORMACIÓN A FAMILIAS</p>
                    </li>
                    <li
                        class="fade-in delay-10 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 text-red-700 dark:text-pink-500">
                        <p class="text-gray-800 dark:text-gray-300">PROMOCIÓN Y PREVENCIÓN DERECHOS</p>
                    </li>
                    <li
                        class="fade-in delay-12 text-red-700 dark:text-pink-500 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 text-red-700 dark:text-pink-500">
                        <p class="text-gray-800 dark:text-gray-300">DESARROLLO ECONÓMICO</p>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script setup>
const imageUrl = ref('');

const { data: items, pending, error } = await useFetch('/api/fetchFotoFundacion');

if (items.value && items.value.secure_url) {
    imageUrl.value = items.value.secure_url;
}

onMounted(() => {
    setInterval(() => {
        if (!imageUrl.value) return;
    }, 3000);
});
</script>
