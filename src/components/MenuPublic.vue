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
                    <br>
                    <v-row>
                        <v-btn class="mx-auto" @click="addMenu(menu.menuId)">Select MenuId 
                        </v-btn>
                        <br>
                        <v-btn class="mx-auto" @click="addName(menu.name)">Select Menu Name
                        </v-btn>
                        <v-btn class="mx-auto" @click="removeMenu(menu.menuId)">Remove MenuId from cart
                        </v-btn>
                        <v-btn class="mx-auto" @click="removeName(menu.name)">Remove Menu Name from cart
                        </v-btn>
                    </v-row>
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
            removeName(name) {
                this.nameCart.splice(this.nameCart.indexOf(name));
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
    background-image: url(https://imgs.search.brave.com/R43Gdc2AQBiKlWckaWpR5-s3blyDQ3ONG55iwipwWEM/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/b25pS1hHYlAxSHB6/YkozVlpiM3VRSGFF/NyZwaWQ9QXBp);
    background-repeat: no-repeat;
    background-size: cover;
}

header {
    background-color: aqua;
    text-align: right;
    height: 45px;
    font-size: 25px;
    box-shadow: 3px 3px 3px;
}
</style>