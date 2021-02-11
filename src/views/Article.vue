<template>
    <div>
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
                        <p>{{article.content}}</p>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "Article",
    created() {
        this.get(this.$route.params.id).then(() => {
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
    }
}
</script>

<style scoped>

</style>
