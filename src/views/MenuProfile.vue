<template>
    <div>
        <v-container>
            <!-- Not displaying for some reason -->
            <h2 v-for= "menu in menus" :key="menu.menuId">
                {{menu.name}}
                <br>
                {{menu.description}}
                <br>
                {{menu.price}}
                <br>
                <!-- Lesson learned don't over complicate stuff. Just added a damn menuId  -->
                {{menu.menuId}}
                <br>
                {{menu.imageUrl}}
            </h2>
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
            <v-btn @click="logOut">LogOut
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
import RestaurantMenu from "@/components/RestaurantMenu.vue";
import MenuUpdate from "@/components/MenuUpdate.vue";
import MenuDelete from "@/components/MenuDelete.vue"

    export default {
        name: "MenuProfile",
        components: {
            RestaurantMenu,
            MenuUpdate,
            MenuDelete,
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

</style>