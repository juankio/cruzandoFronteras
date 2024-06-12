// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/ui", '@nuxt/image-edge'],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/djcirz1cc/image/fetch/'
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    cloudinaryUrl: process.env.CLOUDINARY,
    cloudinaryUser: process.env.USERNA,
    cloudinaryPassword: process.env.PASSWORD,
  },

})