<template>
  <div>
    <nav
      class="bg-gradient-to-r from-yellow-500 to-yellow-300 dark:from-yellow-200 dark:to-yellow-300 shadow-lg fixed w-full z-50 transition-nav">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center">
          <img src="/s.png" class="h-10 w-10" alt="Cruzando Fronteras Logo" />
          <span class="text-2xl text-black dark:text-black dark:text-shadow-white ml-2">Cruzando Fronteras</span>
        </a>
        <button @click="toggleMenu" class="md:hidden text-black dark:text-black mobile-menu-button">
          <UIcon class="text-3xl ml-4" name="i-heroicons-bars-3-20-solid" />
        </button>
        <transition name="menu">
          <div v-show="isOpen" ref="menu" class="w-full md:hidden transition-menu">
            <ul class="font-medium flex flex-col md:flex-row md:space-x-8 p-4 rounded-md">
              <li>
                <NuxtLink :to="'/'" :class="linkClass('/')">Inicio</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="'/nosotros'" :class="linkClass('/nosotros')">Sobre Nosotros</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="'/contacto'" :class="linkClass('/contacto')">Contáctanos</NuxtLink>
              </li>
              <li>
                <ClientOnly>
                  <UButton class="text-black dark:text-black" :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
                    color="black" variant="ghost" aria-label="Theme" @click="toggleDarkMode" />
                  <template #fallback>
                    <div class="w-8 h-8" />
                  </template>
                </ClientOnly>
              </li>
            </ul>
          </div>
        </transition>
        <div class="hidden md:flex md:w-auto">
          <ul class="font-medium flex flex-col md:flex-row md:space-x-8">
            <li>
              <NuxtLink :to="'/'" :class="linkClass('/')">Inicio</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="'/nosotros'" :class="linkClass('/nosotros')">Sobre Nosotros</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="'/contacto'" :class="linkClass('/contacto')">Contáctanos</NuxtLink>
            </li>
            <li>
              <ClientOnly>
                <UButton
                  class="text-black dark:text-black fade-in delay-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:font-bold"
                  :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'" color="black" variant="ghost"
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
    <div class="pt-10"></div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();
const isOpen = ref(false);

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(value: any) {
    colorMode.preference = value ? 'dark' : 'light';
  }
});

const linkClass = (path: string) => {
  return [
    'block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0 text-black dark:text-black transition duration-300 ease-in-out',
    { 'border-b-4 border-orange-500 dark:border-orange-400': route.path === path }
  ];
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
};

const handleClickOutside = (event: MouseEvent) => {
  const menu = document.querySelector('.transition-menu');
  const button = document.querySelector('.mobile-menu-button');
  if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

nav ul li a.border-b-4 {
  border-bottom-width: 4px;
}

/* Transiciones */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Transiciones para el contenedor amarillo */
.transition-nav {
  transition: background-color 0.5s, transform 0.5s;
}

/* Transición para el menú */
.transition-menu {
  transition: opacity 0.5s, transform 0.5s;
}

.bg-yellow-200 {
  transition: background-color 0.5s;
}
</style>
