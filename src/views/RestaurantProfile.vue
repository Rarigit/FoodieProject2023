<template>
    <div class="bodyWrap">
    <HeaderProject/>
    <v-container>
        <v-row>
            <h1 class="mx-auto">Restaurants Profile</h1>
        </v-row>
        <br>
        <div>
            <v-alert v-model="error" type="error" :value="true"></v-alert>
        </div>
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
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                restaurants: [],
                restaurantID: cookies.get('restaurantID'),
                restaurantToken: cookies.get('restaurantToken'),
                error: false
            }
        },
        methods: {
            logOut() {
                cookies.remove(`restaurantToken`)
                cookies.remove(`restaurantID`)
                router.push(`/`);
            }
        },
        mounted () {
                axios.request({
                    method : "GET",
                    url: this.url + "/restaurant",
                    // headers: {
                    //     'x-api-key' : process.env.VUE_APP_API_KEY,
                    // },
                    params : {//Eureka!!! it was params all along. LFG!!
                        'restaurantId': this.restaurantID,
                    }
                    }).then((response)=>{
                    console.log(response);
                    this.restaurants = response.data;
                    console.log("Success");
                    }).catch((error)=>{
                    console.log(error);
                    // alert(`Access Denied`)
                    this.error= true;
                    router.push(`/loginRestaurant`)
                    })//I think its an integral part of the API which is why it might not work great.
                    // window.onbeforeunload = function() {////Sick code deletes cookies after I press the back button. Its in mounted as well so it applies automatically.
                    // document.cookie = "restaurantToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/loginRestaurant;";
                    // document.cookie = "restaurantID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/loginRestaurant;";
                    // }
                // this.$root.$on('restaurantID')
                // this.$root.$on('restaurantToken');
        }
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