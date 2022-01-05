export default {
    head: {
        titleTemplate: '%s | Charts',
        title: 'Charts',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    css: [],

    plugins: [
        '@/plugins/vuex-orm-axios',
        '@/plugins/highcharts.js'
    ],

    components: true,

    buildModules: [
        '@nuxtjs/vuetify'
    ],

    modules: [
        '@nuxtjs/axios'
    ],

    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true
    },

    axios: {
        baseURL: 'http://localhost:5000/api/',
    },

    build: {}
}
