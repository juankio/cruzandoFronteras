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

useSeoMeta({
  title: 'Fundación Cruzando Fronteras - Mejoramiento Integral de la Calidad de Vida en Colombia',
  ogTitle: 'Fundación Cruzando Fronteras',
  description: 'Fundación Cruzando Fronteras ofrece servicios de educación, recreación, bienestar, nutrición y salud a comunidades vulnerables en Colombia, promoviendo la convivencia ciudadana y el progreso comunitario.',
  ogDescription: 'Mejoramiento Integral de la Calidad de Vida en Colombia a través de la educación, recreación, bienestar, nutrición y salud.',
  ogImage: '/s.png',
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
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
