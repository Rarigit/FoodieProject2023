<template>
    <div>
        <v-container>
            <!-- Need to find a way to get the page to reload once a function runs or an a axios call is made. Maybe mounted?? -->
            <h2>Make a Menu</h2>
            <v-form>
                <v-text-field
                v-model="name"
                label="name"
                prepend-icon="mdi-account-circle"
                />
                <v-text-field
                v-model="description"
                label="description"
                prepend-icon="mdi-map-marker"
                />
                <v-text-field
                v-model="price"
                label="Price"
                prepend-icon="mdi-bio"
                />
                <v-btn color="green" large class="styleButton" @click="createMenu">Create Menu Item
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
// import router from "@/router";
import cookies from "vue-cookies";

    export default {
        name: "RestaurantMenu",
        props: {
            menuId: {
                type: Number,
            }
        },
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                name: "",
                description: "",
                price: [],
                // menuId: [],
            }
        },
        methods: {//Need to make a lot more menus. Also need a menu delete and menu update component (AS A RESTAURANT) 
            createMenu() {
                axios.request({
                    method : "POST",
                    url: "https://foodierest.ml/api/menu",
                    headers: {
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                        'token' : cookies.get('restaurantToken'),
                    },
                    data : {
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        menuId: this.menuId,
                    },
                    }).then((response)=>{
                    console.log(response);
                    // let menuToken  = response.data.menuId;
                    // cookies.set('menuID', response.data.menuId);
                    // console.log(menuToken);
                    console.log("Menu item created");
                    alert('Menu item created!')
                    // router.push(`/restMenu`).....Don't push to page as the form just shows up.
                    }).catch((error)=>{
                    console.log(error);
                    alert('Failed to update Menu!')
                    })
            },
        },
        mounted () {
            // this.$root.$emit('menuId')//Not defined on the console--------------
            this.$root.$emit('restaurantID')
            // console.log(menuId); //not defined on the console--------------------
            // console.log(cookies.get('restaurantID'));
        },
    }
</script>

<style scoped>
.styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>