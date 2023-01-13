<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <h2>SEE YOUR ORDERS</h2>
            <br>
            <h2>Clients Only</h2>
            <br>
            <div v-for="order in orders" :key="order.orderId">
                <v-row>
                    <h2 class="mx-auto">Client Id: {{order.clientId}}</h2>
                </v-row>
                <br>
                <v-row>
                    <h2 class="mx-auto">Order Time: {{order.createdAt}}</h2>
                </v-row>
                <br>
                <v-row>
                    <h2 class="mx-auto">Order Cancel: {{order.isCancelled}}</h2>
                </v-row>
                <br>
                <v-row>
                    <h2 class="mx-auto">Order Id: {{order.orderId}}</h2>
                </v-row>
                <br>
                <v-row>
                    <h2 class="mx-auto">Store Id: {{order.restaurantId}}</h2>
                </v-row>
                <br>
                <br>
            </div>
        <br>
        <br>
        <br>
        <OrderPatch/>
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
import OrderPatch from "@/components/OrderPatch.vue";

    export default {
        name: "OrderAlpha",
        components: {
            HeaderProject,
            FooterProject,
            OrderPatch,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                clientToken: cookies.get('clientToken'),
                orders: [],
            }
        },
        methods: {
            logOut() {
                cookies.remove(`clientToken`);
                cookies.remove(`client`);
                cookies.remove('nameCart');
                cookies.remove('newCart');
                cookies.remove('selectStore');
                router.push(`/`);
            }
        },
        mounted () {
            axios.request({
                method : "GET",
                url: "https://foodierest.ml/api/order",
                headers: {
                    'x-api-key' : process.env.VUE_APP_API_KEY,
                    'token': cookies.get('clientToken'),
                },                                      
                }).then((response)=>{
                console.log(response);
                this.orders = response.data;
                console.log("Success");
                }).catch((error)=>{
                console.log(error);
                alert(`Access Denied`)
                cookies.remove(`clientToken`);
                cookies.remove(`client`);
                cookies.remove('nameCart');
                cookies.remove('newCart');
                cookies.remove('selectStore');
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