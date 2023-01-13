<template>
    <div class="bodyWrap">
    <HeaderProject/>
    <v-container v-if="!loggedIn">
        <v-row>
            <h1 class="mx-auto">Restaurants Profile</h1>
        </v-row>
        <br>
        <br>
            <h2 v-for="restaurant,restaurantId in restaurants" :key="restaurantId">
                <h3 v-if="restaurantID">
                    <v-row>
                        <img class="restImage" :src="restaurant.bannerUrl" alt="Picture">
                        <br>
                        <h4 class="mx-auto">{{restaurant.name}}</h4>
                        <br>
                        <h4 class="mx-auto">{{restaurant.address}}</h4>
                        <br> 
                        <h4 class="mx-auto">{{restaurant.bio}}</h4>
                        <br> 
                        <h4 class="mx-auto">{{restaurant.city}}</h4>
                        <br>
                        <h4 class="mx-auto">{{restaurant.email}}</h4>
                        <br>
                        <h4 class="mx-auto">{{restaurant.phoneNum}}</h4>
                    </v-row>
                </h3>
            </h2>
        <br>
        <br>
        <v-row>
            <v-btn class="mx-auto styleButton" router-link to="/menuProfile">Go to Menus</v-btn>
        </v-row>
        <br>
        <br>
        <RestaurantUpdate/>
        <br>
        <br>
        <v-row>
            <v-btn color="green" large class="mx-auto styleButton" @click="logOut">Client Logout</v-btn>
        </v-row>
        <br>
        <br>
        <RestaurantDelete/>
        <br>
        <br>
        <br>
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
import RestaurantUpdate from "@/components/RestaurantUpdate.vue";
import RestaurantDelete from "@/components/RestaurantDelete.vue";
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";

    export default {
        name: "RestaurantProfile",
        components: {
            RestaurantUpdate,
            RestaurantDelete,
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                restaurants: [],
                loggedIn: false,
                restaurantID: cookies.get('restaurantID'),
                restaurantToken: cookies.get('restaurantToken')
            }
        },
        methods: {
            logOut() {
                cookies.remove(`restaurantToken`)
                cookies.remove(`restaurantID`)
                router.push(`/`);
                this.loggedIn = false
            }
        },
        mounted () {
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
.restImage{
    width: 15vw;
}
</style>