<template>
    <div>
        <v-container>
            <v-row>
                <h2 class="mx-auto">Order Confirmation</h2>
            </v-row>
            <br>
            <br>
        <h3>Do you wish to cancel your Order?</h3>
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
                    v-model="cancelOrder"
                    label="Enter (True/False)"
                    prepend-icon="mdi-bio"
                    />
                    <v-spacer></v-spacer>
                    <v-btn color="green" large class="mx-auto styleButton" @click="editClient">Save changes</v-btn>
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
// import router from "@/router";
import cookies from "vue-cookies";

    export default {
        name: "OrderPatch",
        data() {
            return {
                apiKey: process.env.VUE_APP_API_KEY,
                clientToken: cookies.get('clientToken'),
                orderId: cookies.get('orderId'),
                cancelOrder: "",
            }
        },
        methods: {
            editClient() {
                axios.request({
                    method : "PATCH",
                    url: "https://foodierest.ml/api/order",
                    headers: {
                        'token' : cookies.get('clientToken'),
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        orderId: this.orderId,
                        cancelOrder: this.cancelOrder,
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Order status updated!");
                    alert('Order Status Updated!')
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