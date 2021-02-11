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
    }
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
