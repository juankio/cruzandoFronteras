<template>
    <div class="bg-white dark:bg-black/0 py-12 relative">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                    class="relative rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                    <div class="absolute top-0 left-0 w-full h-1 bg-yellow-500 dark:bg-yellow-300"></div>
                    <div
                        class="counter-box bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-colors fade-in delay-0">
                        <div class="icon mb-4 text-5xl text-orange-500 dark:text-orange-400">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="text-lg text-gray-500 dark:text-gray-400">Más De</div>
                        <div class="text-5xl font-bold text-orange-500 dark:text-orange-400">{{ beneficiados }}</div>
                        <div class="text-lg text-gray-700 dark:text-gray-300">beneficiarios atendidos</div>
                    </div>
                </div>
                <div
                    class="relative rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                    <div class="absolute top-0 left-0 w-full h-1 bg-yellow-500 dark:bg-yellow-300"></div>
                    <div
                        class="counter-box bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-colors fade-in delay-0">
                        <div class="icon mb-4 text-5xl text-orange-500 dark:text-orange-400">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="text-lg text-gray-500 dark:text-gray-400">Más De</div>
                        <div class="text-5xl font-bold text-orange-500 dark:text-orange-400">{{ canastas }}</div>
                        <div class="text-lg text-gray-700 dark:text-gray-300">canastas nutricionales entregadas</div>
                    </div>
                </div>
                <div
                    class="relative rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                    <div class="absolute top-0 left-0 w-full h-1 bg-yellow-500 dark:bg-yellow-300"></div>
                    <div
                        class="counter-box bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-colors fade-in delay-0">
                        <div class="icon mb-4 text-5xl text-orange-500 dark:text-orange-400">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="text-lg text-gray-500 dark:text-gray-400">Atención En Más De</div>
                        <div class="text-5xl font-bold text-orange-500 dark:text-orange-400">{{ municipios }}</div>
                        <div class="text-lg text-gray-700 dark:text-gray-300">municipios</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Variables de contador con valores iniciales y límites
const beneficiados = ref(0);
const canastas = ref(0);
const municipios = ref(0);

const limit1 = 1000;
const limit2 = 1280;
const limit3 = 15;

onMounted(() => {
    if (process.client) {
        // Función para incrementar los contadores cada segundo
        setInterval(() => {
            if (beneficiados.value < limit1) beneficiados.value += 1;
            if (canastas.value < limit2) canastas.value += 1;
        }, 70);

        setInterval(() => {
            if (municipios.value < limit3) municipios.value += 1;
        }, 500);
    }
});
</script>
