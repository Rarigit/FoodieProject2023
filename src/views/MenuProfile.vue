<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <br>
            <br>
            <br>
            <br>
            <v-row>
                <h1 class="mx-auto profileHead">Menu Profile (Restaurant Owners Only)</h1>
            </v-row>
            <br>
            <br>
            <v-btn router-link to="/restOrderAlpha" class="mx-auto styleButton" large color="blue">Go To Client Orders</v-btn>
            <br>
            <br>
            <br>
            <br>
            <br>
            <h2 v-for= "menu in menus" :key="menu.menuId">
                <v-row>
                    <img class="menuImage" :src="menu.imageUrl" alt="">
                    <br>
                    <h4 class="mx-auto rowFont">{{menu.name}}</h4>
                    <br>
                    <h4 class="mx-auto rowFont">{{menu.description}}</h4>
                    <br>
                    <h4 class="mx-auto rowFont">${{menu.price}}</h4>
                    <br>
                    <h4 class="mx-auto rowFont">MenuId: {{menu.id}}</h4>
                </v-row>
            </h2>
            <br>
            <br>
            <br>
            <v-card class="menuCard">
                <RestaurantMenu/>
            </v-card>
            <!-- <RestaurantMenu/> -->
            <br>
            <br>
            <v-card class="menuCard">
                <MenuUpdate/>
            </v-card>
            <!-- <MenuUpdate/> -->
            <br>
            <br>
            <v-card class="menuCard">
                <MenuDelete/>
            </v-card>
            <!-- <MenuDelete/> -->
            <br>
            <br>
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
                router.push(`/`)
                window.location.reload();
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
        font-weight: bold;
    }

.menuCard{
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHTDwhpx0B-NbeRBjbYpojpEgXb1eRcLOzgA&usqp=CAU");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.profileHead{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    color: #072e35;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.rowFont{
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    color: #072e35;
    /* text-transform: uppercase; */
    letter-spacing: 0.5px;
}
</style>