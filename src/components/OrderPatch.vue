<template>
    <div>
        <v-container>
            <v-row>
                <h2 class="mx-auto">Order Update</h2>
            </v-row>
            <br>
            <br>
        <h3>Do you wish to cancel your Order?</h3>
            <br>
            <br>
            <v-alert
                type="error"
                v-model="showAlert"
                dismissible
                >
                {{ alertMessage }}
            </v-alert>
            <v-form>
                <v-row>
                    <v-text-field class="mx-auto"
                    v-model="orderId"
                    label="Enter orderId"
                    prepend-icon="mdi-bio"
                    />
                    <v-switch
                        v-model="cancelOrder"
                        label="cancelOrder"
                        prepend-icon="mdi-cancel"
                        :value="cancelOrder"
                        color="red"
                    ></v-switch>
                    <!-- <v-text-field class="mx-auto" -->
                    <!-- v-model="cancelOrder"
                    label="Enter (True/False)"
                    prepend-icon="mdi-bio" -->
                    <!-- /> -->
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
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                clientToken: cookies.get('clientToken'),
                clientId: cookies.get('client'),
                orderId: cookies.get('orderId'),
                cancelOrder: false, //Default value as false
                alertMessage: "",
                showAlert: false
            }
        },
        methods: {
            editClient() {
                // Convert 'True'/'False' string to 1/0
                let isCancelledConverted = this.cancelOrder ? 1 : 0;
                axios.request({
                    method : "PATCH",
                    url: this.url + "/order-client",
                    headers: {
                        'token' : cookies.get('clientToken'),
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        orderId: this.orderId,
                        clientId: this.clientId,
                        cancelOrder: isCancelledConverted
                        // cancelOrder: this.cancelOrder,//Mark set this to true
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Order status updated!");
                    this.alertMessage = 'Order status Cancelled!';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
                    window.location.reload();
                    }).catch((error)=>{
                    console.log(error);
                    this.alertMessage = 'Failed to cancel your order. Try again.';
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

</style>