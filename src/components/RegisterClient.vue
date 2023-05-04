<template>
    <div class="bodyWrap">
        <HeaderProject/>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <v-card 
                class="mx-auto"
                max-width="600"
                title="Client Registration"
                >
                    <v-container class="formData">
                    <h3 class="cardTitle">Client Register</h3>
                            <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            color="rgb(1, 139, 139)"
                            label="Email"
                            variant="underlined"
                            />
                            <v-text-field
                            v-model="userName"
                            :rules="usernameRules"
                            color="rgb(1, 139, 139)"
                            label="Username"
                            variant="underlined"
                            />
                            <v-text-field
                            v-model="firstName"
                            :rules="nameRules"
                            color="rgb(1, 139, 139)"
                            label="First Name"
                            variant="underlined"
                            />
                            <v-text-field
                            v-model="lastName"
                            :rules="nameRules"
                            color="rgb(1, 139, 139)"
                            label="Last Name"
                            variant="underlined"
                            />
                            <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            label="Enter Password"
                            variant="underlined"
                            @click="togglePassword"
                            />
                            <br>
                            <v-checkbox
                            v-model="terms"
                            color="rgb(1, 139, 139)"
                            label="I agree to site terms and conditions"
                            ></v-checkbox>
                            <v-btn
                            block
                            variant="tonal"
                            color="green" large class="styleButton"
                            @click="postClient"
                            >
                            Client Register
                            </v-btn>
                            <br>
                            <div v-if="feedbackMsg">
                                <p class="feedbackMsg">{{ feedbackMsg }}</p>
                            </div>
                            <br>
                        </v-container>
                </v-card>
                <br>
                <br>
                <br>
                <br>
                <br>
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
                url: process.env.VUE_APP_API_URL,
                valid: false,
                userName: "",
                firstName: "",
                lastName: "",
                password: "",
                usernameRules: [
                    value => {
                    if (value) return true
                    return 'Username is required.'
                    },
                ],
                nameRules: [
                    value => {
                    if (value) return true
                    return 'Name is required.'
                    },
                ],
                email: '',
                emailRules: [
                    value => {
                    if (value) return true
                    return 'E-mail is required.'
                    },
                    value => {
                    if (/.+@.+\..+/.test(value)) return true
                    return 'E-mail must be valid.'
                    },
                ],
            }
        },
        methods: {
            postClient() {
                if (this.terms == false){
                    this.feedbackMsg = "Please click check box to agree to terms and conditions."
                } else if (this.terms == true){
                axios.request({///////Mark used axios.post. faster method
                    method : "POST",
                    url: this.url + "/client",
                    data : {
                        email: this.email,
                        userName: this.userName,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        password: this.password
                    }
                    }).then((response)=>{
                    console.log(response);
                    console.log("Success");
                    router.push(`/`)
                    }).catch((error)=>{
                    console.log(error);
                    this.feedbackMsg = error;
                    this.clearTextBox();
                    })
                }
            },
            clearTextBox(){
                this.username = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.username = "";
                this.password = "";
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
    .styleButton{ 
        color: black;
        height: 4vh;
        box-shadow: 2px 2px 3px;
    }

    .cardTitle{
        text-align: center;
    }
    .formData{
        background-color: white;  
        padding: 40px;
        border: 3px solid black;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }

    .feedbackMsg{
    margin-top: 30px;
    }
</style>