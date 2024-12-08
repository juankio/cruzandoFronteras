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
  modules: ["@nuxt/ui", '@nuxt/image-edge', '@nuxtjs/sitemap'],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/djcirz1cc/image/fetch/'
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Fundación Cruzando Fronteras',
      meta: [
        { name: 'description', content: 'Fundación Cruzando Fronteras ofrece servicios de educación, recreación, bienestar, nutrición y salud a comunidades vulnerables en Colombia, promoviendo la convivencia ciudadana y el progreso comunitario.' },
        { name: 'keywords', content: 'Fundación, Cruzando Fronteras, bienestar familiar, educación, salud, nutrición, recreación' },
        { name: 'google-site-verification', content: 'LWS6BBDupP-qEOltKi_raL0m_StE3TPOmw_AmSUJXto' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/s.png' },
        { rel: 'canonical', href: 'https://fundacioncruzandofronteras.org' } // URL canónica
      ]
    }
  },
  sitemap: {
    hostname: 'https://fundacioncruzandofronteras.org/', // Dominio principal
    gzip: true,
    routes: [
      '/',
      '/contacto',
      '/nosotros',
    ]
  },
  runtimeConfig: {
    cloudinaryUrl: process.env.CLOUDINARY,
    cloudinaryUser: process.env.USERNA,
    cloudinaryPassword: process.env.PASSWORD,
  },
})