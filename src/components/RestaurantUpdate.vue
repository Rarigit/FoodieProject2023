<template>
    <div>
        <h2>Edit Restaurant Profile</h2>
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
                label="email (NO CHANGE PERMITTED HERE. KEEP EMAIL SAME!!)"
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
                <v-btn class="mx-auto styleButton" @click="updateRestaurant">Save Changes
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import cookies from "vue-cookies";

    export default {
        name: "RestaurantUpdate",
        data() {
            return {
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                name: "",
                address: "",
                bio: "",
                city: "",
                email: "",
                password: "",
                phoneNum: "",
            }
        },
        methods: {
            updateRestaurant() {
                axios.request({
                    method : "PATCH",
                    url: this.url + "/restaurant",
                    headers: {
                        'token' : cookies.get('restaurantToken'),
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        name: this.name,
                        address: this.address,
                        bio: this.bio,
                        city: this.city,
                        email: this.email,
                        password: this.password,
                        phoneNum: this.phoneNum,
                    }
                    }).then((response)=>{
                    console.log(response);
                    alert('Restaurant info. updated!!')
                    cookies.remove(`restaurantToken`)
                    cookies.remove(`restaurantID`)
                    router.push(`/loginRestaurant`)
                    }).catch((error)=>{
                    console.log(error);
                    })
            },
        },
    }
</script>

<style scoped>
.styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }

</style>