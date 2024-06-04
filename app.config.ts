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
})