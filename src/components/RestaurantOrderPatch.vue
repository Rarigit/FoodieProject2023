<template>
    <div>
        <v-container>
            <v-row>
                <h2 class="mx-auto">Customer Order Confirmation</h2>
            </v-row>
            <br>
            <br>
            <br>
            <br>
        <h3>Complete Client Order</h3>
            <br>
            <br>
            <v-form>
                <v-row>
                    <v-text-field class="mx-auto"
                    v-model="orderId"
                    label="Enter orderId"
                    prepend-icon="mdi-mouse"
                    />
                    <v-switch
                        v-model="completeOrder"
                        label="completeOrder"
                        prepend-icon="mdi-check"
                        :value="completeOrder"
                        color="red"
                    ></v-switch>
                    <!-- <v-spacer></v-spacer>
                    <v-text-field class="mx-auto"
                    v-model="confirmOrder"
                    label="Enter (True/False)"
                    prepend-icon="mdi-pen"
                    /> -->
                    <v-spacer></v-spacer>
                    <v-btn class="mx-auto styleButton" large color="green" @click="confirmStoreOrder">Save Changes</v-btn>
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
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                restaurantToken: cookies.get('restaurantToken'),
                restaurantId: cookies.get('restaurantId'),
                orderId: "",
                // confirmOrder: true,
                completeOrder: true,//Can only have either confirm or complete.
            }
        },
        methods: {
            confirmStoreOrder() {
                // Convert 'True'/'False' string to 1/0
                let isCompleteConverted = this.completeOrder ? 1 : 0;
                axios.request({
                    method : "PATCH",
                    url: this.url + "/order-restaurant",
                    headers: {
                        'token' : cookies.get('restaurantToken'),
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        orderId: this.orderId,
                        restaurantId: this.restaurantId,
                        // confirmOrder: this.confirmOrder,
                        completeOrder: isCompleteConverted
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