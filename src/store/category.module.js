import api from "../interfaces/apiInterface";
import consoleLogger from "logger";

const state = {categories: []};

const actions = {
    // eslint-disable-next-line no-unused-vars
    list({dispatch, commit}) {
        api.get('/category')
            .then(response => {
                commit('listCategoriesSuccess', response.data)
                consoleLogger.info(response)
            })
    },
    // eslint-disable-next-line no-unused-vars
    create({dispatch, commit}, category) {
        return new Promise((resolve, reject) => {
            api.post('/category', category)
                .then(response => {
                    resolve(response)
                    consoleLogger.info(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

};

const mutations = {
    listCategoriesSuccess(state, categories) {
        state.categories = categories;
    },
};

export const category = {
    namespaced: true,
    state,
    actions,
    mutations
}
