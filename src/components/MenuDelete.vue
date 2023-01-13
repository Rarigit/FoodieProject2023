<template>
    <div>
        <v-container>
            <h2>Delete Restaurant Menu</h2>
            <br>
            <v-text-field
            v-model="menuId"
            label="Enter menuId"
            prepend-icon="mdi-bio"
            />
            <br>
            <v-btn color="green" large class="styleButton" @click="deleteMenu">Delete Menu 
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
// import router from "@/router";
import cookies from "vue-cookies";
    export default {
        name: "MenuDelete",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
            }
        },
        methods: {
            deleteMenu() {
                axios.request({
                    method : "DELETE",
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
                    console.log("Successful update");
                    alert('Menu item deleted!!')
                    }).catch((error)=>{
                    console.log(error);
                    alert('Failed Delete');
                    })
            }
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