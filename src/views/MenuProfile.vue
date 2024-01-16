<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <br>
            <v-row>
                <h1 class="mx-auto">Menu Profile (Restaurant Owners Only)</h1>
            </v-row>
            <br>
            <v-btn router-link to="/restOrderAlpha" class="mx-auto styleButton" large color="red">Go To Client Orders</v-btn>
            <br>
            <br>
            <br>
            <h2 v-for= "menu in menus" :key="menu.menuId">
                <v-row>
                    <img class="menuImage" :src="menu.imageUrl" alt="">
                    <br>
                    <h3 class="mx-auto">{{menu.name}}</h3>
                    <br>
                    <h3 class="mx-auto">{{menu.description}}</h3>
                    <br>
                    <h3 class="mx-auto">${{menu.price}}</h3>
                    <br>
                    <h3 class="mx-auto">MenuId: {{menu.id}}</h3>
                </v-row>
            </h2>
            <br>
            <br>
            <RestaurantMenu/>
            <br>
            <br>
            <MenuUpdate/>
            <br>
            <br>
            <MenuDelete/>
            <br>
            <br>
            <v-row>
                <v-btn class="mx-auto styleButton" color="grey" large @click="logOut">Return to Home
            </v-btn>
            </v-row>
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
import RestaurantMenu from "@/components/RestaurantMenu.vue";
import MenuUpdate from "@/components/MenuUpdate.vue";
import MenuDelete from "@/components/MenuDelete.vue";
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";


    export default {
        name: "MenuProfile",
        components: {
            RestaurantMenu,
            MenuUpdate,
            MenuDelete,
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                menus: [],
                restaurantID: cookies.get('restaurantID'),
                menuId: Number,
            }
        },
        methods: {
            logOut() {
                cookies.remove(`restaurantToken`);
                cookies.remove(`restaurantID`);
                router.push(`/`);
            },
        },
        mounted () {
            // console.log(process.env.VUE_APP_API_KEY)
            axios.request({
                    method : "GET",
                    url: this.url + "/menu",
                    // headers: {
                    //     'x-api-key' :  process.env.VUE_APP_API_KEY,
                    // },
                    params : {
                        'restaurantId': this.restaurantID,
                        'menuId': this.menuID,
                    }
                    }).then((response)=>{
                    console.log(response);
                    this.menus = response.data;
                    console.log("Success");
                    }).catch((error)=>{
                    console.log(error);
                    alert(`Access Denied`)
                    router.push(`/loginRestaurant`)
                    })
            this.$root.$on('restaurantID');
            this.$root.$on('menuID');
        },
    }
</script>

<style scoped>
.bodyWrap{
    background-image: url(https://imgs.search.brave.com/R43Gdc2AQBiKlWckaWpR5-s3blyDQ3ONG55iwipwWEM/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/b25pS1hHYlAxSHB6/YkozVlpiM3VRSGFF/NyZwaWQ9QXBp);
    background-repeat: no-repeat;
    background-size: cover;
}

.menuImage{
        width: 10vw;
    }
    .styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>