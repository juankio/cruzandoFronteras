<template>
  <div>
    <UiNav />
    <div class="m-20">
      <NuxtPage />
    </div>
    <UNotifications />
  </div>
  <UiFooter />
</template>
<script setup>

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