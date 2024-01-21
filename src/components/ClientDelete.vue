<template>
    <div>
        <v-container>
            <v-btn color="green" large class="styleButton" @click="deleteClient">Delete User</v-btn>
        </v-container>
        <br>
        <v-alert
            type="error"
            v-model="showAlert"
            dismissible
            >
            {{ alertMessage }}
        </v-alert>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import cookies from "vue-cookies";

    export default {
        name: "ClientDelete",
        data() {
            return {
                url: process.env.VUE_APP_API_URL,
                alertMessage: "",
                showAlert: false
            }
        },
        methods: {
            deleteClient() {
                axios.request({
                    method : "DELETE",
                    url: this.url + "/client",
                    headers: {
                        'token' : cookies.get('clientToken'),
                        client: cookies.get('client')//This was the key to get DB to update changes.
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {//Just needed this data in the axios request as it needs to be deleted. No need to have this returned above in data or in the html.
                        email: this.email,
                        userName: this.userName,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Successful Deletion");
                    this.alertMessage = 'Client Profile deleted!';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
                    // window.location.reload();
                    cookies.remove(`clientToken`)
                    cookies.remove(`client`)
                    router.push(`/`)
                    }).catch((error)=>{
                    console.log(error);
                    this.alertMessage = 'Failed to delete client profile. Try again.';
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
    color: white;
    height: 7vh;
}
</style>