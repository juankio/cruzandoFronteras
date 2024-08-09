<template>
  <div>
    <nav
      :class="['fixed top-0 left-0 w-full z-50 shadow-lg transition-nav', { 'bg-red-600 dark:bg-pink-500': !isScrolled, 'bg-red-700 dark:bg-pink-600 ': isScrolled }]">
      <!-- Contenido del navbar -->
      <div class="flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <a href="/" class="flex items-center">
          <img src="/logoBorder.png"
            :class="['transition-logo', isScrolled ? 'h-12 w-12 md:h-16 md:w-16 mt-0' : 'h-12 w-16 md:h-24 md:w-24 absolute left-0 right-0 md:mt-10', 'z-10']"
            alt="Cruzando Fronteras Logo" />
          <span class="text-2xl font-bold relative text-white ml-2" :class="isScrolled ? '' : 'left-20'">Cruzando
            Fronteras</span>
        </a>
        <button @click="toggleMenu" class="md:hidden text-white mobile-menu-button">
          <UIcon class="text-3xl ml-4" name="i-heroicons-bars-3-20-solid" />
        </button>
        <transition name="menu">
          <div v-show="isOpen" ref="menu" class="w-full md:hidden transition-menu">
            <ul class="font-medium flex flex-col md:flex-row md:space-x-8 p-4 rounded-md animate-menu">
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
                  <UButton class="text-white" :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'" color="white"
                    variant="ghost" aria-label="Theme" @click="toggleDarkMode" />
                  <template #fallback>
                    <div class="w-8 h-8" />
                  </template>
                </ClientOnly>
              </li>
            </ul>
          </div>
        </transition>
        <div class="hidden md:flex md:w-auto">
          <ul class="font-medium flex flex-col md:flex-row md:space-x-8 animate-menu">
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
                  class="text-white fade-in delay-6 transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:font-bold"
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
      <!-- Curva superior -->
      <div v-if="!isScrolled" class="absolute inset-x-0 -mt-1">
        <svg class="w-full h-24 text-red-600 dark:text-pink-500 rotate-180" preserveAspectRatio="none"
          viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor"
            d="M0,192L48,208C96,224,192,256,288,261.3C384,267,480,245,576,218.7C672,192,768,160,864,160C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>
    </nav>
    <div class="pt-20"></div> <!-- Ajusta este padding-top según la altura del navbar -->
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const colorMode = useColorMode();
const isOpen = ref(false);
const isScrolled = ref(false);

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
    'block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:hover:font-bold md:p-0 text-white transition duration-300 ease-in-out',
    { 'border-b-4 border-white dark:border-white': route.path === path }
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

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleScroll);
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

/* Transiciones para el contenedor rojo */
.transition-nav {
  transition: background-color 0.5s, transform 0.5s;
}

/* Transición para el menú */
.transition-menu {
  transition: opacity 0.5s, transform 0.5s;
}

/* Transición para el logo */
.transition-logo {
  transition: height 0.5s, width 0.5s, margin-top 0.5s;
}

/* Animación personalizada */
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-menu {
  animation: slideIn 0.5s ease-out forwards;
}
</style>
