<template>
    <div
        class="relative flex items-center justify-center rounded-lg bg-white shadow-lg dark:bg-gray-900 p-4 md:p-0 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
        <div class="top-line bg-red-600 dark:bg-pink-500 w-full h-1 absolute top-0 left-0"></div>
        <div class="bg-white dark:bg-gray-900 p-8 rounded-lg w-full">
            <UForm :schema="schema" :state="state" class="w-full" @submit="onSubmit">
                <UFormGroup name="name" class="mb-4">
                    <label class="block text-red-600 dark:text-pink-500">Nombre</label>
                    <UInput icon="i-heroicons-user-16-solid" size="lg" class="text-start w-full" color="red" type="text"
                        :trailing="false" placeholder="Ej. Juan Pérez" v-model="state.name" />
                </UFormGroup>
                <UFormGroup name="email" class="mb-4">
                    <label class="block text-red-600 dark:text-pink-500">Correo electrónico</label>
                    <UInput icon="i-heroicons-envelope-16-solid" size="lg" class="text-start w-full" color="red"
                        type="email" :trailing="false" placeholder="Ej. juan.perez@example.com" v-model="state.email" />
                </UFormGroup>
                <UFormGroup name="phone" class="mb-4">
                    <label class="block text-red-600 dark:text-pink-500">Teléfono</label>
                    <UInput icon="i-heroicons-phone-20-solid" size="lg" class="text-start w-full" color="red" type="tel"
                        :trailing="false" placeholder="Ej. 312-456-7890" v-model="state.phone" />
                </UFormGroup>
                <UFormGroup name="message" class="mb-4">
                    <label class="block text-red-600 dark:text-pink-500">Mensaje</label>
                    <UTextarea size="lg" class="text-start w-full" color="red" type="text" :trailing="false"
                        placeholder="Ej. Me gusta lo que hace la fundación Cruzando Fronteras"
                        v-model="state.message" />
                </UFormGroup>
                <UButton :disabled="!isFormValid || isLoading" :loading="isLoading"
                    icon="i-heroicons-paper-airplane-solid" size="sm" color="red" variant="solid"
                    :label="isLoading ? 'Enviando...' : 'Enviar'" :trailing="false" @click="onClickSubmit"
                    class="bg-red-700 dark:bg-pink-500 text-white text-center px-4 py-2 rounded-lg hover:bg-red-800 dark:hover:bg-pink-600 hover:animate-bounce"
                    block />
            </UForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup';
import emailjs from 'emailjs-com';

const toast = useToast();

const schema = object({
    name: string().required('Nombre es obligatorio'),
    email: string().email('Correo electrónico inválido').required('Correo electrónico es obligatorio'),
    phone: string()
        .matches(/^\d+$/, 'El teléfono solo debe contener números')
        .length(10, 'El teléfono debe tener exactamente 10 dígitos')
        .required('Teléfono es obligatorio'),
    message: string().required('Mensaje es obligatorio')
});

type Schema = InferType<typeof schema>;

const state = reactive({
    name: '',
    email: '',
    phone: '',
    message: ''
});

const isLoading = ref(false);

const isFormValid = computed(() => {
    return state.name && state.email && state.phone && state.message;
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        await schema.validate(event.data, { abortEarly: false });

        const templateParams = {
            name: state.name,
            email: state.email,
            phone: state.phone,
            message: state.message
        };

        await emailjs.send('service_dw37qv8', 'template_avh1skb', templateParams, '35nWX-jg8bKGUhQeo');

        toast.add({ title: 'Correo enviado exitosamente', type: 'success' });
        state.name = '';
        state.email = '';
        state.phone = '';
        state.message = '';
    } catch (error) {
        toast.add({ title: error.message, type: 'error' });
    } finally {
        isLoading.value = false;
    }
}

async function onClickSubmit() {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 300));
    await onSubmit({ data: state });
}
</script>

<style scoped>
.top-line {
    transition: width 0.5s;
}

.hover\:animate-bounce:hover {
    animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}
</style>
