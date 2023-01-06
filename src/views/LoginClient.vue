<template>
    <div>
        <!-- <HomePage/> -->
        <h1>Client Login</h1>
        <br>
        <router-link to="/">Home</router-link>
        <v-container>
            <v-form>
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
                <v-btn @click="logClient">Client Login
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script>
// import HomePage from '../components/HomePage';
import axios from "axios";
import cookies from "vue-cookies";
import router from '@/router';

    export default {
        name: "LoginClient",
        components: {
            // HomePage,
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
button{
        color: aqua;
        height: 4vh;
    }
</style>