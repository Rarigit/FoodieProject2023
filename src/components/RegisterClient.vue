<template>
    <div class="bodyWrap">
        <HeaderProject/>
            <br>
            <v-row>
                <h1 class="mx-auto">Client Register</h1>
            </v-row>
            <br>
                <v-btn class="ml-5 styleButton" 
                router-link to="/">Client Login
                </v-btn>
                <br>
                <br>
                <v-btn class="ml-5 styleButton"
                router-link to="/loginRestaurant">Login Restaurant
                </v-btn>
                <br>
                <br>
                <v-btn class="ml-5 styleButton"
                router-link to="/registerRestaurant">Registration Restaurant
                </v-btn>
            <br>
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
                        <br>
                        <v-btn color="green" large class="styleButton"
                        @click="postClient">Client Register
                        </v-btn>
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
import router from "@/router";
import FooterProject from "@/components/FooterProject.vue";
import HeaderProject from "@/components/HeaderProject.vue";

    export default {
        name: "RegisterClient",
        components: {
            HeaderProject,
            FooterProject,
        },
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
                    console.log("Success");
                    router.push(`/`)
                    }).catch((error)=>{
                    console.log(error);
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
    .styleButton{ 
        color: black;
        height: 4vh;
        box-shadow: 2px 2px 3px;
    }
</style>