<template>
    <div>
        <v-container>
            {{ $route.params.menuId }}
            <h2 v-for= "menu in menus" :key="menu.menuId">
                {{menu.name}}
                <br>
                {{menu.description}}
                <br>
                {{menu.price}}
                <br>
                {{menu.menuId}}
                <br>
                <img 
                :src="menu.imageUrl" alt="">
            </h2>
            <br>
            <br>
            <v-btn @click="logOut">LogOut
            </v-btn>
        </v-container>
    </div>
</template>

<script>
// import store from "@/store.js";
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
    export default {
        name: "MenuPublic",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                menus: [],
                restaurantID: cookies.get('restaurantID'),
                // menuId: Number,//-----------Does this even work?????
                client: cookies.get('client'),
            }
        },
        methods: {
            logOut() {
                cookies.remove(`clientToken`)
                cookies.remove(`client`)
                router.push(`/`);//Great success. Removed session tokens and router pushed all in one function. No need for confusing emits!
            },
        },
        mounted () {
            axios.request({
                method : "GET",
                url: "https://foodierest.ml/api/menu",
                headers: {
                    'x-api-key' : process.env.VUE_APP_API_KEY,
                },
                params : {//Eureka!!! it was params all along. LFG!!
                    'restaurantId': this.$route.params.menuId,//???????? Hope it works. It does. LFG!!!
                    'menuId': this.menuID,//It only works with the capital ID after menu for some reason. Makes zero sense--------------
                },
                }).then((response)=>{
                console.log(response);
                this.menus = response.data;
                console.log("Success");
                }).catch((error)=>{
                console.log(error);
                alert(`Access Denied`)
                router.push(`/loginRestaurant`)
                })
            // this.$root.$on('menuId');
            // this.$root.$on('restaurantID');
        },
    }

</script>

<style scoped>

</style>