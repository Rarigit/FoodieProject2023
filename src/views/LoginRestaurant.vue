<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <br>
        <v-row>
            <h1 class="mx-auto">Restaurant Login</h1>
        </v-row>
        <br>
        <br>
        <br>
        <v-container>
            <v-form class="d-flex align-center">
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
                <br>
                <v-spacer></v-spacer>
                <br>
                <v-btn color="green" large class="styleButton" @click="logStore">Login Restaurant
                </v-btn>
                <br>
                <v-spacer></v-spacer>
                <br>
                <v-btn class="styleButton" router-link to="/">Home
                </v-btn>
                <br>
                <v-spacer></v-spacer>
                <v-btn class="styleButton" router-link to="/registerRestaurant">Registration Restaurant
                </v-btn>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
            </v-form>
        </v-container>
        <FooterProject/>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";

    export default {
    name: "LoginRestaurant",
    components: {
        HeaderProject,
        FooterProject
    },
    data() {
        return {
            apiKey: process.env.VUE_APP_API_KEY,
            email: "",
            password: ""
        }
    },
    methods: {
            logStore() {
                axios.request({
                    method : "POST",
                    url: "https://foodierest.ml/api/restaurant-login",
                    headers: {
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        email: this.email,
                        password: this.password
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Store Logged In");
                    let store  = response.data.restaurantId;//Finally got it. It has to match letter for letter with the data names in the console response
                    // this.$root.$emit(`displayLogin`, store)
                    cookies.set(`restaurantID`, store)
                    let storeToken = response.data.token;
                    cookies.set(`restaurantToken`, storeToken);
                    router.push(`/restProfile`)
                    }).catch((error)=>{
                    console.log(error);
                    alert(`Login Failed`)
                    })
            }
        },
        mounted () {
            this.$root.$emit('restaurantToken',this.storeToken)
            this.$root.$emit('restaurantID', this.storeToken)
            console.log(cookies.get('restaurantToken'));
            console.log(cookies.get('restaurantID'));
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