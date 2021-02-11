<template>
    <div>
        <md-button @click="goAdmin" class="md-raised md-accent">Admin</md-button>
        <form novalidate class="md-layout" @submit.prevent="validateArticle">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Article</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('title')">
                                <label for="title">Title</label>
                                <md-input name="title" id="title" v-model="form.title" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
                                <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid title</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('subtitle')">
                                <label for="last-name">Subtitle</label>
                                <md-input name="last-name" id="last-name" v-model="form.subtitle" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.subtitle.required">The subtitle is required</span>
                                <span class="md-error" v-else-if="!$v.form.subtitle.minlength">Invalid last name</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('image')">
                                <md-file placeholder="Image" name="image" v-on:change="onFileChange" accept="image/*" />
                            </md-field>
                            <img class="visualImg" v-if="this.form.data" :src="this.form.data" alt="Visuel" />
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('content')">
                                <label for="content">Content</label>
                                <md-textarea md-autogrow id="content" name="content" v-model="form.content" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.content.required">The content is required</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                                <label for="category">Category</label>
                                <md-select v-model="form.category_id" name="category" id="category">
                                    <md-option v-bind:key="category.id" v-for="category in category.categories" :value="category.id">{{category.name}}</md-option>
                                </md-select>
                                <span class="md-error" v-if="!$v.form.category_id.required">The content is required</span>
                            </md-field>
                        </div>
                    </div>


                    <md-field :class="getValidationClass('publicationDate')">
                        <md-datepicker v-model="form.publicationDate">
                            <label>Select date</label>
                        </md-datepicker>
                        <span class="md-error" v-if="!$v.form.publicationDate.required">The publicationDate is required</span>
                    </md-field>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button type="submit" class="md-primary" :disabled="sending">Save article</md-button>
                </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="articleSaved">The article was saved with success!</md-snackbar>
        </form>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {validationMixin} from "vuelidate";
import {minLength, required} from "vuelidate/lib/validators";
import {router} from "../../router";

export default {
    name: "EditArticle",
    mixins: [validationMixin],
    data: () => ({
        form: {
            id: null,
            title: null,
            subtitle: null,
            image: null,
            content: null,
            publicationDate: null,
            category_id: null,
            filename: null,
            data: null
        },
        articleSaved: false,
        sending: false,
        lastArticle: null
    }),
    validations: {
        form: {
            title: {
                required,
                minLength: minLength(3)
            },
            subtitle: {
                required,
                minLength: minLength(3)
            },
            content: {
                required,
            },
            publicationDate: {
                required
            },
            category_id: {
                required
            }
        }
    },
    created() {
        this.list().then(() => {

        })
        this.get(this.$route.params.id).then(response => {
            this.form.id = response.data.id
            this.form.title = response.data.title
            this.form.subtitle = response.data.subtitle
            this.form.content = response.data.content
            let date = response.data.publicationDate.split("T");
            this.form.publicationDate = date[0]
            this.form.category_id = response.data.category.id
            this.form.data = response.data.image
        })
    },
    computed: {
        ...mapState({
            category: state => state.category
        }),
    },
    methods: {
        ...mapActions('article', ['update', 'get']),
        ...mapActions('category', ['list']),
        onFileChange (e) {
            let form = this.form;
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
                form.filename = files[0].name
                form.data = reader.result
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            this.form = form
        },
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
            this.form.title = null
            this.form.subtitle = null
            this.form.content = null
            this.form.image = null
            this.form.publicationDate = null
        },
        saveArticle () {
            this.sending = true
            // Instead of this timeout, here you can call your API
            this.update(this.form).then(() => {
                this.articleSaved = true
                this.sending = false
                router.push({name: "listArticle"})
            })
        },
        validateArticle () {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.saveArticle()
            }
        },
        goAdmin() {
            router.push({name: 'listArticle'})
        }
    },
}
</script>

<style scoped>
.visualImg{
    max-width: 150px;
    max-height: 150px;
}
</style>
