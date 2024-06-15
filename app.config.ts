export default defineAppConfig({
    colorMode: {
        preference: 'light', // default theme
        fallback: 'light', // fallback theme
        classSuffix: ''
    },
    css: [
        '~/assets/css/main.css' // assuming you have a main.css file for global styles
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    DEFAULT: '#6b7280',
                    light: '#f9fafb',
                    dark: '#1f2937'
                },
                orange: {
                    light: '#fb923c',
                    DEFAULT: '#f97316',
                    dark: '#ea580c'
                },
            },
        },
    },
    ui: {
        primary: 'orange',
        gray: 'cool',
        notifications: {
            position: 'top-0 bottom-auto',
            bg: 'gray-dark', // Ensure the background for notifications is properly set
            color: 'white'
        }
    },
    head: {
        title: 'Fundación Cruzando Fronteras',
        meta: [
            { name: 'description', content: 'Fundación Cruzando Fronteras ofrece servicios de educación, recreación, bienestar, nutrición y salud a comunidades vulnerables en Colombia, promoviendo la convivencia ciudadana y el progreso comunitario.' },
            { name: 'keywords', content: 'Fundación, Cruzando Fronteras, bienestar familiar, educación, salud, nutrición, recreación' },
            { name: 'google-site-verification', content: 'cb4Wl734ggWuuF0amlGCy-st8-FTOJniU1Pqg5UJZB' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/s.png' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap' }
        ]
    },
    sitemap: {
        hostname: 'https://juansupelano.me/',
        gzip: true,
        routes: [
            '/',
            '/contacto',
            '/nosotros',
        ]
    },
})