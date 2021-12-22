export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'bossnet-client',
        htmlAttrs: {
            lang: 'fr'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    env: {
        mediaProviderUrl: process.env.MEDIA_PROVIDER_URL || "http://localhost:4000",
        apiEndpoint: process.env.API_ENDPOINT || "http://localhost:4000/api/v1"
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/main.scss',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/axios'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios'
    ],
    loading: {
        color: "#FFBA00",
        height: "2px"
    },
    server: {
        host: "0.0.0.0"
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}