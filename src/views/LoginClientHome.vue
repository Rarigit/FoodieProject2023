<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <v-card class="mx-auto px-6 py-8" color="white" max-width="400">
            <h3>Sign In</h3>
            <v-form
            v-model="form"
            @submit.prevent="onSubmit"
            >
        <!-- <div class="block" ref="square">
            <svg class="ml-5" @click="animate" width="100px" height="100px" 
            stroke-width="1.5" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg" 
            color="#000000"><path d="M8 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z" 
            stroke="#000000" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" 
            stroke-linejoin="round"></path><path d="M10.05 17H15V6.6a.6.6 0 00-.6-.6H1M5.65 17H3.6a.6.6 0 01-.6-.6v-4.9" 
            stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path><path d="M2 9h4" stroke="#000000" 
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path><path d="M15 9h5.61a.6.6 0 01.548.356l1.79 4.028a.6.6 0 01.052.243V16.4a.6.6 0 01-.6.6h-1.9M15 17h1" 
            stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path>
            </svg> 
        </div> -->
            <v-text-field
                v-model="email"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                clearable
                label="E-mail"
                prepend-icon="mdi-email"
                required
                />
                <v-spacer></v-spacer>
            <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[required]"
                :type="show1 ? 'text' : 'password'"
                color="rgb(1, 139, 139)"
                label="Password"
                hint="At least 8 characters"
                variant="underlined"
                clearable
                @click="togglePassword"
                />
                <br>
                <v-btn
                :disabled="!form"
                :loading="loading"
                block
                size="large"
                type="submit"
                variant="tonal"
                @click="logClient"
                >
                Sign In
                </v-btn>
                <br>
                <v-spacer></v-spacer>
                <br>
                <br>
                <div v-if="feedbackMsg">
                    <p class="feedbackContainer"> {{ feedbackMsg }}</p>
                </div>
                <br>
            </v-form>
            </v-card>
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
        <FooterProject/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import router from '@/router';
import HeaderProject from "@/components/HeaderProject.vue";
import FooterProject from "@/components/FooterProject.vue";
// import anime from 'animejs';

    export default{
        name: "LoginClientHome",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                loading: false,
                show1: false,
                form: false,
                url: process.env.VUE_APP_API_URL,
                email: "",
                password: "",
                feedbackMsg: "",
            }
        },
        methods: {
            logClient() {
                axios.request({
                    method : "POST",
                    url: this.url + "/client-login",
                    data : {
                        email: this.email,
                        password: this.password,
                    }
                    }).then((response)=>{
                    console.log("Client Logged In");
                    cookies.set(`client`, response.data.clientId);
                    cookies.set(`clientToken`, response.data.token);//Actually need this session token to get access to the AccessClientPage
                    router.push(`/clientProfile`)//Need to router push to an access user page 
                    }).catch((error)=>{
                    console.log(error);
                    this.email= "";
                    this.password = "";
                    this.feedbackMsg = error;
                    })
            },
            onSubmit () {
                if (!this.form) return
                this.loading = true
                setTimeout(() => (this.loading = false), 2000)
            }, 
            required (v) {
                return !!v || 'Field is required'
            },
            togglePassword() {
                this.show = !this.show;
            }
        },
    }
    
    
</script>

<style scoped>
.bodyWrap{
        background-image: url(@/assets/foodze\ yellow.png);
        /* background-repeat: no-repeat; */
        /* background-size: cover; */
        background-position: center;
        height: 100vh;
        width: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }

.v-btn{
    margin-top: 25px;
    width: 150px;
}
.v-btn:hover {
    color: white;
    background-color: rgb(1, 139, 139);
}
.v-btn:active {
    color: white;
    background-color: rgb(1, 139, 139);
}
.feedbackContainer{
    margin-top: 30px;
}

</style>