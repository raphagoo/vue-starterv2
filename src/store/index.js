import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import { article } from "./article.module";
import { category } from "./category.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        article,
        category
    },
    plugins: [createPersistedState()]
});
