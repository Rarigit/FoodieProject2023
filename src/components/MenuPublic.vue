<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <div class="menus">
                <header>{{cart.length}} in cart
                    <v-btn color="green" large class="ml-5" router-link to="/orderRegister">Go To Cart</v-btn>
                </header>
                <br>
                <br>
                <!-- <div>
                    <v-btn class="mx-auto styleButton" color="orange" @click="refreshPage">Restart Order</v-btn>
                </div> -->
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
                        <v-btn class="mx-auto styleButton" @click="addCart(menu.name)">Select Menu Item
                        </v-btn>
                        <v-btn color="grey" class="mx-auto styleButton" @click="addMenu(menu.menuId)">Confirm Selection
                        </v-btn>
                        <v-btn class="mx-auto styleButton" @click="removeCart(menu.name)">Remove Menu Item 
                        </v-btn>
                        <v-btn color="grey" class="mx-auto styleButton" @click="removeMenu(menu.menuId)">Confirm Removal
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
            <br>
            <br>
            <br>
            <v-btn class="styleButton" color="red" @click="logOut">LogOut
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
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                menus: [],
                restaurantID: cookies.get('restaurantID'),
                client: cookies.get('client'),
                cart: [],
                menuCart: [],
            }
        },
        methods: {
            addCart(name) {
                console.log(name);
                this.cart.push(name);
                console.log(this.cart);
                let CartJson = JSON.stringify(this.cart);
                cookies.set('nameCart', CartJson);
            },
            addMenu(menuId) {
                console.log(menuId);
                this.menuCart.push(menuId);
                console.log(this.menuCart);
                let MenuJson = JSON.stringify(this.menuCart);
                cookies.set('menuCart', MenuJson);
            },
            removeCart(name) {
                this.cart.splice(this.cart.indexOf(name));
            },
            removeMenu(menuId) {
                this.cart.splice(this.cart.indexOf(menuId));
            },
            logOut() {
                cookies.remove(`clientToken`)
                cookies.remove(`client`)
                cookies.remove('nameCart')
                cookies.remove('menuCart')
                cookies.remove('selectStore')
                router.push(`/`);
            },
            // refreshPage() {
            //     location.reload();
            //     cookies.remove('nameCart');
            // },
        },
        mounted () {
            axios.request({
                method : "GET",
                url: this.url + "/menu",
                // headers: {
                //     'x-api-key' : process.env.VUE_APP_API_KEY,
                // },
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
                window.onbeforeunload = function() {////Sick code deletes cookies after I press the back button. Its in mounted as well so it applies automatically.
                document.cookie = "nameCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "menuCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                };
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

.styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>