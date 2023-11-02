import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import {user} from './user.module'

export const store = createStore({
    modules: {user},
    plugins: [createPersistedState()]
});
