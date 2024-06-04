<template>
    <span class="relative">
        <UTooltip :text="Tool" :popper="{ placement: 'right' }">
            <span
                class="underline decoration-orange-500 dark:decoration-orange-400 decoration-4 font-bold text-black dark:text-white">{{
            word }}</span>
        </UTooltip>
        <span class="absolute left-0 bottom-0 w-full h-0.5 bg-orange-500 dark:bg-orange-400"></span>
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