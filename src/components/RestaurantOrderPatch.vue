<template>
    <div>
        <v-container>
            <v-row>
                <h2 class="mx-auto">Customer Order Confirmation</h2>
            </v-row>
            <br>
            <br>
        <h3>Confirm Client Order</h3>
            <br>
            <br>
            <v-form>
                <v-row>
                    <v-text-field class="mx-auto"
                    v-model="orderId"
                    label="Enter orderId"
                    prepend-icon="mdi-bio"
                    />
                    <v-text-field class="mx-auto"
                    v-model="confirmOrder"
                    label="Enter (True/False)"
                    prepend-icon="mdi-bio"
                    />
                    <v-spacer></v-spacer>
                    <v-btn color="green" large class="mx-auto styleButton" @click="confirmStoreOrder">Save changes</v-btn>
                </v-row>
            </v-form>
            <br>
            <br>
            <br>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

    export default {
        name: "RestaurantOrderPatch",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                restaurantToken: cookies.get('restaurantToken'),
                orderId: "",
                confirmOrder: "",
            }
        },
        methods: {
            confirmStoreOrder() {
                axios.request({
                    method : "PATCH",
                    url: "https://foodierest.ml/api/order",
                    headers: {
                        'token' : cookies.get('restaurantToken'),
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        orderId: this.orderId,
                        confirmOrder: this.confirmOrder,
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Order status confirmed");
                    alert('Order Status Confirmed!')
                    }).catch((error)=>{
                    console.log(error);
                    alert('Failed edit');
                    })
            }
        },
    }
</script>

<style scoped>

</style>