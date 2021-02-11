<template>
    <div>
    <md-button @click="goAdmin" class="md-raised md-accent">Admin</md-button>
    <form novalidate class="md-layout" @submit.prevent="validateCategory">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
                <div class="md-title">Category</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                        <md-field :class="getValidationClass('name')">
                            <label for="title">Name</label>
                            <md-input name="name" id="name" v-model="form.name" :disabled="sending" />
                            <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                            <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
                        </md-field>
                    </div>

                </div>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Create category</md-button>
                </md-card-actions>
            </md-card-content>
        </md-card>

        <md-snackbar :md-active.sync="categorySaved">The category was saved with success!</md-snackbar>
    </form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { mapActions, mapState } from 'vuex'
import {
    required,
    minLength
} from 'vuelidate/lib/validators'
import { router } from "../../router";

export default {
    name: "CreateCategory",
    mixins: [validationMixin],
    computed: {
        ...mapState({
            category: state => state.category,
        }),
    },
    data: () => ({
        form: {
            name: null,
        },
        categorySaved: false,
        sending: false,
        lastCategory: null
    }),
    validations: {
        form: {
            name: {
                required,
                minLength: minLength(3)
            },
        }
    },
    methods: {
        ...mapActions('category', ['create']),
        getValidationClass (fieldName) {
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        clearForm () {
            this.$v.$reset()
            this.form.name = null
        },
        saveCategory () {
            this.sending = true
            // Instead of this timeout, here you can call your API
            this.create(this.form).then(() => {
                this.categorySaved = true
                this.sending = false
                router.push({name: 'listArticle'})
            })
        },
        validateCategory () {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.saveCategory()
            }
        },
        goAdmin() {
            router.push({name: 'listArticle'})
        }
    }
}
</script>

<style scoped>

</style>
