import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '*',
            redirect: '/',
        },
    ]
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    //const publicPages = ['/login', '/register', '/', '/shop', '/product', '/about', '/products'];
    //const authRequired = !publicPages.includes(to.path);
    //const loggedIn = sessionStorage.getItem('token');

    //if (authRequired && !loggedIn) {
    //return next('/login');
    //}

    next();
});

