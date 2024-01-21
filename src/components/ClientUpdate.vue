<template>
    <div>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="10">
                    <v-card class="elevation-6 mt-10">
                        <v-window v-model="step">
                            <v-window-item :value="1">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-card-text class="mt-12">
                                            <v-row align="center" justify="center">
                                                <v-col cols="12" sm="8">
                                                    <h2>Edit Personal Info.</h2>
                                                    <br>
                                                    <v-text-field
                                                    v-model="userName"
                                                    label="Username"
                                                    prepend-icon="mdi-account-circle"
                                                    />
                                                    <v-text-field
                                                    v-model="firstName"
                                                    label="First name"
                                                    prepend-icon="mdi-mouse"
                                                    />
                                                    <v-text-field
                                                    v-model="lastName"
                                                    label="Last name"
                                                    prepend-icon="mdi-mouse"
                                                    />
                                                    <v-text-field
                                                    v-model="password"
                                                    label="password"
                                                    prepend-icon="mdi-lock"
                                                    />
                                                    <br>
                                                    <v-row class="mx-auto">
                                                        <v-btn color="green" large class="styleButton" @click="editClient">Save Changes</v-btn>
                                                    </v-row>
                                                    <br>
                                                    <v-alert
                                                        type="error"
                                                        v-model="showAlert"
                                                        dismissible
                                                    >
                                                        {{ alertMessage }}
                                                    </v-alert>
                                                    <br>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="12" sm="6" class="blue rounded-bl-xl">
                                        <div style="text-align:center; padding: 180px 0;">
                                            <v-card-text class="white--text">
                                                <h2 class="text-center">Are you sure you want to delete?</h2>
                                                <h3 class="text-center">
                                                    Delete your profile
                                                </h3>
                                            </v-card-text>
                                            <br>
                                            <div class="text-center">
                                                <ClientDelete/>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                        </v-window>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
// import router from "@/router";
import cookies from "vue-cookies";
import ClientDelete from "@/components/ClientDelete.vue";

    export default {
    name: "ClientUpdate",
    components: {
        ClientDelete,
    },
    data() {
        return {
            // apiKey: process.env.VUE_APP_API_KEY,
            url: process.env.VUE_APP_API_URL,
            // email: "",
            userName: "",
            firstName: "",
            lastName: "",
            password: "",
            alertMessage: "",
            showAlert: false
        };
    },
    methods: {
        editClient() {
            axios.request({
                method: "PATCH",
                url: this.url + "/client",
                headers: {
                    "token": cookies.get("clientToken"),
                    // 'x-api-key' : process.env.VUE_APP_API_KEY,
                },
                data: {
                    // email: this.email,
                    userName: this.userName,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    password: this.password
                }
            }).then((response) => {
                console.log(response);
                console.log("Successful update");
                this.alertMessage = 'Client Profile updated!';
                this.showAlert = true;
                //Dismiss the alert after 3 seconds
                setTimeout(()=> {
                    this.showAlert = false;
                }, 3000);
                window.location.reload();
                // cookies.remove(`clientToken`)
                // cookies.remove(`client`)
                // router.push(`/loginClientHome`)
            }).catch((error) => {
                console.log(error);
                this.alertMessage = 'Failed to update client profile. Try again.';
                this.showAlert = true;
                //Dismiss the alert after 3 seconds
                setTimeout(()=> {
                    this.showAlert = false;
                }, 3000);
            });
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