import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Secret from './views/Secret.vue'

// Css
require('./style/main.scss')

Vue.use(VueRouter)

const router = new VueRouter({
    //mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {path: '/modify-secret', component: Secret}
    ]
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');