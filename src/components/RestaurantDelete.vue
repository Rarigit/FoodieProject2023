<template>
    <div>
        <v-container>
            <!-- This is more of a log-out than deletion of restaurant profile. There is no delete for Restaurant in API docs.  -->
            <!-- I might possible need to remove the logout button i made for restaurants, Leave it for now, confirm with Mark  -->
            <h2>Restaurant Log-Out</h2>
            <v-btn
            @click="deleteStore">Store Logout
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import cookies from "vue-cookies";

    export default {
        name: "RestaurantDelete",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
            }
        },
        methods: {
            deleteStore() {
                axios.request({
                    method : "DELETE",
                    url: "https://foodierest.ml/api/restaurant-login",
                    headers: {
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                        'token' : cookies.get('restaurantToken'),
                    },
                    data : {//Just needed this data in the axios request as it needs to be deleted. No need to have this returned above in data or in the html.
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
                    console.log("Successful Log-off");
                    alert('Store Logged Out!');
                    cookies.remove(`restaurantToken`)
                    cookies.remove(`restaurantID`)
                    router.push(`/loginRestaurant`)
                    }).catch((error)=>{
                    console.log(error);
                    alert('Failed to logout!');
                    })
            }
        },
    }
</script>

<style scoped>

</style>