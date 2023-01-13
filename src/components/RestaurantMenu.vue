<template>
    <div>
        <v-container>
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
            }
        },
        methods: {
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
                    console.log("Menu item created");
                    alert('Menu item created!')
                    }).catch((error)=>{
                    console.log(error);
                    alert('Failed to update Menu!')
                    })
            },
        },
        mounted () {
            this.$root.$emit('restaurantID')
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