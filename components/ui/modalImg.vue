<template>
    <div>
        <UModal :visible="props.isOpen" @close="closeModal" prevent-close>
            <div class="p-4 dark:bg-black">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-black dark:bg-white">
                    <img :src="props.selectedImage" :alt="props.selectedImageTitulo"
                        class="h-full w-full object-cover" />
                </div>
            </div>
        </UModal>

        <!-- Fondo oscurecido -->
        <div v-if="props.isOpen" class="fixed inset-0 bg-black opacity-50 z-50" @click="closeModal"></div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    isOpen: Boolean,
    selectedImage: {
        type: String,
        default: "https://picsum.photos/200/300",
    },
    selectedImageTitulo: {
        type: String,
        default: "Imagen",
    }
})

const emit = defineEmits(['close'])

const closeModal = () => {
    emit('close')
}
</script>