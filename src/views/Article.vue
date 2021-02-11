<template>
    <div class="loader" v-if="loading">

        <span>↓</span>
        <span style="--delay: 0.1s">↓</span>
        <span style="--delay: 0.3s">↓</span>
        <span style="--delay: 0.4s">↓</span>
        <span style="--delay: 0.5s">↓</span>

    </div>
    <div v-else>
        <md-button @click="goHome">Home</md-button>
        <md-card>
            <md-card-header>
                <div class="md-layout md-gutter md-alignment-center">
                    <div class="md-layout-item">
                        <span class="md-title">{{article.title}}</span>
                    </div>
                </div>
                <div class="md-layout md-gutter md-alignment-center">
                    <div class="md-layout-item">
                        <span class="md-subheading">{{article.subtitle}}</span>
                    </div>
                </div>
                <div class="md-layout md-gutter md-alignment-center">
                    <div class="md-layout-item">
                        <md-icon>schedule</md-icon> Published on {{splitedDate}}
                    </div>
                </div>
                <div class="md-layout md-gutter md-alignment-center">
                    <div class="md-layout-item">
                        <md-icon>perm_identity</md-icon> Published by {{article.author.firstName}} {{article.author.lastName}}
                    </div>
                </div>
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-gutter md-alignment-center">
                    <div class="md-layout-item">
                        <img class="imgArticle" v-if="article.image && article.image.startsWith('data:')" :src="article.image" alt="People">
                    </div>
                </div>
                <div class="md-layout md-gutter md-alignment-center">
                    <div class="md-layout-item">
                        <p>{{article.content}}</p>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import { router } from "../router";

export default {
    name: "Article",
    data: () => ({
        loading: true
    }),
    created() {
        this.get(this.$route.params.id).then(() => {
            this.loading = false
        })
    },
    computed: {
        ...mapState({
            article: state => state.article.selected
        }),
        splitedDate(){
            let date = this.$store.state.article.selected.publicationDate.split('T')
            return date[0]
        }
    },
    methods: {
        ...mapActions('article', ['get']),
        goHome(){
            router.push({name: 'home'})
        }
    }
}
</script>

<style scoped>
.imgArticle{
    max-width: 500px;
    max-height: 500px;
}
</style>
