<template>
  <div>
    <nav class="bg-yellow-300 border-gray-200 dark:bg-green- md:block">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
        <button @click="isOpen = !isOpen" class="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="h-6 w-6 text-gray-500 hover:text-black">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <a href="/" class="flex ">
          <img src="/s.png" class="h-10 w-10 dark:text-white" alt="Flowbite Logo" />
          <span class=" text-2xl font-semibold  dark:text-white">Cruzando Fronteras</span>
        </a>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded md:p-0 dark:text-white', { 'bg-yellow-400': route.path === '/' }]"
                to="/" aria-current="page">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded hover:bg-yellow-400 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent', { 'bg-yellow-400': route.path === '/about' }]"
                to="/metas">Quiénes somos</NuxtLink>
            </li>
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded hover:bg-yellow-400 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent', { 'bg-yellow-400': route.path === '/services' }]"
                to="/nosotros">Nuestro alcance</NuxtLink>
            </li>
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded hover:bg-yellow-400 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent', { 'bg-yellow-400': route.path === '/contact' }]"
                to="/contact">Contáctanos</NuxtLink>
            </li>
            <li>
              <ClientOnly>
                <UButton class="text-white" :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                  color="gray" variant="ghost" aria-label="Theme" @click="isDark = !isDark" />
                <template #fallback>
                  <div class="w-8 h-8" />
                </template>
              </ClientOnly>
            </li>
          </ul>
        </div>
      </div>
      <div :class="{ 'translate-x-0 ease-out': isOpen, '-translate-x-full ease-in': !isOpen }"
        class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-green-300 overflow-y-auto md:hidden">
        <div class="flex items-center justify-between px-4 py-3">
          <button @click="isOpen = !isOpen" class="md:hidden">
            <UIcon class="text-2xl text-black dark:text-white" name="i-heroicons-x-mark-20-solid" />
          </button>
          <ClientOnly>
            <UButton class="text-black dark:text-white"
              :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
              aria-label="Theme" @click="isDark = !isDark" />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
        </div>
        <nav class="px-4 py-2">
          <ul>
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded md:p-0 font-bold dark:text-white', { 'bg-yellow-400': route.path === '/' }]"
                to="/" aria-current="page">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded font-bold hover:bg-yellow-400 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent', { 'bg-yellow-400': route.path === '/about' }]"
                to="/about">About</NuxtLink>
            </li>
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded font-bold hover:bg-yellow-400 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent', { 'bg-yellow-400': route.path === '/services' }]"
                to="/services">Services</NuxtLink>
            </li>
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded font-bold hover:bg-yellow-400 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent', { 'bg-yellow-400': route.path === '/pricing' }]"
                to="/pricing">Pricing</NuxtLink>
            </li>
            <li>
              <NuxtLink
                :class="['block py-2 px-3 rounded font-bold hover:bg-yellow-400 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent', { 'bg-yellow-400': route.path === '/contact' }]"
                to="/contact">Contact</NuxtLink>
            </li>
            <!-- Aquí van los demás elementos del menú -->
          </ul>
        </nav>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
const isOpen = ref(false);
</script>
