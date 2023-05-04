<template>
    <div class="bodyWrap">
    <HeaderProject/>
    <br>
    <br>
    <br>
    <br>
    <br>
    <v-container v-if="!loggedIn">
        <div v-for="client in clients" :key="client.id">
            <v-row>
                <h2 class="mx-auto">{{client.username}}</h2>
                <h2 class="mx-auto">{{client.first_name}}</h2>
                <h2 class="mx-auto">{{client.last_name}}</h2>
                <h2 class="mx-auto">{{client.email}}</h2>
            </v-row>
        </div>
        <br>
        <br>
        <ClientUpdate/>
        <br>
        <br>
        <br>
        <br>
        <v-row class="mx-auto">
            <v-spacer></v-spacer>
            <v-btn class="mx-auto styleButton" @click="logOut">Client Logout</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mx-auto styleButton" router-link to="restPublic">See Restaurants</v-btn>
            <v-spacer></v-spacer>
        </v-row>
        <br>
    </v-container>
    <br>
    <br>
    <br>
    <br>
    <br>
    <FooterProject/>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
import ClientUpdate from "@/components/ClientUpdate.vue";
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";


    export default {
        name: "ClientProfile",
        components: {
            ClientUpdate,
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
    background-image: url(@/assets/foodze\ yellow.png);
    background-repeat: no-repeat;
    background-size: cover;
    /* background-position: center; */
    /* height: 100vh;
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;  */
    }
    .styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>