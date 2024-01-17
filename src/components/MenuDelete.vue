<template>
    <div>
        <v-container>
            <h2 class="headLine">Delete Menu</h2>
            <v-alert
                type="error"
                v-model="showAlert"
                dismissible
            >
                {{ alertMessage }}
            </v-alert>
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
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                menuId: null,
                showAlert: false,
                alertMessage: ""
            }
        },
        methods: {
            deleteMenu() {
                axios.request({
                    method : "DELETE",
                    url: this.url + "/menu",
                    headers: {
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                        token : cookies.get('restaurantToken'),
                        restaurantID: cookies.get('restaurantID')//Added this to headers as i kept getting errors whenever i tried to create a menu. Seems to work
                    },
                    data : {
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        menuId: Number(this.menuId),//Convert to number
                    },
                    }).then((response)=>{
                    console.log(response);
                    console.log("Successful deletion");
                    this.alertMessage = 'Menu item deleted successfully!';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
                    // router.push(`/menuProfile`)
                    window.location.reload();
                    }).catch((error)=>{
                    console.log(error);
                    this.alertMessage = 'Failed to delete menu item. Try again.';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
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

.headLine{
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    color: #072e35;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
</style>