<template>
    <v-container>
        <v-form @submit.prevent="saveUser()">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="form.name"
                    :counter="10"
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    type="password"
                    v-model="form.password"
                    label="password"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    type="password"
                    v-model="form.c_password"
                    label="confirm password"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="form.email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn type="submit" block class="mt-2">Submit</v-btn>
            </v-container>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import Swal from 'sweetalert2';
import {mapActions} from "vuex";
export default {
    name: 'register',
    components: {

    },
    data: () => ({
        sending: false,
        userSaved: false,
        form: {
            email: null,
            password: null,
            c_password: null,
            name: null
        }
    }),
    methods: {
        ...mapActions('user', {
            register: 'register'
        }),
        clearForm () {
            this.form.name = null
            this.form.email = null
            this.form.password = null
            this.form.c_password = null
        },
        saveUser () {
            this.sending = true
                this.register(this.form)
                    .then(() => {
                        this.userSaved = true
                        this.sending = false
                        this.clearForm()
                            window.setTimeout(() => {
                                this.$router.push('/login')
                            }, 1500)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Une erreur est survenue",
                            text: error.data.message,
                            timer: 3000,
                            icon: 'error'
                        })
                        this.sending = false
                    })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
