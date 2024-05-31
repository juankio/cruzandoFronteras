<template>
  <div>
    <nav
      class="bg-gradient-to-r from-yellow-500 to-yellow-300 dark:from-yellow-200 dark:to-yellow-300 shadow-lg fixed w-full z-50">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center">
          <img src="/s.png" class="h-10 w-10" alt="Cruzando Fronteras Logo" />
          <span class="text-2xl font-semibold text-black  dark:text-black dark:text-shadow-white ml-2">Cruzando
            Fronteras</span>
        </a>
        <button @click="isOpen = !isOpen" class="md:hidden text-black dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div :class="{ 'block': isOpen, 'hidden': !isOpen }" class="w-full md:flex md:w-auto">
          <ul class="font-medium flex flex-col md:flex-row md:space-x-8">
            <li>
              <NuxtLink :to="'/'" :class="linkClass('/')">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="'/nosotros'" :class="linkClass('/nosotros')">Sobre Nosotros</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="'/metas'" :class="linkClass('/metas')">Nuestro Alcance</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="'/contacto'" :class="linkClass('/contacto')">Contáctanos</NuxtLink>
            </li>
            <li>
              <ClientOnly>
                <UButton class="text-black dark:text-white"
                  :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
                  aria-label="Theme" @click="toggleDarkMode" />
                <template #fallback>
                  <div class="w-8 h-8" />
                </template>
              </ClientOnly>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="pt-20">
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const isOpen = ref(false)

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value: any) {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const linkClass = (path: string) => {
  return [
    'block py-2 px-3 rounded hover:bg-yellow-400 dark:hover:bg-transparent md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0 text-black dark:text-black transition duration-300 ease-in-out ',
    { 'border-b-4 border-orange-500 dark:border-orange-400': route.path === path }
  ]
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
}
</script>


<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}



nav ul li a.border-b-4 {
  border-bottom-width: 4px;
}
</style>
