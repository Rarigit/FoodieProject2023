<template>
    <div class="bodyWrap">
        <HeaderProject/>
            <br>
            <v-row>
                <h1 class="mx-auto">Client Register</h1>
            </v-row>
            <br>
                <v-btn class="ml-5 styleButton" 
                router-link to="/">Client Login
                </v-btn>
                <br>
                <br>
                <v-btn class="ml-5 styleButton"
                router-link to="/loginRestaurant">Login Restaurant
                </v-btn>
                <br>
                <br>
                <v-btn class="ml-5 styleButton"
                router-link to="/registerRestaurant">Registration Restaurant
                </v-btn>
            <br>
            <br>
                <v-container>
                    <div class="formData">
                        <v-form>
                            <v-text-field
                            v-model="formData.email"
                            :rules="emailRules"
                            label="E-mail"
                            prepend-icon="mdi-email"
                            required
                            />
                            <v-text-field
                            v-model="formData.username"
                            :rules="[() => !!formData.username || 'This field is required']"
                            label="username"
                            placeholder="JohnDoe7"
                            prepend-icon="mdi-account"
                            required
                            />
                            <v-text-field
                            v-model="formData.firstName"
                            :rules="[() => !!formData.firstName || 'This field is required']"
                            label="First Name"
                            placeholder="John"
                            prepend-icon="mdi-account"
                            required
                            />
                            <v-text-field
                            v-model="formData.lastName"
                            :rules="[() => !!formData.lastName || 'This field is required']"
                            label="Last Name"
                            prepend-icon="mdi-account"
                            placeholder="Doe"
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
                            counter
                            prepend-icon="mdi-lock"
                            @click:append="show1 = !show1"
                            />
                            <br>
                            <v-btn color="green" large class="styleButton"
                            @click="postClient">Client Register
                            </v-btn>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </v-form>
                    </div>   
                </v-container>
            <FooterProject/>
    </div>
</template>

<script>
//axios.defaults.headers.common['x-api-key'] = process.env.apikey ==> This way you don't have to write header in every call./ nice shortcut
import axios from "axios";
import router from "@/router";
import FooterProject from "@/components/FooterProject.vue";
import HeaderProject from "@/components/HeaderProject.vue";

    export default {
        name: "RegisterClient",
        components: {
            HeaderProject,
            FooterProject,
        },
        data() {
            return {
                ////////////////He made this a function called formData()
                url: process.env.VUE_APP_API_URL,
                show1: false,
                // apiKey: process.env.VUE_APP_API_KEY,
                formData: {
                    email: "",
                    username: "",
                    firstName: "",
                    lastName: "",
                    password: "",
                     // pictureUrl: undefined
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
            postClient() {
                axios.request({///////Mark used axios.post. faster method
                    //axios.post()
                    //     process.env.VUE_APP_API_URL + "client post", //Mark set this all up in his env.local
                    //     this.formData
                    method : "POST",
                    url: this.url + "/client",
                    // headers: {
                    //     'x-api-key' : process.env.VUE_APP_API_KEY,
                    // },
                    data : {
                        email: this.formData.email,
                        username: this.formData.username,
                        firstName: this.formData.firstName,
                        lastName: this.formData.lastName,
                        password: this.formData.password
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Success");
                    router.push(`/`)
                    }).catch((error)=>{
                    console.log(error);
                    })
            },
        },
    }
</script>
    
<style scoped>
    .bodyWrap{
        background-image: url(https://imgs.search.brave.com/HLeqRVTtcQlw4vwIJr8tkCJawN5obKK30DKXmuxJ1LA/rs:fit:920:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/VWpPUENZSE5ZV2Qx/Z3NJRmU3bldRSGFE/MCZwaWQ9QXBp);
        background-repeat: no-repeat;
        background-size: cover;
    }
    .styleButton{ 
        color: black;
        height: 4vh;
        box-shadow: 2px 2px 3px;
    }

    .formData{
        width: 50vw;
        transform: relative;
        left: 50%;
        transform: translateX(50%);
    }
</style>