<template>
    <div>
        <section class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-12">
            <div class="container mx-auto px-4">

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Misión -->
                    <div
                        class="relative p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors fade-in delay-0">
                        <div class="top-line bg-yellow-500 dark:bg-yellow-300 w-full h-1 absolute top-0 left-0">
                        </div>
                        <h3 class="text-2xl font-semibold mb-4 text-orange-500 dark:text-orange-400">Nuestra Misión
                        </h3>
                        <p class="text-base text-gray-700 dark:text-gray-300">
                            Nuestra misión es mejorar la calidad de vida del ser humano, con atención oportuna en
                            salud, educación, cultura y desarrollo económico de las comunidades y población
                            vulnerable.
                        </p>
                    </div>
                    <!-- Visión -->
                    <div
                        class="relative p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors fade-in delay-2">
                        <div class="top-line bg-yellow-500 dark:bg-yellow-300 w-full h-1 absolute top-0 left-0">
                        </div>
                        <h3 class="text-2xl font-semibold mb-4 text-orange-500 dark:text-orange-400">Nuestra Visión
                        </h3>
                        <p class="text-base text-gray-700 dark:text-gray-300">
                            Queremos garantizar que la niñez de Colombia pueda crecer con talentos, intelecto, salud
                            y oportunidades, trabajando con entidades públicas y privadas para lograr nuestros
                            objetivos.
                        </p>
                    </div>
                    <!-- Valores -->
                    <div
                        class="relative p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors fade-in delay-4">
                        <div class="top-line bg-yellow-500 dark:bg-yellow-300 w-full h-1 absolute top-0 left-0">
                        </div>
                        <h3 class="text-2xl font-semibold mb-4 text-orange-500 dark:text-orange-400">Principales
                            Valores</h3>
                        <ul id="values-list" class="list-disc pl-5 text-gray-700 dark:text-gray-300">
                            <li v-for="(value, index) in values" :key="index"
                                :class="['fade-in', 'delay-' + (index * 2)]">
                                {{ value }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const values = ["Integridad", "Compromiso", "Inclusión", "Solidaridad", "Respeto"]

</script>

<style scoped></style>
