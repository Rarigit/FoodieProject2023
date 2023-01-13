<template>
    <div>
        <v-container>
            <h2>Edit Restaurant Menu</h2>
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
                <v-text-field
                v-model="menuId"
                label="menuId"
                prepend-icon="mdi-bio"
                />
                <v-btn color="green" large class="mx-auto styleButton" @click="editMenu">Save changes
                </v-btn>
            </v-form>
            <br>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import cookies from "vue-cookies";

    export default {
        name: "MenuUpdate",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                name: "",
                description: "",
                price: [],
                menuId: [],
            }
        },
        methods: {
            editMenu() {
                axios.request({
                    method : "PATCH",
                    url: "https://foodierest.ml/api/menu",
                    headers: {
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                        'token' : cookies.get('restaurantToken'),
                    },
                    data : { //Correct Method. Mark confirmed.
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        menuId: this.menuId,
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Successful update");
                    alert('User info. updated!!')
                    router.push(`/loginRestaurant`)
                    }).catch((error)=>{
                    console.log(error);
                    alert('Failed edit');
                    })
            }
        },
    }
</script>

<style scoped>
.bodyWrap{
    background-color: bisque;
}
.styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>