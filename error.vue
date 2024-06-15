<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-light-mode-bg dark:bg-dark-mode-bg p-4">
        <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <div class="text-red-600 dark:text-red-400 text-4xl font-bold mb-4">
                <span v-html="`Error: ${error.statusCode}`"></span>
            </div>
            <div class="text-lg mb-4 text-gray-800 dark:text-gray-300">
                <p>{{ error.message }}</p>
            </div>
            <h3 class="text-blue-600 dark:text-blue-400 text-2xl mb-2">Mensaje personalizado de error 404</h3>
            <p v-if="error.statusCode === 404 || error.statusCode === '404'" class="text-black dark:text-white mb-4">
                Lo sentimos, esa página nunca regresó de su paseo por Belgrado 🥺
            </p>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    error: Object,
});

const error = useError();
if (error.value.statusCode === 404 || error.value.statusCode === '404') {
    error.value.message = 'Oops! Página no encontrada 😔';
}

const handleError = () => {
    clearError();
    router.push('/');
};
</script>

<style scoped></style>
