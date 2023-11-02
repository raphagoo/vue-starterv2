import { router } from '../router';
import consoleLogger from "../interfaces/consoleLogger";
import api from "../interfaces/apiInterface";
import { Commit } from 'vuex';
import { AxiosResponse } from 'axios';

let userLocal = localStorage.getItem('user');
if(userLocal != null){
    userLocal = JSON.parse(userLocal);
}
const state = userLocal
    ? { status: { loggedIn: true }, userLocal }
    : { status: {}, user: null };

const actions = {
    login({ commit }: { commit: Commit }, user:User) {

    },
    logout({ commit }: { commit: Commit }) {

        commit('logout');
    },
    register({ commit }: { commit: Commit }, user: User) {
        commit('registerRequest', user);
        api.post('/register', user, {
            headers: {'Accept': 'application/json'},
        }).then(response => {
            Promise.resolve(response)
        }).catch(error => {
            Promise.reject(error)
        })
    }
};

const mutations = {
    loginSuccess(state: userState, response: AxiosResponse) {
        state.status = { loggingIn: true };
        localStorage.setItem('user', JSON.stringify(response.data.jwt));
        state.user = response.data.user;
        router.push('/shop')
    },

    loginFailure(state: userState) {
        state.status = {};
        state.user = null;
    },
    logout(state: userState) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state: userState, user: User) {
        consoleLogger.info(user)
        state.status = { registering: true };
    },
};

export const user = {
    namespaced: true,
    state,
    actions,
    mutations
};
