<template>
    <div class="bodyWrap">
        <!-- <HeaderProject/> -->
        <v-container>
            <div class="menu_alpha">
                <header>{{cart.length}} in cart
                    <v-btn color="green" large class="ml-5" router-link to="/orderRegister">Go To Cart</v-btn>
                </header>
                <br>
                <br>
                <br>
                <h2>Store Id: {{ $route.params.menuId}}</h2>
                <br>
                <h2 v-for= "menu, index in menu_alpha" :key="index" class="profileHead">
                    <img 
                    :src="menu.imageUrl" alt="">
                    <br>
                Name: {{menu.name}}
                    <br>
                Details: {{menu.description}}
                    <br>
                Cost: ${{menu.price}}
                    <br>
                Menu Id: {{menu.id}}
                    <br>
                    <br>
                    <v-row>
                        <v-btn class="mx-auto styleButton blue" @click="addCart(menu.name)">Select Menu Item
                        </v-btn>
                        <v-btn color="grey" class="mx-auto styleButton" @click="addMenu(menu.id)">Confirm Selection
                        </v-btn>
                        <v-btn class="mx-auto styleButton red" @click="removeCart(menu.name)">Remove Menu Item 
                        </v-btn>
                        <v-btn color="grey" class="mx-auto styleButton" @click="removeMenu(menu.id)">Confirm Removal
                        </v-btn>
                    </v-row>
                    <br>
                    <br>
                </h2>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <v-row>
                <v-btn class="styleButton" color="white" @click="backStores">Back to Restaurants</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="styleButton" color="red" @click="logOut">LogOut</v-btn>
            </v-row>
            <br>
            <br>
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
// import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";

    export default {
        name: "MenuPublic",
        components: {
            // HeaderProject,
            FooterProject,
        },
        data() {
            return {
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                // menu: [],
                menu_alpha: [],
                restaurantId: cookies.get('restaurantID'),
                client: cookies.get('client'),
                cart: [],
                menuCart: [],
                // imageCart: [],
                id: "",
                name: "",
                description: "",
                price: "",
                imageUrl: "",
            }
        },
        methods: {
            // addImage(imageUrl) {
            //     console.log(imageUrl);
            //     this.imageCart.push(imageUrl);
            //     console.log(this.imageCart);
            //     let imageJson = JSON.stringify(this.imageCart);
            //     cookies.set('imageCart', imageJson);
            // },
            addCart(name) {
                console.log(name);
                this.cart.push(name);
                console.log(this.cart);
                let CartJson = JSON.stringify(this.cart);
                cookies.set('nameCart', CartJson);
            },
            addMenu(id) {
                console.log(id);
                this.menuCart.push(id);
                console.log(this.menuCart);
                let MenuJson = JSON.stringify(this.menuCart);
                cookies.set('menuCart', MenuJson);
            },
            removeCart(name) {
                this.cart.splice(this.cart.indexOf(name));
            },
            removeMenu(id) {
                this.cart.splice(this.cart.indexOf(id));
            },
            logOut() {
                cookies.remove(`clientToken`)
                cookies.remove(`client`)
                cookies.remove('nameCart')
                cookies.remove('menuCart')
                cookies.remove('selectStore')
                router.push(`/`);
                window.location.reload();
            },
            backStores() {
                cookies.remove('selectStore')
                cookies.remove('nameCart')
                cookies.remove('menuCart')
                router.push('/restPublic')
                window.location.reload();
            }
        },
        mounted () {
            axios.request({
                method : "GET",
                url: this.url + "/menu",
                params : {
                    restaurantId: this.$route.params.menuId,//Major key
                    // 'restaurantId' : this.restaurantId,
                    menuId: this.menuID,
                    // menuId : this.menuId,
                    // 'id': this.id,
                    // 'name': this.name,
                    // 'description': this.description,
                    // 'price': this.price,
                    // imageUrl: this.imageUrl,
                    // 'searchCategory': this.searchCategory
                },
                }).then((response)=>{
                console.log(response);
                this.menu_alpha = response.data;
                console.log("Menu alpha bruv");
                cookies.set('selectStore', response.data[0].restaurantId);
                // cookies.set('menuItemId', response.data[0].id)
                }).catch((error)=>{
                console.log(error);
                alert(`Access Denied`)
                // router.push(`/loginRestaurant`)
                })
                window.onbeforeunload = function() {////Sick code deletes cookies after I press the back button. Its in mounted as well so it applies automatically.
                document.cookie = "nameCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "menuCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                };
        }
    }

</script>

<style scoped>
.bodyWrap{
    background-image: url(https://imgs.search.brave.com/R43Gdc2AQBiKlWckaWpR5-s3blyDQ3ONG55iwipwWEM/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/b25pS1hHYlAxSHB6/YkozVlpiM3VRSGFF/NyZwaWQ9QXBp);
    /* background-image: url(@/assets/foodze-high-resolution-logo-color-on-transparent-background.png); */
    background-repeat: no-repeat;
    background-size: cover;
}

.menuContainer{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
}


header {
    background-color: white;
    text-align: right;
    height: 45px;
    font-size: 25px;
    box-shadow: 3px 3px 3px;
}

.styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
        font-weight: bold;
    }

.img{
    width: 10vw;
}
.profileHead{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    color: #072e35;
    /* text-transform: uppercase; */
    letter-spacing: 0.2px;
}
</style>