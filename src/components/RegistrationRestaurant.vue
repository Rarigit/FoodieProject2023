<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <br>
        <v-row>
            <h1 class="mx-auto">Restaurant Signup</h1>
        </v-row>
        <br>
        <v-btn class="ml-5 styleButton" router-link to="/">Home
        </v-btn>
        <br>
        <br>
        <v-btn class="ml-5 styleButton" router-link to="/loginRestaurant">Login Restaurant
        </v-btn>
        <v-container>
            <v-form>
                <v-text-field
                v-model="name"
                label="Store name"
                prepend-icon="mdi-account-circle"
                />
                <v-text-field
                v-model="address"
                label="Address"
                prepend-icon="mdi-map-marker"
                />
                <v-text-field
                v-model="bio"
                label="Bio"
                prepend-icon="mdi-bio"
                />
                <v-text-field
                v-model="city"
                label="City"
                prepend-icon="mdi-city"
                />
                <v-text-field
                v-model="email"
                label="email"
                prepend-icon="mdi-email"
                />
                <v-text-field
                v-model="password"
                label="password"
                prepend-icon="mdi-lock"
                />
                <v-text-field
                v-model="phoneNum"
                label="phone"
                prepend-icon="mdi-phone"
                />
                <v-btn color="green" large class="styleButton" @click="registerRestaurant">Register Restaurant
                </v-btn>
                <br>
            </v-form>
            <br>
            <br>
        </v-container>
        <FooterProject/>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import HeaderProject from "./HeaderProject.vue";
import FooterProject from "./FooterProject.vue";

    export default {
        name: "RegistrationRestaurant",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                name: "",
                address: "",
                bio: "",
                city: "",
                email: "",
                password: "",
                phoneNum: "",
                bannerUrl: ""
            }
        },
        methods: {
            registerRestaurant() {
                axios.request({
                    method : "POST",
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
                        password: this.password,
                        phoneNum: this.phoneNum,
                        bannerUrl: this.bannerUrl,
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Success");// RestaurantID and token is still set irregardless if i set a cookie or not. I just need to set cookies at login.
                    router.push(`/loginRestaurant`)
                    }).catch((error)=>{
                    console.log(error);
                    })
            },
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
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }

</style>