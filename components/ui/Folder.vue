<template>
    <div>
        <div>
            <h2
                class="text-4xl md:text-6xl text-center font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text animate-shine font-sans">
                NUESTROS PROYECTOS
            </h2>
        </div>
        <div v-if="error" class="text-red-500 text-center">
            <p>Error fetching images: {{ error }}</p>
        </div>
        <div v-else-if="!Object.keys(imagesByFolder).length" class="text-center">
            <p>Loading...</p>
        </div>
        <div v-else>
            <div v-for="(folderData, folderName) in imagesByFolder" :key="folderName" class="folder mb-10">
                <h3 class="text-3xl md:text-5xl font-bold text-orange-500">{{ folderName }}</h3>
                <div v-if="folderData.description" class="text-lg lowercase text-gray-400">{{ folderData.description }}
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div v-for="image in folderData.images" :key="image.public_id"
                        class="relative rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                        <NuxtImg :src="image.secure_url" :alt="image.public_id"
                            class="object-fill w-full h-60 cursor-pointer" @click="openModal(image)" />
                    </div>
                </div>
                <div v-if="folderData.subfolders && Object.keys(folderData.subfolders).length">
                    {{ folderData.subfolders }}

                    <div v-for="(subFolderData, subFolderName) in folderData.subfolders" :key="subFolderName"
                        class="subfolder ml-6">
                        <h4 class="text-xl md:text-3xl font-semibold text-orange-400">{{ subFolderName }}</h4>
                        <div v-if="subFolderData.description" class="text-lg lowercase text-gray-400">{{
            subFolderData.description }}</div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                            <div v-for="image in subFolderData.images" :key="image.public_id"
                                class="relative rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                                <NuxtImg :src="image.secure_url" :alt="image.public_id"
                                    class="object-fill w-full h-60 cursor-pointer" @click="openModal(image)" />
                            </div>
                        </div>
                        <div v-if="subFolderData.subfolders && Object.keys(subFolderData.subfolders).length">
                            <div v-for="(innerSubFolderData, innerSubFolderName) in subFolderData.subfolders"
                                :key="innerSubFolderName" class="subfolder ml-6">
                                <h5 class="text-lg md:text-2xl font-semibold text-orange-300">{{ innerSubFolderName }}
                                </h5>
                                <div v-if="innerSubFolderData.description" class="text-md lowercase text-gray-400">{{
            innerSubFolderData.description }}</div>
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                    <div v-for="image in innerSubFolderData.images" :key="image.public_id"
                                        class="relative rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                                        <NuxtImg :src="image.secure_url" :alt="image.public_id"
                                            class="object-fill w-full h-60 cursor-pointer" @click="openModal(image)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="isOpen"
            class="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/30 bg-opacity-50"
            @click="isOpen = false">
            <div class="bg-white/40 dark:bg-black/30 p-6 rounded-lg shadow-2xl w-full max-w-lg mx-auto relative animate-fade-in"
                @click.stop>
                <UIcon class="text-3xl hover:text-red-500" name="i-heroicons-x-circle-16-solid" />
                <div class="flex justify-center">
                    <NuxtImg :src="selectedImage.secure_url" :alt="selectedImage.public_id"
                        class="max-h-screen max-w-full object-contain" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>


const isOpen = ref(false);
const selectedImage = ref({});
const { data: imagesByFolder, error } = await useFetch('/api/fetchImages');

console.log(imagesByFolder); // Verifica los datos en la consola

useHead({
    title: 'Fundación Cruzando Fronteras - Inicio',
    htmlAttrs: {
        lang: 'es'
    },
    meta: [
        { name: 'description', content: 'Fundación Cruzando Fronteras ofrece servicios de educación, recreación, bienestar, nutrición y salud a comunidades vulnerables en Colombia.' },
        { name: 'keywords', content: 'Fundación, Cruzando Fronteras, bienestar familiar, educación, salud, nutrición, recreación' }
    ]
});

const openModal = (image) => {
    selectedImage.value = image;
    isOpen.value = true;
};
</script>
<style scoped>
@keyframes shine {
    0% {
        background-position: 200% center;
    }

    100% {
        background-position: -200% center;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-shine {
    background-size: 200%;
    animation: shine 6s linear infinite;
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
}

.max-h-screen {
    max-height: 90vh;
}

.max-w-full {
    max-width: 100%;
}

.folder {
    margin-bottom: 2rem;
}

.subfolder {
    margin-left: 1.5rem;
}

.subfolder h4 {
    margin-top: 1rem;
}
</style>
