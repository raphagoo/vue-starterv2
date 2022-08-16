import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ]
})

router.beforeEach((to: any, from: any, next: any) => {
    // redirect to login page if not logged in and trying to access a restricted page
    //const publicPages = ['/login', '/register', '/', '/shop', '/product', '/about', '/products'];
    //const authRequired = !publicPages.includes(to.path);
    //const loggedIn = sessionStorage.getItem('token');

    //if (authRequired && !loggedIn) {
    //return next('/login');
    //}

    next();
})
