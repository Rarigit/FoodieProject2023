<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <h1>Select a Restaurant</h1>
            <br>
            <h2>Select via Store ID</h2>
            <br>
            <h2 v-for="restaurant,index in restaurants" :key="index">
                    <h3 v-if="restaurant">
                        <v-row no-gutters>
                            <v-col class="d-flex">
                                <br>
                                <!-- I only need image, address and city. Make it look like a card like Skip does it. Too much unnecessary info-->
                                <img class="storeImage" :src="restaurant.bannerUrl" alt="Picture">
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                {{restaurant.name}}
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                {{restaurant.address}}
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <!-- {{restaurant.bio}} -->
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                {{restaurant.city}}
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <!-- {{restaurant.email}} -->
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <!-- {{restaurant.phoneNum}} -->
                                <v-btn class="mx-auto" color="green" large router-link :to="'/menuPublic/'+ restaurant.restaurantId">{{restaurant.restaurantId}}</v-btn>
                            </v-col>
                        </v-row>
                        <br>
                    </h3>
            </h2>
            <br>
            <br>
            <br>
            <v-row>
                <v-btn class="mx-auto styleButton" large @click="logOut">Return Home</v-btn> 
            </v-row>
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
import axios from "axios";
import router from '@/router';
import cookies from "vue-cookies";
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";


    export default {
        name: "RestaurantPublic",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
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
        methods: {
            logOut() {
                cookies.remove(`clientToken`)
                cookies.remove(`client`)
                router.push(`/`);         
            },
        },
        mounted () {
                axios.request({
                    method : "GET",
                    url: this.url + "/restaurant",
                    // headers: {
                    //     'x-api-key' : process.env.VUE_APP_API_KEY,
                    // },
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
                }).catch((error)=>{
                console.log(error);
                alert(`Access Denied`)
                router.push(`/loginRestaurant`)
                })

                window.onbeforeunload = function() {////Sick code deletes cookies after I press the back button. Its in mounted as well so it applies automatically.
                document.cookie = "selectStore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                };
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
.storeImage{
    width: 15vw;
}

</style>