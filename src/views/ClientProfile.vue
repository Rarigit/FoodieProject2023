<template>
    <div>
    <v-container v-if="!loggedIn">
        <!-- This is technically my ClientProfile page -->
        <!-- When Im logged in this page will display. If im not it wont display at all. -->
        <h1>Client Profile</h1>
        <div v-for="client in clients" :key="client.id">
            <h2>{{client.email}}</h2>
            <h2>{{client.firstName}}</h2>
            <h2>{{client.lastName}}</h2>
            <h2>{{client.username}}</h2>
        </div>
        <br>
        <v-btn @click="logOut">Client Logout</v-btn>
        <br>
        <br>
        <br>
        <router-link to="restPublic">See Restaurants</router-link>
        <br>
        <ClientUpdate/>
        <br>
        <ClientDelete/>
    </v-container>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
import ClientUpdate from "@/components/ClientUpdate.vue";
import ClientDelete from "@/components/ClientDelete.vue";


    export default {
        name: "ClientProfile",
        components: {
            ClientUpdate,
            ClientDelete,
            //Only once the client is logged in will they have the option to go to Restaurants page
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
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
                url: "https://foodierest.ml/api/client",
                headers: {
                    'x-api-key' : process.env.VUE_APP_API_KEY,
                    'token': cookies.get('clientToken'),//Genius code right here. This sets it to the unique token of each client. After which it displays the user profile of that client. 
                },                                      // That way both axios calls will succeed. 
                }).then((response)=>{
                console.log(response);
                this.clients = response.data;
                console.log("Success");
                // router.push(`/restPublic`)Redundant Operation as by doing this im just pushing it to the page its already on
                }).catch((error)=>{
                console.log(error);
                alert(`Access Denied`)
                router.push(`/loginClient`)
                });
        },
    }
</script>

<style scoped>
button{
        color: aqua;
        height: 4vh;
    }
</style>