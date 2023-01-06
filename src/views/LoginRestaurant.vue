<template>
    <div>
        <!-- <RegistrationRestaurant/> -->
        <h1>Restaurant Login</h1>
        <br>
        <router-link to="/">Home</router-link>
        <br>
        <br>
        <router-link to="/registerRestaurant">Registration Restaurant</router-link>
        <v-container>
            <v-form>
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
                <v-btn @click="logStore">Login Restaurant
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';

    export default {
    components: { 
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
button{
        color: aqua;
        height: 4vh;
    }
</style>