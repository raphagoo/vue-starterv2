import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
    modules: {},
    plugins: [createPersistedState()]
});