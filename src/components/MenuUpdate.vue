<template>
    <div>
        <v-container>
            <h2 class="headLine">Edit Menu</h2>
            <v-alert
                type="error"
                v-model="showAlert"
                dismissible
            >
                {{ alertMessage }}
            </v-alert>
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
                <v-text-field
                v-model="imageUrl"
                label="imageUrl"
                prepend-icon="mdi-image"
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
// import router from "@/router";
import cookies from "vue-cookies";

    export default {
        name: "MenuUpdate",
        data() {
            return {
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                name: "",
                description: "",
                // price: [],
                // menuId: [],
                price: null,
                menuId: null,
                imageUrl: "",
                showAlert: false,
                alertMessage: ""
            }
        },
        methods: {
            editMenu() {
                axios.request({
                    method : "PATCH",
                    url: this.url + "/menu",
                    headers: {
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                        token : cookies.get('restaurantToken'),
                        restaurantID: cookies.get('restaurantID')//Added this to headers as i kept getting errors whenever i tried to create a menu. Seems to work
                    },
                    data : { //Correct Method. Mark confirmed.
                        name: this.name,
                        description: this.description,
                        price: Number(this.price),//Convert to number
                        menuId: Number(this.menuId), //Convert to number
                        imageUrl: this.imageUrl
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Successful update");
                    this.alertMessage = 'Menu item updated successfully!';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
                    // router.push(`/menuProfile`)
                    window.location.reload();
                    }).catch((error)=>{
                    console.log(error.response);
                    this.alertMessage = 'Failed to update menu item. Try again.';
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
.bodyWrap{
    background-color: bisque;
}
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