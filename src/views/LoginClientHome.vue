<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <br>
        <!--This is now the new homepage-->
        <v-row>
            <h1 class="mx-auto">Sign In To Order</h1>
        </v-row>
        <br>
        <br>
        <div>
            <v-alert v-model="error" type="error" :value="true">Warning: Incorrect Email and/or Password</v-alert>
        </div>
        <br>
        <!-- <div class="block" ref="square">
            <svg class="ml-5" @click="animate" width="100px" height="100px" 
            stroke-width="1.5" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg" 
            color="#000000"><path d="M8 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z" 
            stroke="#000000" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" 
            stroke-linejoin="round"></path><path d="M10.05 17H15V6.6a.6.6 0 00-.6-.6H1M5.65 17H3.6a.6.6 0 01-.6-.6v-4.9" 
            stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path><path d="M2 9h4" stroke="#000000" 
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path><path d="M15 9h5.61a.6.6 0 01.548.356l1.79 4.028a.6.6 0 01.052.243V16.4a.6.6 0 01-.6.6h-1.9M15 17h1" 
            stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
            </svg> 
        </div> -->
        <br>
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
                <br>
                <br>
                <v-btn color="green" large class="ml-5" @click="logClient">Client Login
                </v-btn>
                <br>
                <v-spacer></v-spacer>
                <br>
                <v-btn class="ml-5" router-link to="/registerClient">Register as Client
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
            </v-form>
        </v-container>
        <FooterProject/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import router from '@/router';
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";
// import anime from 'animejs';

    export default {
        name: "LoginClientHome",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                show1: false,
                url: process.env.VUE_APP_API_URL,
                // apiKey: process.env.VUE_APP_API_KEY,
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
                error: false,
            }
        },
        methods: {
            logClient() {
                axios.request({
                    method : "POST",
                    url: this.url + "/client-login",
                    // headers: {
                    //     'x-api-key' : process.env.VUE_APP_API_KEY,
                    // },
                    data : {
                        email: this.formData.email,
                        password: this.formData.password,
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Client Logged In");
                    let user  = response.data.clientId;
                    cookies.set(`client`, user)
                    let userToken = response.data.token;
                    cookies.set(`clientToken`, userToken);//Actually need this session token to get access to the AccessClientPage
                    router.push(`/clientProfile`)//Need to router push to an access user page 
                    }).catch((error)=>{
                    console.log(error);
                    this.error= true
                    })
            },
            // animate() {
            //     anime({                                     
            //         targets: this.$refs.square,
            //         // translateX: function(el, i) {
            //         //    return 50 + (-50 * i);
            //         // },
            //         translateY: function(el, i) {
            //             return 250 + (-250 * i);
            //         },
            //         scale: function(el, i, l) {
            //             return (l - i) + .25;
            //         },
            //         // rotate: function() { return anime.random(-250, 360); },
            //         borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
            //         duration: function() { return anime.random(1200, 1800); },
            //         delay: function() { return anime.random(0, 400); },
            //         translateX: 1500,
            //         strokeDashoffset: [anime.setDashoffset, 0],
            //         easing: 'easeInOutSine',
            //         direction: 'alternate',
            //         loop: true
            //     });
            // },
        },
        mounted () {
            window.onbeforeunload = function() {////Sick code deletes cookies after I press the back button. Its in mounted as well so it applies automatically.
            document.cookie = "clientToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "client=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            };
        },
    }
    
    
</script>

<style scoped>
.bodyWrap{
        background-image: url(https://imgs.search.brave.com/HLeqRVTtcQlw4vwIJr8tkCJawN5obKK30DKXmuxJ1LA/rs:fit:920:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/VWpPUENZSE5ZV2Qx/Z3NJRmU3bldRSGFE/MCZwaWQ9QXBp);
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        width: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }

.grad1 img {
    -webkit-mask-image: linear-gradient(rgb(0,0,0), transparent);
    mask-image: linear-gradient(black, transparent);
}
button{
        color: aqua;
        height: 4vh;
    }
</style>