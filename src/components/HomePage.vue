<template>
    <div>
        <h2>Home Page. This is basically client registration at this point need to make actual homepage</h2>
        <br>
        <router-link to="/loginClient">Client Login</router-link>
        <br>
        <router-link to="/loginRestaurant">Login Restaurant</router-link>
        <br>
        <router-link to="/registerRestaurant">Registration Restaurant</router-link>
        <br>
            <v-container>
                <v-form>
                    <v-text-field
                    v-model="email"
                    label="email"
                    prepend-icon="mdi-email"
                    />
                    <v-text-field
                    v-model="username"
                    label="Username"
                    prepend-icon="mdi-account-circle"
                    />
                    <v-text-field
                    v-model="firstName"
                    label="First name"
                    prepend-icon="mdi-mouse"
                    />
                    <v-text-field
                    v-model="lastName"
                    label="Last name"
                    prepend-icon="mdi-mouse"
                    />
                    <v-text-field
                    v-model="password"
                    label="password"
                    prepend-icon="mdi-lock"
                    />
                    <v-btn
                    @click="postClient">Client Register
                    </v-btn>
                </v-form>
            </v-container>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

    export default {
        name: "HomePage",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                email: "",
                username: "",
                firstName: "",
                lastName: "",
                password: ""
            }
        },
        methods: {
            postClient() {
                axios.request({
                    method : "POST",
                    url: "https://foodierest.ml/api/client",
                    headers: {
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        email: this.email,
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Success");// I technically don't have to set it to cookies in registration the data will still console return 
                                          //a client ID and token for this user i made via this axios post call. Having cookies set in registration and login is retarded. 
                    // let user  = response.data.clientId;
                    // cookies.set(`client`, user)
                    // let userToken = response.data.token;
                    // cookies.set(`clientToken`, userToken);
                    router.push(`/loginClient`)
                    }).catch((error)=>{
                    console.log(error);
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