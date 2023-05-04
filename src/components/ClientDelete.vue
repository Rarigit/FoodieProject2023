<template>
    <div>
        <v-container>
            <v-btn color="green" large class="styleButton" @click="deleteClient">Delete User</v-btn>
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
                url: process.env.VUE_APP_API_URL,
            }
        },
        methods: {
            deleteClient() {
                axios.request({
                    method : "DELETE",
                    url: this.url + "/client",
                    headers: {
                        'token' : cookies.get('clientToken'),
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
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
    color: white;
    height: 7vh;
}
</style>