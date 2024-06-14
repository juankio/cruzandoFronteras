<script setup lang="ts">
const { data: items, pending, error } = useFetch('/api/fetchCarrusel');

const carouselRef = ref();

onMounted(() => {
    setInterval(() => {
        if (!carouselRef.value) return;

        if (carouselRef.value.page === carouselRef.value.pages) {
            return carouselRef.value.select(0);
        }

        carouselRef.value.next();
    }, 3000);
});
</script>

<template>
    <div v-if="error" class="error">{{ error.message }}</div>
    <div v-else-if="pending" class="loading">Loading...</div>
    <UCarousel v-else ref="carouselRef" v-slot="{ item }" :items="items"
        :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }" indicators class="rounded-lg overflow-hidden">
        <img :src="item.secure_url" class="text-lg w-full h-96
        " draggable="false">
    </UCarousel>
</template>

<style scoped>
.loading {
    text-align: center;
    font-size: 1.5em;
}

.error {
    color: red;
    text-align: center;
    font-size: 1.5em;
}
</style>
