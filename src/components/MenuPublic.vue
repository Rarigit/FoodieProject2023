<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <div class="menus">
                <header>{{cart.length}} in cart
                    <v-btn color="green" large class="ml-5" router-link to="/orderRegister">Go To Cart</v-btn>
                </header>
                <br>
                <h2>Store Id: {{ $route.params.menuId }}</h2>
                <br>
                <h2 v-for= "menu in menus" :key="menu.menuId">
                    <img 
                    :src="menu.imageUrl" alt="">
                    <br>
                Name: {{menu.name}}
                    <br>
                Details: {{menu.description}}
                    <br>
                Cost: ${{menu.price}}
                    <br>
                MenuId: {{menu.menuId}}
                    <br>
                    <v-btn v-on:click="addMenu(menu.menuId)">Select
                    </v-btn>
                    <v-btn @click="addName(menu.name)">Confirm
                    </v-btn>
                    <v-btn @click="removeMenu(menu.menuId)">Remove from cart
                    </v-btn>
                    <br>
                    <br>
                </h2>
            </div>
            <br>
            <br>
            <br>
            <br>
            <v-btn @click="logOut">LogOut
            </v-btn>
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
        name: "MenuPublic",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                menus: [],
                restaurantID: cookies.get('restaurantID'),
                // menuId: Number,//-----------Does this even work?????
                client: cookies.get('client'),
                cart: [],
                nameCart: [],
            }
        },
        methods: {
            addMenu(menuId) {
                console.log(menuId);
                this.cart.push(menuId);
                console.log(this.cart);
                let cartJson = JSON.stringify(this.cart);
                cookies.set('newCart', cartJson);
            },
            addName(name) {
                console.log(name);
                this.nameCart.push(name);
                console.log(this.nameCart);
                let nameCartJson = JSON.stringify(this.nameCart);
                cookies.set('nameCart', nameCartJson);
            },
            removeMenu(menuId) {
                this.cart.splice(this.cart.indexOf(menuId));
            },
            logOut() {
                cookies.remove(`clientToken`)
                cookies.remove(`client`)
                router.push(`/`);
            },
        },
        mounted () {
            axios.request({
                method : "GET",
                url: "https://foodierest.ml/api/menu",
                headers: {
                    'x-api-key' : process.env.VUE_APP_API_KEY,
                },
                params : {
                    'restaurantId': this.$route.params.menuId,//Major key
                    'menuId': this.menuID,
                },
                }).then((response)=>{
                console.log(response);
                this.menus = response.data;
                console.log("Success");
                cookies.set('selectStore', response.data[0].restaurantId);
                }).catch((error)=>{
                console.log(error);
                alert(`Access Denied`)
                router.push(`/loginRestaurant`)
                })
        }
    }

</script>

<style scoped>
.bodyWrap{
    background-color: bisque;
}

header {
    background-color: aqua;
    text-align: right;
    height: 45px;
    font-size: 25px;
    box-shadow: 3px 3px 3px;
}
</style>