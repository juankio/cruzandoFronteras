<template>
    <span class="relative">
        <UTooltip :text="Tool" :popper="{ placement: 'right' }">
            <span
                class="underline fade-in delay-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-1 decoration-orange-500 dark:decoration-yellow-200 decoration-4 font-bold text-gray-800 dark:text-gray-100">{{
            word }}</span>
        </UTooltip>
    </span>
</template>

<script setup>
const props = defineProps({

    word: {
        type: String,
        required: true
    },
    Tool: {
        type: String,
        required: true
    }

})
</script>

<style scoped>
.relative {
    position: relative;
}
</style>