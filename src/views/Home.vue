<template>
    <div class="loader" v-if="loading">

        <span>↓</span>
        <span style="--delay: 0.1s">↓</span>
        <span style="--delay: 0.3s">↓</span>
        <span style="--delay: 0.4s">↓</span>
        <span style="--delay: 0.5s">↓</span>

    </div>
    <div v-else class="home">
        <md-button class="md-raised md-accent" @click="goAdmin">Admin</md-button>
        <div class="md-layout md-gutter">
            <md-card v-bind:key="article.id" v-for="article in articles" class="md-layout-item md-size-25 md-small-size-50">
                <md-card-media>
                    <img class="imgCard" v-if="article.image && article.image.startsWith('data:')" :src="article.image" alt="People">
                    <img class="imgCard" alt="no picture" v-else src="https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png"/>
                </md-card-media>

                <md-card-header>
                    <div class="md-title">{{article.title}}</div>
                    <div class="md-subhead">{{article.subtitle}}</div>
                </md-card-header>

                <md-card-content>
                    {{article.content.substring(0,35)+".."}}
                </md-card-content>

                <md-card-actions>
                    <md-button class="md-raised md-primary" @click="goToArticle(article)">Read</md-button>
                </md-card-actions>
            </md-card>
        </div>
  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import { router } from "../router";

export default {
    name: 'home',
    components: {
    },
    data: () => ({
        loading: true
    }),
    created() {
        this.list().then(() => {
            this.loading = false
        })
    },
    computed: {
        ...mapState({
            articles: state => state.article.articles,
        }),
    },
    methods: {
        ...mapActions('article', ['list']),

        goToArticle(article){
            router.push({name:'article', params: {'id': article.id}})
        },
        goAdmin(){
            router.push({name: 'listArticle'})
        }
    }
}
</script>

<style>
    .imgCard{
        max-width: 350px;
        max-height: 350px;
        min-width: 350px;
        min-height: 350px;
    }
</style>
