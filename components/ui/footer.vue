<template>
    <div>
        <!-- Footer -->
        <footer
            class="bg-gradient-to-r from-yellow-500 to-yellow-300 dark:from-yellow-200 dark:to-yellow-300 text-black py-8 mt-8">
            <div class="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div>
                    <p class="font-bold mb-2">Corporación Grupo Luna</p>
                    <p>Calle 14 Sur 48B - 61 B/Serramonte 1 Ca 6A</p>
                    <p>Villavicencio, Meta</p>
                    <p>Colombia</p>
                </div>
                <div class="mt-4 md:mt-0">
                    <p class="font-bold mb-2">Contact Information</p>
                    <p><a href="tel:+573167641291">+57 (316) 764-1291</a></p>
                    <p><a href="mailto:corporaciongrupoluna@gmail.com">corporaciongrupoluna@gmail.com</a></p>
                    <p><a href="https://www.corporaciongrupoluna.com" target="_blank">www.corporaciongrupoluna.com</a>
                    </p>
                </div>
                <div class="mt-4 md:mt-0">
                    <p class="font-bold mb-2">Follow Us</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-black">
                            <UIcon name="i-heroicons-light-bulb" />
                        </a>
                        <a href="#" class="text-black"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-black"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        </footer>
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