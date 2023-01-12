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
        <br>
        <br>
        <v-container>
            <v-form class="d-flex align-center">
                <v-text-field
                v-model="email"
                label="email"
                prepend-icon="mdi-email"
                />
                <v-text-field
                v-model="password"
                label="password"
                prepend-icon="mdi-lock"
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

    export default {
        name: "LoginClientHome",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                email: "",
                password: "",
            }
        },
        methods: {
            logClient() {
                axios.request({
                    method : "POST",
                    url: "https://foodierest.ml/api/client-login",
                    headers: {
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        email: this.email,
                        password: this.password
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
                    alert(`Invalid credentials. Try again`);
                    })
            }
        },
    }
    
</script>

<style scoped>
.bodyWrap{
        background-image: url(https://imgs.search.brave.com/HLeqRVTtcQlw4vwIJr8tkCJawN5obKK30DKXmuxJ1LA/rs:fit:920:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/VWpPUENZSE5ZV2Qx/Z3NJRmU3bldRSGFE/MCZwaWQ9QXBp);
        background-repeat: no-repeat;
        background-size: cover;
    }
button{
        color: aqua;
        height: 4vh;
    }
</style>