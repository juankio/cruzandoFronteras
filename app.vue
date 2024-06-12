<!-- app.vue -->
<template>
  <div>
    <UiNav />
    <UiCarusel />
    <div class="m-10 md:m-20">
      <NuxtPage />
    </div>
    <UNotifications />
    <UiFooter />
  </div>
</template>

<script setup>

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
  if (route.matched.length === 0) {
    router.replace('/404')
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

body {
  font-family: 'Permanent Marker', sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
