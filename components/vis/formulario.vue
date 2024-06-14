<template>
    <div class="flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-4 md:p-0">
        <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                <UForm :schema="schema" :state="state" class="w-full" @submit="onSubmit">
                    <UFormGroup name="name" class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300">Nombre</label>
                        <UInput icon="i-heroicons-user-16-solid" size="lg" class="text-start w-full" color="orange"
                            type="text" :trailing="false" placeholder="Ej. Juan Pérez" v-model="state.name" />
                    </UFormGroup>
                    <UFormGroup name="email" class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300">Correo electrónico</label>
                        <UInput icon="i-heroicons-envelope-16-solid" size="lg" class="text-start w-full" color="orange"
                            type="email" :trailing="false" placeholder="Ej. juan.perez@example.com"
                            v-model="state.email" />
                    </UFormGroup>
                    <UFormGroup name="phone" class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300">Teléfono</label>
                        <UInput icon="i-heroicons-phone-20-solid" size="lg" class="text-start w-full" color="orange"
                            type="tel" :trailing="false" placeholder="Ej. 312-456-789" v-model="state.phone" />
                    </UFormGroup>
                    <UFormGroup name="message" class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300">Mensaje</label>
                        <UTextarea size="lg" class="text-start w-full" color="orange" type="text" :trailing="false"
                            placeholder="Ej. Me gusta lo que hace la fundacion Cruzando fronteras"
                            v-model="state.message" />
                    </UFormGroup>

                    <UButton :disabled="!isFormValid || isLoading" :loading="isLoading"
                        icon="i-heroicons-paper-airplane-solid" size="sm" color="primary" variant="solid"
                        :label="isLoading ? 'Enviando...' : 'Enviar'" :trailing="false" @click="onClickSubmit"
                        class="bg-orange-500 dark:bg-orange-400 text-white text-center px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 hover:animate-fly"
                        block />
                </UForm>
            </div>
            <div class="w-full md:w-1/2 pl-0 md:pl-4">
                <nuxt-img :src="imageUrl" alt="Fundacion Cruzando Fronteras"
                    class="rounded-lg text-center justify-center shadow-md w-full" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import emailjs from 'emailjs-com'
import { computed, reactive, ref } from 'vue'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const schema = object({
    name: string().required('Nombre es obligatorio'),
    email: string().email('Correo electrónico inválido').required('Correo electrónico es obligatorio'),
    phone: string().required('Teléfono es obligatorio'),
    message: string().required('Mensaje es obligatorio')
})

type Schema = InferType<typeof schema>

const state = reactive({
    name: '',
    email: '',
    phone: '',
    message: ''
})

const isLoading = ref(false)

const isFormValid = computed(() => {
    return state.name && state.email && state.phone && state.message
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await schema.validate(event.data, { abortEarly: false })

        const templateParams = {
            name: state.name,
            email: state.email,
            phone: state.phone,
            message: state.message
        }

        await emailjs.send('service_dw37qv8', 'template_avh1skb', templateParams, '35nWX-jg8bKGUhQeo')

        toast.add({ title: 'Correo enviado exitosamente' })
        state.name = ''
        state.email = ''
        state.phone = ''
        state.message = ''
    } catch (error) {
        toast.add({ title: error.message })
        console.error('Error de validación:', error)
    } finally {
        isLoading.value = false
    }
}

async function onClickSubmit() {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    await onSubmit({ data: state })
}


const imageUrl = ref('');

const { data: items, pending, error } = await useFetch('/api/fetchContactanos');

if (items.value && items.value.secure_url) {
    imageUrl.value = items.value.secure_url;
}

onMounted(() => {
    setInterval(() => {
        if (!imageUrl.value) return;
    }, 3000);
});
</script>

<style scoped>
@keyframes fly {
    0% {
        transform: translateX(0)
    }

    50% {
        transform: translateX(50px)
    }

    100% {
        transform: translateX(100px)
    }
}

.hover\\:animate-fly:hover {
    animation: fly 0.5s ease-in-out forwards
}
</style>