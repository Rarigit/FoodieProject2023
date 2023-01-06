<template>
    <div>
    <v-container v-if="!loggedIn">
        <h1>Restaurants Profile</h1>
            <h2 v-for="restaurant,restaurantId in restaurants" :key="restaurantId">
                <h3 v-if="restaurantID">
                    {{restaurant.name}}
                    <br>
                    {{restaurant.address}}
                    <br> 
                    {{restaurant.bio}}
                    <br> 
                    {{restaurant.city}}
                    <br>
                    {{restaurant.email}}
                    <br>
                    {{restaurant.phoneNum}}
                </h3>
            </h2>
        <br>
        <br>
        <v-btn @click="logOut">Client Logout</v-btn>
        <br>
        <br>
        <RestaurantUpdate/>
        <br>
        <RestaurantDelete/>
        <br>
        <router-link to="/menuProfile">Go to Menus</router-link>
    </v-container>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
import RestaurantUpdate from "@/components/RestaurantUpdate.vue";
import RestaurantDelete from "@/components/RestaurantDelete.vue";

    export default {
        name: "RestaurantProfile",
        components: {
            RestaurantUpdate,
            RestaurantDelete,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                restaurants: [],
                loggedIn: false,
                // restaurantId: "",
                // restaurantID: "",
                // storeProfile: []
                restaurantID: cookies.get('restaurantID'),
                restaurantToken: cookies.get('restaurantToken')
            }
        },
        methods: {
            logOut() {
                cookies.remove(`restaurantToken`)
                cookies.remove(`restaurantID`)
                router.push(`/`);//Great success. Removed session tokens and router pushed all in one function. No need for confusing emits!
                this.loggedIn = false
            }
        },
        mounted () {//It displays on the page once in mounted state also you don't need a function just a straight axios request will suffice or else it doesn't work
                axios.request({
                    method : "GET",
                    url: "https://foodierest.ml/api/restaurant",
                    headers: {
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    params : {//Eureka!!! it was params all along. LFG!!
                        'restaurantId': this.restaurantID,
                    }
                    }).then((response)=>{
                    console.log(response);
                    this.restaurants = response.data;
                    console.log("Success");
                    // let restaurantID = cookies.get('restaurantID')
                    // console.log(restaurantID)
                    // router.push(`/accessRest`)Redundant Operation as by doing this im just pushing it to the page its already on
                    }).catch((error)=>{
                    console.log(error);
                    alert(`Access Denied`)
                    router.push(`/loginRestaurant`)
                    }),
            this.$root.$on('restaurantID')
            this.$root.$on('restaurantToken');
            console.log(cookies.get('restaurantID'));
            console.log(cookies.get('restaurantToken'));  
        },
    }
</script>

<style scoped>
button{
        color: aqua;
        height: 4vh;
    }
</style>