<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <br>
            <v-row>
                <h1 class="mx-auto">Menu Profile (Restaurant Owners Only)</h1>
            </v-row>
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
                    <h3 class="mx-auto">{{menu.menuId}}</h3>
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
                <v-btn class="mx-auto styleButton" @click="logOut">Return to Home
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
                apiKey: process.env.VUE_APP_API_KEY,
                menus: [],
                restaurantID: cookies.get('restaurantID'),
                // menuID: cookies.get('menuID', this.newMenu)Just trying shit at this point because its not reading the value of the cookie for some reason
                menuId: Number,
            }
        },
        methods: {
            logOut() {
                cookies.remove(`restaurantToken`);
                cookies.remove(`restaurantID`);
                // cookies.remove('menuID');
                router.push(`/`);//Great success. Removed session tokens and router pushed all in one function. No need for confusing emits!
            },
        },
        mounted () {
            console.log(process.env.VUE_APP_API_KEY)//Test to see if it was registering the local env file. Make sure to store env.local in the correct place
            // console.log(menuID); //NEED TO GET THIS TO DISPLAY ON THE CONSOLE. NOT DOING COOKIES ANYMORE
            axios.request({
                    method : "GET",
                    url: "https://foodierest.ml/api/menu",
                    headers: {
                        'x-api-key' :  process.env.VUE_APP_API_KEY,
                    },
                    params : {//Eureka!!! it was params all along. LFG!!
                        'restaurantId': this.restaurantID,
                        'menuId': this.menuID,//It only works with the capital ID after menu for some reason. Makes zero sense--------------
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
            this.$root.$on('restaurantID');//This is displaying
            this.$root.$on('menuID');
            // console.log(cookies.get('restaurantID'));
            // console.log(cookies.get('menuID')); 
        },
    }
</script>

<style scoped>
.bodyWrap{
    background-color: bisque;
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