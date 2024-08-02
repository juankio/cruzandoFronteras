<template>
    <span class="relative">
        <UTooltip :text="Tool" :popper="{ placement: 'right' }">
            <span
                class="underline fade-in delay-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-1 decoration-red-700 dark:decoration-pink-500 decoration-4 font-bold text-gray-800 dark:text-gray-100">{{
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
