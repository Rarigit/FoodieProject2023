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
            <h3>Restaurant Sign In</h3>
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
                loading: false,
                show1: false,
                form: false,
                url: process.env.VUE_APP_API_URL,
                email: "",
                password: "",
                feedbackMsg: "",
            // apiKey: process.env.VUE_APP_API_KEY,
            // url: process.env.VUE_APP_API_URL,
            // show1: false,
            // formData: {
            //         email: "",
            //         password: "",
            //     },
            //     rules: {
            //         required: value => !!value || 'Required.',
            //         min: v => v.length >= 8 || 'Min 8 characters',
            //         emailMatch: () => (`The email and password you entered don't match`),
            //     },
            //     emailRules: [
            //         v => !!v || 'E-mail is required',
            //         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            //     ],
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
                        email: this.email,
                        password: this.password
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
                    this.email= "";
                    this.password = "";
                    this.feedbackMsg = error;
                    // this.error= true
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
    background-position: center;
    height: 100vh;
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.v-card{
    text-align: center;
    background-color: whitesmoke;
    padding: 25px;
    /* position: absolute; */
    width: 40%;
    /* top: 30%;
    left: 50%; */
    /* transform: translateX(-50%); */
    border: 3px solid black;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
    .styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
</style>