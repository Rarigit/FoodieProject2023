<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <v-container>
            <br>
            <v-row>
                <h1 class="mx-auto">Your Orders</h1>
            </v-row>
            <br>
            <br>
            <h2 v-for="trolley in trolleys" :key="trolley">
            <v-row>
                <h3 class="mx-auto">{{trolley}}</h3>
            </v-row>
            </h2>
            <br>
            <h2 v-for="item in items" :key=item>
            <v-row>
                <h3 class="mx-auto">Selected Menu Items: {{item}}</h3> 
            </v-row>
            </h2>
            <br>
            <br>
            <br>
            <br>
            <br>
            <v-row>
                <v-btn color="green" large class="mx-auto styleButton" @click="setOrder">Make an Order
                </v-btn>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <v-btn class="mx-auto styleButton" large @click="backStore">Back to Restaurants
                </v-btn>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <v-btn class="mx-auto styleButton" large  @click="logOut"> LogOut
                </v-btn>
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
        </v-container>
        <FooterProject/>
    </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";

    export default {
        name: "OrderRegister",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                restaurantId: cookies.get('selectStore'),///Only one restaurantId per menu data so this was easy to set.
                apiKey: process.env.VUE_APP_API_KEY,
                items: [cookies.get('newCart')],///Setting the items array needed in the api call to the array of strings gleaned from my cart cookie
                trolleys: [cookies.get('nameCart')],
            }   
        },
        methods: {
            setOrder() {
                axios.request({
                    method : "POST",
                    url: "https://foodierest.ml/api/order",
                    headers: {
                        'token' : cookies.get('clientToken'),
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        restaurantId: this.restaurantId,
                        items: this.items.map(string => parseInt(string,10)),///HAD TO TURN THAT ARRAY OF STRINGS INTO AN ARRAY OF INTEGERS!!
                    },
                    }).then((response)=>{
                    console.log(response);
                    console.log("Order created");
                    alert('Order completed!')
                    // router.push(`/restMenu`).....Don't push to page as the form just shows up.
                    }).catch((error)=>{
                    console.log(error);
                    alert('Order Failed')
                    })
            },
            backStore() {
                cookies.remove('selectStore');
                cookies.remove('newCart');
                cookies.remove('clientToken');
                cookies.remove('client');
                cookies.remove('nameCart')
                router.push('/restPublic');
            },
            logOut() {
                cookies.remove('clientToken');
                cookies.remove('client');
                cookies.remove('selectStore');
                cookies.remove('newCart');
                cookies.remove('nameCart');
                router.push(`/`)//Homepage for now will edit later such as back to Orders or client login
            },
        mounted () {
        }
        }
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