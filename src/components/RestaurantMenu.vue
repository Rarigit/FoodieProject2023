<template>
    <div>
        <v-container>
            <h2 class="headLine">Make a Menu</h2>
            <v-alert
                type="error"
                v-model="showAlert"
                dismissible
            >
                {{ alertMessage }}
            </v-alert>
            <v-form class="headLine">
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
                v-model="imageUrl"
                label="imageUrl"
                prepend-icon="mdi-image"
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
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                name: "",
                description: "",
                price: null,
                imageUrl: "",
                showAlert: false,
                alertMessage: ""
            }
        },
        methods: {
            createMenu() {
                axios.request({
                    method : "POST",
                    url: this.url + "/menu",
                    headers: {
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                        token : cookies.get('restaurantToken'),
                        restaurantID: cookies.get('restaurantID')//Added this to headers as i kept getting errors whenever i tried to create a menu. Seems to work
                    },
                    data : {
                        name: this.name,
                        description: this.description,
                        price: Number(this.price), //Convert to number
                        imageUrl: this.imageUrl
                        // menuId: this.menuId,
                    },
                    }).then((response)=>{
                    console.log(response);
                    console.log("Menu item created");
                    this.alertMessage = 'Menu item created successfully!';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
                    // alert('Menu item created!')
                    window.location.reload();
                    }).catch((error)=>{
                    console.log(error);
                    this.alertMessage = 'Failed to create menu item. Try again.';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
                    // alert('Failed to update Menu!')
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
.headLine{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    color: #072e35;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
</style>