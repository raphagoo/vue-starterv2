
<template>
    <div>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Articles</h1>
                </div>

                <md-button class="md-primary md-raised" @click="newArticle">Create New Article</md-button>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by title..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                md-label="No article found"
                :md-description="`No article found for this '${search}' query. Try a different search term or create a new article.`">
                <md-button class="md-primary md-raised" @click="newArticle">Create New Article</md-button>
            </md-table-empty-state>

            <md-table-row @click="displayArticle(item)" slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Title" md-sort-by="title">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="subtitle" md-sort-by="subtitle">{{ item.subtitle }}</md-table-cell>
                <md-table-cell md-label="Category" md-sort-by="category.name">{{ item.category.name }}</md-table-cell>
                <md-table-cell md-label="Author" md-sort-by="author">{{ item.author.email }}</md-table-cell>
                <md-table-cell md-label="Actions">
                    <md-button @click="editArticle(item)" class="md-icon-button">
                        <md-icon>create</md-icon>
                    </md-button>
                    <md-button @click="deleteArticle(item)" class="md-icon-button">
                        <md-icon>delete</md-icon>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import { router } from "../../router.js";
const toLower = text => {
    return text.toString().toLowerCase()
}

const searchByTitle = (items, term) => {
    if (term) {
        return items.filter(item => toLower(item.title).includes(toLower(term)))
    }

    return items
}
export default {
    name: "ListArticle",
    data: () => ({
        search: null,
        searched: [],
    }),
    computed: {
        ...mapState({
            article: state => state.article,
        }),
    },
    methods: {
        ...mapActions('article', ['list', 'delete']),
        newArticle () {
            router.push({name:'createArticle'})
        },
        searchOnTable () {
            this.searched = searchByTitle(this.article.articles, this.search)
        },
        deleteArticle(article) {
            this.$fire({
                title: "Souhaitez vous vraiment supprimer l'article ?",
                type: "error",
                text: article.title,
                showCancelButton: true,
                cancelButtonText: "Annuler",
                confirmButtonText: "Supprimer",
            }).then(r => {
                if(r.value){
                    this.delete(article.id).then(() => {
                        this.searched = this.article.articles
                    })
                }
            })

        },
        editArticle(article) {
            router.push({name: 'editArticle', params: {id: article.id}})
        },
        displayArticle(article) {
            router.push({name: 'article', params: {id: article.id}})
        }
    },
    created () {
        this.list().then(() => {
            this.searched = this.article.articles
        })
    }
}
</script>

<style lang="scss" scoped>
    .md-field {
        max-width: 300px;
    }
</style>
