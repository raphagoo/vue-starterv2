<template>
  <div class="home">
      <md-card v-bind:key="article.id" class="md-layout-item md-size-25 md-small-size-50" v-for="article in articles">
          <md-card-header>
              <md-card-header>
                  <div class="md-layout md-gutter md-alignment-center">
                      <div class="md-layout-item">
                        <span class="md-title">{{article.title}}</span>
                        <span class="md-subheading">{{article.subtitle}}</span>
                        <md-icon>schedule</md-icon> Published on {{splitedDate}}
                      </div>
                  </div>
                  <div class="md-layout md-gutter md-alignment-center">
                      <div class="md-layout-item">
                        <md-icon>perm_identity</md-icon> Published by {{article.author.firstName}} {{article.author.lastName}}
                      </div>
                  </div>
              </md-card-header>
          </md-card-header>
      </md-card>
  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
    name: 'home',
    components: {
    },
    created() {
        this.list()
    },
    computed: {
        ...mapState({
            articles: state => state.article.articles,
        }),
    },
    methods: {
        ...mapActions('article', ['list'])
    }
}
</script>
