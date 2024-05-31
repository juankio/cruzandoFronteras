<template>
    <div>
        <UButton label="Abrir" @click="isOpen = true" />

        <!-- <UModal v-model="isOpen">
            <div class="p-4 bg-white dark:bg-black rounded-lg shadow-lg">
                <div class="p-4">
                    <div class="h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-200"></div>
                </div>
            </div>
        </UModal> -->
        <UModal v-model="isOpen">
            <div class="p-4 dark:bg-black">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-black dark:bg-white">
                    <img :src="imagen.ime" :alt="imagen.titulo"
                        class="h-full w-full object-fill group-hover:opacity-75" />
                </div>
            </div>
        </UModal>

        <!-- Fondo oscurecido -->
        <div v-if="isOpen" class="fixed inset-0 bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-50 z-50"
            @click="isOpen = false">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const imagen = ref({
    ime: 'https://picsum.photos/200/300',
    titulo: 'Imagen de ejemplo'
})
</script>