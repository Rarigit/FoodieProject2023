<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <br>
        <v-card
        class="d-flex flex-column justify-center mb-6"
        >
        <v-form>
                    <v-text-field
                    v-model="formData.name"
                    :rules="[() => !!formData.name || 'This field is required']"
                    label="Store Name"
                    :error-messages="errorMessages"
                    placeholder="Leo's Pizzeria"
                    prepend-icon="mdi-account"
                    required
                    />
                    <v-text-field
                    v-model="formData.address"
                    :rules="[
                    () => !!formData.address || 'This field is required',
                    () => !!formData.address && formData.address.length <= 25 || 'Address must be less than 25 characters',
                    addressCheck
                    ]"
                    label="Address Line"
                    placeholder="Snowy Rock Pl"
                    counter="25"
                    prepend-icon="mdi-map"
                    required
                    />
                    <v-text-field
                    v-model="formData.bio"
                    label="Bio"
                    prepend-icon="mdi-bio"
                    :rules="[() => !!formData.bio || 'This field is required']"
                    placeholder="Best restaurant in town!"
                    required
                    />
                    <v-text-field
                    v-model="formData.city"
                    :rules="[() => !!formData.city || 'This field is required', addressCheck]"
                    label="City"
                    placeholder="El Paso"
                    prepend-icon="mdi-city"
                    required
                    />
                    <v-text-field
                    v-model="formData.email"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                    required
                    />
                    <v-text-field
                    v-model="formData.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Enter Password"
                    hint="At least 8 characters"
                    prepend-icon="mdi-lock"
                    counter
                    @click:append="show1 = !show1"
                    />
                    <v-text-field
                    v-model="formData.phoneNum"
                    label="phone"
                    prepend-icon="mdi-phone"
                    />
                    <v-text-field
                    v-model="bannerUrL"
                    label="Banner Image"
                    prepend-icon="mdi-mouse"
                    />
                    <v-btn color="green" large class="styleButton" @click="registerRestaurant">Register Restaurant
                    </v-btn>
                    <br>
                </v-form>
            <br>
            <br>
        </v-card>
        <FooterProject/>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import HeaderProject from "./HeaderProject.vue";
import FooterProject from "./FooterProject.vue";


    export default {
        name: "RegistrationRestaurant",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                show1: false,
                errorMessages: "",
                formData: {
                    name: "",
                    address: "",
                    bio: "",
                    city: "",
                    email: "",
                    password: "",
                    phoneNum: "",
                    bannerUrl: undefined,
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
            }
        },
        methods: {
            registerRestaurant() {
                axios.request({
                    method : "POST",
                    url: this.url + "/restaurant",
                    // headers: {
                    //     'x-api-key' : process.env.VUE_APP_API_KEY,
                    // },
                    data : {
                        name: this.formData.name,
                        address: this.formData.address,
                        bio: this.formData.bio,
                        city: this.formData.city,
                        email: this.formData.email,
                        password: this.formData.password,
                        phoneNum: this.formData.phoneNum,
                        bannerUrl: this.formData.bannerUrl,
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Success");// RestaurantID and token is still set irregardless if i set a cookie or not. I just need to set cookies at login.
                    router.push(`/loginRestaurant`)
                    }).catch((error)=>{
                    console.log(error);
                    })
            },
            addressCheck () {
                this.errorMessages = this.formData.address && !this.formData.name
                ? `Hey! I'm required`
                : ''
                return true
            },
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

    .formData{
        width: 50vw;
        transform: relative;
        left: 50%;
        transform: translateX(50%);
    }

</style>