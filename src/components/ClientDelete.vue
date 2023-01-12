<template>
    <div>
        <v-container>
            <h2>Delete User</h2>
            <v-btn color="green" large class="styleButton"
            @click="deleteClient">Delete User
            </v-btn>
        </v-container>
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
                apiKey: process.env.VUE_APP_API_KEY,
            }
        },
        methods: {
            deleteClient() {
                axios.request({
                    method : "DELETE",
                    url: "https://foodierest.ml/api/client",
                    headers: {
                        'token' : cookies.get('clientToken'),
                        'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {//Just needed this data in the axios request as it needs to be deleted. No need to have this returned above in data or in the html.
                        email: this.email,
                        username: this.username,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Successful Deletion");
                    alert('User Deleted!');
                    cookies.remove(`clientToken`)
                    cookies.remove(`client`)
                    router.push(`/loginClientHome`)
                    }).catch((error)=>{
                    console.log(error);
                    alert('Failed to delete!');
                    })
            }
        },
    }
</script>

<style scoped>
.styleButton{
    color: black;
    height: 7vh;
    box-shadow: 2px 2px 3px;
}
</style>