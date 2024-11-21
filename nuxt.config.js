
// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: { lang: 'en' },
            title: 'PeopleTech',
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp' },
            ]
        }
    },
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/google-fonts'
    ],
    googleFonts: {
        families: {
            'DM+Sans': true,
            'DM+Serif+Display': true
        }
    },
    vite: {
        plugins: [ svgLoader({ svgo: false }) ]
    },
    css: [
        '~/styles/global.scss'
    ],
    runtimeConfig: {
        public: {
            url: process.env.API_URL,
            token: process.env.API_KEY,
            user: process.env.API_USER_ID
        }
    },
});

