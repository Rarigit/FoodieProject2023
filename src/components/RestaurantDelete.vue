<template>
    <div>
        <v-container>
            <!-- <h2 class="profileHead">Remove your Restaurant</h2> -->
            <br>
            <v-btn class="mx-auto styleButton red"
            @click="deleteStore">Delete Restaurant
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
                url: process.env.VUE_APP_API_URL,
            }
        },
        methods: {
            deleteStore() {
                axios.request({
                    method : "DELETE",
                    url: this.url + "/restaurant",
                    headers: {
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
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
.styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }

.profileHead{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    color: #072e35;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
</style>