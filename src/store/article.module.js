import api from "../interfaces/apiInterface";
import consoleLogger from "logger";

const state = {articles: [], selected: {}};

const actions = {
    // eslint-disable-next-line no-unused-vars
    create({dispatch, commit}, article) {
        return new Promise((resolve, reject) => {
            api.post('/article', article)
                .then(response => {
                    consoleLogger.info(response)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    // eslint-disable-next-line no-unused-vars
    list({dispatch, commit}) {
        return new Promise((resolve, reject) => {
            api.get('/article')
                .then(response => {
                    commit('listArticlesSuccess', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    // eslint-disable-next-line no-unused-vars
    delete({dispatch, commit}, articleId) {
        return new Promise((resolve, reject) => {
            api.delete('/article/' + articleId)
                .then((response) => {
                    commit('deleteArticlesSuccess', articleId)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    // eslint-disable-next-line no-unused-vars
    get({dispatch, commit}, articleId) {
        return new Promise((resolve, reject) => {
            api.get('/article/' + articleId)
                .then(response => {
                    consoleLogger.info(response)
                    commit('getArticleSuccess', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    // eslint-disable-next-line no-unused-vars
    update({dispatch, commit}, article) {
        return new Promise((resolve, reject) => {
            api.put('/article/' + article.id, article)
                .then(response => {
                    consoleLogger.info(response)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
};

const mutations = {
    listArticlesSuccess(state, articles) {
        state.articles = articles;
    },

    deleteArticlesSuccess(state, toRemove) {
        state.articles = state.articles.filter(function( obj ) {
            return obj.id !== toRemove;
        });
    },

    getArticleSuccess(state, article) {
        state.selected = article
    }
};

export const article = {
    namespaced: true,
    state,
    actions,
    mutations
}
