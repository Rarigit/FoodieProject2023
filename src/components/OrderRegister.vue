<template>
    <div class="bodyWrap">
        <!-- <HeaderProject/> -->
        <v-container>
            <br>
            <v-row>
                <h1 class="mx-auto profileHead">Order(s) Cart</h1>
            </v-row>
            <br>
            <br>
            <br>
            <h2 v-for="trolley in trolleys" :key="trolley">
            <v-row>
                <h3 class="mx-auto">{{trolley}}</h3>
            <!-- This is the second data-point in my trolleys array, in particular the string containing the name, which makes more sense for the users to see   -->
            </v-row>
            </h2>
            <br>
            <br>
            <br>
            <br>
            <br>
            <v-row>
                <v-btn color="green" large class="mx-auto styleButton" @click="setOrder">Confirm Order</v-btn>
                <br>
                <v-btn router-link to="/orderAlpha" class="mx-auto styleButton" color="blue" large>Get Order Info.</v-btn>
                <br>
                <v-btn class="mx-auto styleButton" large @click="backStore">Back to Restaurants</v-btn>
                <br>
                <v-btn class="mx-auto styleButton" large color="red" @click="logOut"> LogOut</v-btn>
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
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
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
        name: "OrderRegister",
        components: {
            // HeaderProject,
            FooterProject,
        },
        data() {
            return {
                url: process.env.VUE_APP_API_URL,
                // menuItemId: cookies.get('menuItemId'),
                restaurantId: cookies.get('selectStore'),///Only one restaurantId per menu data so this was easy to set.
                clientId: cookies.get('client'),
                // restaurantId: "",
                // clientId: "",
                // apiKey: process.env.VUE_APP_API_KEY,
                items: [cookies.get('menuCart')],///Setting the items array needed in the api call to the array of strings gleaned from my cart cookie
                trolleys: [cookies.get('nameCart'), cookies.get('imageUrl')],
                token: cookies.get('clientToken'),
                // order_id: [],
            }   
        },
        methods: {
            setOrder() {
                console.log("Sending token:", this.token)
                axios.request({
                    method : "POST",
                    url: this.url + "/order",
                    headers: {
                        token: cookies.get('clientToken')
                        // 'clientToken': this.token
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        // restaurantId: this.restaurantId.toString(),
                        clientId: this.clientId.toString(),
                        // clientId: this.clientId,
                        // menuItemId: this.menuItemId,
                        items: this.items.map(item => parseInt(item,10)),///HAD TO TURN THAT ARRAY OF STRINGS INTO AN ARRAY OF INTEGERS!!
                        // items: this.items,
                        // restaurantId: this.restaurantId
                        restaurantId: this.restaurantId.toString(),
                        // order_id: this.order_id
                    },
                    }).then((response)=>{
                    console.log(response);
                    console.log("Order created");
                    alert('Order completed!')
                    // cookies.remove('nameCart');
                    // cookies.remove('menuCart');
                    // cookies.remove('') --> or else the order will keep populating and not leave. Good code
                    }).catch((error)=>{
                    console.log(error);
                    alert('Order Failed')
                    })
            },
            backStore() {
                cookies.remove('selectStore');
                cookies.remove('menuCart');
                // cookies.remove('clientToken');
                // cookies.remove('client');
                cookies.remove('nameCart')
                router.push('/restPublic');
                window.location.reload();
            },
            logOut() {
                cookies.remove('clientToken');
                cookies.remove('client');
                cookies.remove('selectStore');
                cookies.remove('menuCart');
                cookies.remove('nameCart');
                router.push(`/`)
                window.location.reload();
            },
        },
        // mounted () {
        //     window.onbeforeunload = function() {////Sick code deletes cookies after I press the back button. Its in mounted as well so it applies automatically.
        //         document.cookie = "nameCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //         document.cookie = "menuCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //         };
        // },
    }   
</script>

<style scoped>
.bodyWrap{
    background-image: url(https://imgs.search.brave.com/R43Gdc2AQBiKlWckaWpR5-s3blyDQ3ONG55iwipwWEM/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/b25pS1hHYlAxSHB6/YkozVlpiM3VRSGFF/NyZwaWQ9QXBp);
    background-repeat: no-repeat;
    background-size: cover;
}
.styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
        font-weight: bold;
    }

    .profileHead{
    font-family: 'Roboto', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    color: #072e35;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
</style>