<template>
    <div class="bodyWrap">
    <HeaderProject/>
    <br>
    <v-container v-if="!loggedIn">
        <v-row>
            <h1 class="mx-auto">Client Profile</h1>
        </v-row>
        <br>
        <br>
        <br>
        <div v-for="client in clients" :key="client.id">
            <v-row>
                <h2 class="mx-auto">{{client.username}}</h2>
                <h2 class="mx-auto">{{client.firstName}}</h2>
                <h2 class="mx-auto">{{client.lastName}}</h2>
                <h2 class="mx-auto">{{client.email}}</h2>
            </v-row>
        </div>
        <br>
        <br>
        <v-row>
            <v-btn class="mx-auto styleButton" router-link to="restPublic">See Restaurants
        </v-btn>
        </v-row>
        <br>
        <ClientUpdate/>
        <br>
        <v-row>
            <v-btn class="mx-auto styleButton" @click="logOut">Client Logout</v-btn>
        </v-row>
        <br>
        <ClientDelete/>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </v-container>
    <FooterProject/>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
import ClientUpdate from "@/components/ClientUpdate.vue";
import ClientDelete from "@/components/ClientDelete.vue";
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";


    export default {
        name: "ClientProfile",
        components: {
            ClientUpdate,
            ClientDelete,
            HeaderProject,
            FooterProject,
            //Only once the client is logged in will they have the option to go to Restaurants page
        },
        data() {
            return {
                url: process.env.VUE_APP_API_URL,
                clients: [],
                loggedIn: false
            }
        },
        methods: {
            logOut() {
                cookies.remove(`clientToken`)
                cookies.remove(`client`)
                router.push(`/`)
                this.loggedIn = false
            }
        },
        mounted () {
            axios.request({
                method : "GET",
                url: this.url + "/client",
                headers: {
                    // 'x-api-key' : process.env.VUE_APP_API_KEY,
                    'token': cookies.get('clientToken'),//This sets it to the unique token of each client. After which it displays the user profile of that client. 
                },                                      
                }).then((response)=>{
                console.log(response);
                this.clients = response.data;
                console.log("Success");
                }).catch((error)=>{
                console.log(error);
                alert(`Access Denied`)
                router.push(`/loginClientHome`)
                });
        },
    }
</script>

<style scoped>
.bodyWrap{
        background-image: url(https://imgs.search.brave.com/R43Gdc2AQBiKlWckaWpR5-s3blyDQ3ONG55iwipwWEM/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/b25pS1hHYlAxSHB6/YkozVlpiM3VRSGFF/NyZwaWQ9QXBp);
        background-repeat: no-repeat;
        background-size: cover;
    }
    .styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>