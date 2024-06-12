<!-- error.vue -->
<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-light-mode-bg dark:bg-dark-mode-bg p-4">
        <div class="bg-white dark:bg-dark-mode-container p-6 rounded-lg shadow-lg text-center">
            <div class="text-red-600 dark:text-red-400 text-4xl font-bold mb-4">
                <span v-html="`Error: ${error.statusCode}`"> </span>
            </div>
            <div class="text-lg mb-4 text-gray-800 dark:text-gray-300">
                <p>{{ error.message }}</p>
            </div>
            <h3 class="text-blue-600 dark:text-blue-400 text-2xl mb-2">Custom 404 message</h3>
            <p v-if="error.statusCode === 404 || error.statusCode === '404'" class="text-black dark:text-white mb-4">
                Oops, the page you are looking for is not available 🥺
            </p>
            <button @click="handleError"
                class="bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300">
                Go to Home
            </button>
        </div>
    </div>
</template>

<script setup>
// default props available on error.vue
const props = defineProps({
    error: Object,
});

// customize 404 message from script section
const error = useError();
if (error.value.statusCode === 404 || error.value.statusCode === '404') {
    error.value.message = 'Oops! Page not found 😔';
}

// clear error and redirect to home page
const handleError = () => {
    clearError();
    router.push('/');
};
</script>

<style scoped></style>
