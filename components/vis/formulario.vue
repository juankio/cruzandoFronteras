<template>
    <div class="flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 p-4 md:p-0">
        <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
                <h2 class="text-3xl md:text-6xl  text-center font-bold mb-4">Contáctanos</h2>
                <UForm :schema="schema" :state="state" class="w-full" @submit="onSubmit">
                    <UFormGroup name="name" class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300">Nombre</label>
                        <UInput icon="i-heroicons-user-16-solid" size="lg" class="text-start w-full" color="orange"
                            type="text" :trailing="false" placeholder="Nombre" v-model="state.name" />
                    </UFormGroup>
                    <UFormGroup name="email" class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300">Correo electrónico</label>
                        <UInput icon="i-heroicons-envelope-16-solid" size="lg" class="text-start w-full" color="orange"
                            type="email" :trailing="false" placeholder="Correo electrónico" v-model="state.email" />
                    </UFormGroup>
                    <UFormGroup name="phone" class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300">Teléfono</label>
                        <UInput icon="i-heroicons-phone-20-solid" size="lg" class="text-start w-full" color="orange"
                            type="tel" :trailing="false" placeholder="312-456-789" v-model="state.phone" />
                    </UFormGroup>
                    <UFormGroup name="message" class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-300">Mensaje</label>
                        <UTextarea size="lg" class="text-start w-full" color="orange" type="text" :trailing="false"
                            placeholder="Mensaje" v-model="state.message" />
                    </UFormGroup>
                    <UButton type="submit" label="Show toast" @click="toast.add({ title: 'Hello world!' })"
                        class="bg-orange-500 dark:bg-orange-400 text-white px-4 py-2 rounded-lg w-full hover:bg-orange-600 dark:hover:bg-orange-500">
                        Enviar
                    </UButton>
                </UForm>
            </div>
            <div class="w-full md:w-1/2 pl-0 md:pl-4">
                <img src="/s.png" alt="Contact" class="rounded-lg text-center justify-center shadow-md w-full" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import emailjs from 'emailjs-com'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const schema = object({
    name: string().required('Nombre es requerido'),
    email: string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
    phone: string().required('Teléfono es requerido'),
    message: string().required('Mensaje es requerido')
})

type Schema = InferType<typeof schema>

const state = reactive({
    name: '',
    email: '',
    phone: '',
    message: ''
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

        emailjs.send('service_dw37qv8', 'template_avh1skb', templateParams, '35nWX-jg8bKGUhQeo')
            .then(response => {
                console.log('SUCCESS!', response.status, response.text)
                state.name = ''
                state.email = ''
                state.phone = ''
                state.message = ''
            }, error => {
                console.log('FAILED...', error)
            })
    } catch (error) {
        console.error("Error de validación:", error)
    }
}
</script>
