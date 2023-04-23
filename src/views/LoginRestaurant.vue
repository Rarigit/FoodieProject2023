<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <br>
        <v-row>
            <h1 class="mx-auto">Restaurant Login</h1>
        </v-row>
        <br>
        <br>
        <div>
            <v-alert v-model="error" type="error" :value="true">Warning: Incorrect Email and/or Password</v-alert>
        </div>
        <br>
        <v-container>
            <v-form class="d-flex align-center">
                <v-text-field
                v-model="formData.email"
                :rules="emailRules"
                label="E-mail"
                prepend-icon="mdi-email"
                required
                />
                <v-spacer></v-spacer>
                <v-text-field
                v-model="formData.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Enter Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
                />
                <br>
                <v-spacer></v-spacer>
                <br>
                <v-btn color="green" large class="styleButton" @click="logStore">Login Restaurant
                </v-btn>
                <br>
                <v-spacer></v-spacer>
                <br>
                <v-btn class="styleButton" router-link to="/">Home
                </v-btn>
                <br>
                <v-spacer></v-spacer>
                <v-btn class="styleButton" router-link to="/registerRestaurant">Registration Restaurant
                </v-btn>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
            </v-form>
        </v-container>
        <FooterProject/>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";

    export default {
    name: "LoginRestaurant",
    components: {
        HeaderProject,
        FooterProject
    },
    data() {
        return {
            // apiKey: process.env.VUE_APP_API_KEY,
            url: process.env.VUE_APP_API_URL,
            show1: false,
            formData: {
                    email: "",
                    password: "",
                },
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => (`The email and password you entered don't match`),
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                error: false
        }
    },
    methods: {
            logStore() {
                axios.request({
                    method : "POST",
                    url: this.url + "/restaurant-login",
                    // headers: {
                    //     'x-api-key' : process.env.VUE_APP_API_KEY,
                    // },
                    data : {
                        email: this.formData.email,
                        password: this.formData.password
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Store Logged In");
                    let store  = response.data.restaurantId;//Finally got it. It has to match letter for letter with the data names in the console response
                    cookies.set(`restaurantID`, store)
                    let storeToken = response.data.token;
                    cookies.set(`restaurantToken`, storeToken);
                    router.push(`/restProfile`)
                    }).catch((error)=>{
                    console.log(error);
                    this.error= true
                    })
            }
        },
        mounted () {
            // window.onbeforeunload = function() {////Sick code deletes cookies after I press the back button. Its in mounted as well so it applies automatically.
            // document.cookie = "restaurantToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/loginRestaurant;";
            // document.cookie = "restaurantID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/loginRestaurant;";
            // };
            // this.$root.$emit('restaurantToken',this.storeToken)
            // this.$root.$emit('restaurantID', this.storeToken)
        },
    }
</script>

<style scoped>
.bodyWrap{
        background-image: url(https://imgs.search.brave.com/HLeqRVTtcQlw4vwIJr8tkCJawN5obKK30DKXmuxJ1LA/rs:fit:920:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/VWpPUENZSE5ZV2Qx/Z3NJRmU3bldRSGFE/MCZwaWQ9QXBp);
        background-repeat: no-repeat;
        background-size: cover;
    }

    .styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>