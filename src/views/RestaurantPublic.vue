<template>
    <div>
        <v-container>
            <v-btn @click="getStore">See Restaurants
            </v-btn>
            <h2 v-for="restaurant,index in restaurants" :key="index">
                <h3 v-if="restaurant">
                    {{restaurant.name}}
                    {{restaurant.address}}
                    {{restaurant.bio}}
                    {{restaurant.city}}
                    {{restaurant.email}}
                    {{restaurant.phoneNum}}
                    <router-link :to="'/menuPublic/'+ restaurant.restaurantId">{{restaurant.restaurantId}}</router-link>
        <!-- How this works is the router link is binded to the path menuPublic which is a string plus the variable restaurant.restaurantId. This will then route  
        to the menuPublic/Number page that matches that restaurant id value. It will then reveal the mustache html within the curly brackets.          -->
                </h3>
            </h2>
            <router-link to="/menuPublic/">Go to Menus</router-link>
            <!-- <MenuPublic/> -->
            <br>
            <v-btn @click="logOut">Log Out 
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import router from '@/router';
import cookies from "vue-cookies";
// import MenuPublic from "@/components/MenuPublic.vue";

    export default {
        name: "RestaurantPublic",
        // components: {
        //     MenuPublic,
        // },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                name: "",
                address: "",
                bio: "",
                city: "",
                email: "",
                phoneNum: "",
                restaurantId: "",
                restaurants: []
            }
        },
        methods: {//Might need to put this in mounted state so it displays when page is clicked
            logOut() {
                cookies.remove(`clientToken`)
                cookies.remove(`client`)
                router.push(`/`);         
            },
            getStore(){
                axios.request({
                    method : "GET",
                    url: "https://foodierest.ml/api/restaurant",
                    headers: {
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        name: this.name,
                        address: this.address,
                        bio: this.bio,
                        city: this.city,
                        email: this.email,
                        phoneNum: this.phoneNum,
                        restaurantId: this.restaurantId,
                    }
                    }).then((response)=>{
                    console.log(response);
                    this.restaurants = response.data
                    console.log("Success");
                    router.push(`/restPublic`)
                    }).catch((error)=>{
                    console.log(error);
                    alert(`Access Denied`)
                    router.push(`/loginRestaurant`)
                    })
            },
        },
    }
</script>

<style scoped>

</style>