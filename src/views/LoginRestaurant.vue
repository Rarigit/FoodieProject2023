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
                <v-spacer></v-spacer>
                <br>
                <v-btn 
                :disabled="!form"
                :loading="loading"
                block
                size="large"
                type="submit"
                variant="tonal"
                @click="logStore"
                >
                Login Restaurant
                </v-btn>
                <br>
                <v-spacer></v-spacer>
                <br>
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
        <br>
        <br>
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
    name: "LoginRestaurant",
    components: {
        HeaderProject,
        FooterProject
    },
    data() {
        return {
            // apiKey: process.env.VUE_APP_API_KEY,
            url: process.env.VUE_APP_API_URL,
            show1: false,
            formData: {
                    email: "",
                    password: "",
                },
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => (`The email and password you entered don't match`),
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                error: false
        }
    },
    methods: {
            logStore() {
                axios.request({
                    method : "POST",
                    url: this.url + "/restaurant-login",
                    // headers: {
                    //     'x-api-key' : process.env.VUE_APP_API_KEY,
                    // },
                    data : {
                        email: this.formData.email,
                        password: this.formData.password
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Store Logged In");
                    let store  = response.data.restaurantId;//Finally got it. It has to match letter for letter with the data names in the console response
                    cookies.set(`restaurantID`, store)
                    let storeToken = response.data.token;
                    cookies.set(`restaurantToken`, storeToken);
                    router.push(`/restProfile`)
                    }).catch((error)=>{
                    console.log(error);
                    this.error= true
                    })
            }
        },
        mounted () {
            // window.onbeforeunload = function() {////Sick code deletes cookies after I press the back button. Its in mounted as well so it applies automatically.
            // document.cookie = "restaurantToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/loginRestaurant;";
            // document.cookie = "restaurantID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/loginRestaurant;";
            // };
            // this.$root.$emit('restaurantToken',this.storeToken)
            // this.$root.$emit('restaurantID', this.storeToken)
        },
    }
</script>

<style scoped>
.bodyWrap{
    background-image: url(@/assets/foodze\ yellow.png);
    background-position: center;
    height: 100vh;
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

    .styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>