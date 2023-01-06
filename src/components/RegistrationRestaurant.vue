<template>
    <div>
        <h1>Restaurant Signup</h1>
        <br>
        <router-link to="/">Home</router-link>
        <br>
        <br>
        <router-link to="/loginRestaurant">Login Restaurant</router-link>
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
                <v-btn @click="registerRestaurant">Register Restaurant
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

    export default {
        name: "RegistrationRestaurant",
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
                    // let restaurant  = response.data.restaurantId;
                    // cookies.set(`res`, restaurant)
                    // let restaurantToken = response.data.token;
                    // cookies.set(`resToken`, restaurantToken);
                    router.push(`/loginRestaurant`)
                    }).catch((error)=>{
                    console.log(error);
                    })
            },
        },
    }

</script>

<style scoped>
button{
        color: aqua;
        height: 4vh;
    }
</style>