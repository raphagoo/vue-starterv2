<template>
    <v-app>
    <v-main>
        <Home/>
    </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './views/Home.vue'

export default defineComponent({
    name: 'App',

    components: {
    Home,
    },

    data () {
        return {
          //
        }
    },
})
</script>
