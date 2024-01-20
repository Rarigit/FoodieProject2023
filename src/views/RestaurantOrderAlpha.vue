<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <h1>Restaurant Order Check</h1>
            <br>
            <br>
            <div v-for="order in orders" :key="order.orderId">
                <v-container
                    v-for="align in alignments"
                    :key="align"
                    class="grey lighten-7 mb-6"
                    >
                    <v-row
                    :align="align"
                    no-gutters
                    style="height: 250px;"
                    >
                    <v-col
                    v-for="n in 5"
                    :key="n"
                    >
                    <v-card
                    class="pa-2"
                    outlined
                    tile
                    >
                    <h2 class="mx-auto">Client Id: {{order.clientId}}</h2>
                    <h2 class="mx-auto">Order Time: {{order.createdAt}}</h2>
                    <h2 class="mx-auto">Order Cancel: {{order.isCancelled}}</h2>
                    <!-- <h2 class="mx-auto">Order Complete: {{order.isComplete}}</h2> -->
                    <h2 class="mx-auto">Order Complete: {{order.isComplete}}</h2>
                    <h2 class="mx-auto">Order Id: {{order.orderId}}</h2>
                    <!-- <h2 class="mx-auto">Store Id: {{order.restaurantId}}</h2> -->
                    <br>
                    </v-card>
                    </v-col>
                    </v-row>
                </v-container>
            </div>
        <br>
        <br>
        <br>
        <RestaurantOrderPatch/>
        <br>
        <br>
        <br>
        <v-row>
            <v-btn class="mx-auto styleButton" large color="grey" @click="logOut">Return to Home</v-btn>
        </v-row>
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
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";
import RestaurantOrderPatch from "@/components/RestaurantOrderPatch.vue";


    export default {
        name: "RestaurantOrderAlpha",
        components: {
            HeaderProject,
            RestaurantOrderPatch,
            FooterProject,
        },
        data() {
            return {
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                token: cookies.get('restaurantToken'),
                restaurantID: cookies.get('restaurantID'),
                orders: [],
                alignments: [
                    'start',
                    'center',
                    'end',
                ],
            }
        },
        methods: {
            logOut() {
                cookies.remove(`restaurantToken`)
                cookies.remove(`restaurantID`)
                router.push(`/`)
            }
        },
        mounted () {
            axios.request({
                method : "GET",
                url: this.url + "/order-restaurant",
                headers: {
                    // 'x-api-key' : process.env.VUE_APP_API_KEY,
                    token: cookies.get('restaurantToken'),
                    restaurantID: cookies.get('restaurantID')
                },                                      
                }).then((response)=>{
                console.log(response);
                this.orders = response.data;
                console.log("Success");
                }).catch((error)=>{
                console.log(error);
                alert(`Access Denied`)
                cookies.remove(`restaurantToken`);
                cookies.remove(`restaurantID`);
                router.push(`/`)
                });
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
</style>