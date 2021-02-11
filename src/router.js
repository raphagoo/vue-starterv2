import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import createArticle from "./views/admin/createArticle.vue";
import ListArticle from "./views/admin/ListArticle.vue";
import EditArticle from "./views/admin/EditArticle.vue";
import Article from "./views/Article.vue";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/admin/article/add',
            name: 'createArticle',
            component: createArticle
        },
        {
            path: '/admin/article/:id',
            name: 'editArticle',
            component: EditArticle
        },
        {
            path: '/admin/article',
            name: 'listArticle',
            component: ListArticle
        },
        {
            path: '/article/:id',
            name: 'article',
            component: Article
        },
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


    next();
});

