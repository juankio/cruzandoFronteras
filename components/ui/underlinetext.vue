<template>
    <span class="relative">
        <UTooltip :text="Tool" :popper="{ placement: 'right' }">
            <span
                class="underline decoration-orange-500 dark:decoration-orange-400 decoration-4 font-bold text-black dark:text-white">{{
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