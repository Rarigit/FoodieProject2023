<template>
    <div class="bodyWrap">
        <HeaderProject/>
        <br>
        <br>
        <br>
        <br>
        <v-card
        class="d-flex flex-column justify-center mb-6"
        >
        <v-form>
            <v-container>
                <h3 class="cardTitle">Restaurant Register</h3>
                <br>
                <v-row>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="name"
                        :rules="[() => !!name || 'This field is required']"
                        label="Store Name"
                        :error-messages="errorMessages"
                        placeholder="Leo's Pizzeria"
                        prepend-icon="mdi-account"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="address"
                        :rules="[
                        () => !!address || 'This field is required',
                        () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
                        addressCheck
                        ]"
                        label="Address Line"
                        placeholder="Snowy Rock Pl"
                        counter="25"
                        prepend-icon="mdi-map"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >   
                        <v-text-field
                        v-model="bio"
                        label="Bio"
                        prepend-icon="mdi-bio"
                        :rules="[() => !!bio || 'This field is required']"
                        placeholder="Best restaurant in town!"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="city"
                        :rules="[() => !!city || 'This field is required', addressCheck]"
                        label="City"
                        placeholder="El Paso"
                        prepend-icon="mdi-city"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        prepend-icon="mdi-email"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Enter Password"
                        hint="At least 8 characters"
                        prepend-icon="mdi-lock"
                        counter
                        @click:append="show1 = !show1"
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="phoneNum"
                        label="Phone"
                        prepend-icon="mdi-phone"
                        ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-text-field
                        v-model="bannerUrL"
                        label="Banner Image"
                        prepend-icon="mdi-mouse"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
                <v-btn color="green" large class="styleButton" @click="registerRestaurant">Register Restaurant
                </v-btn>
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
                url: process.env.VUE_APP_API_URL,
                show1: false,
                valid: false,
                errorMessages: "",
                name: "",
                address: "",
                bio: "",
                city: "",
                email: "",
                password: "",
                phoneNum: "",
                bannerUrl: undefined,
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
                        name: this.name,
                        address: this.address,
                        bio: this.bio,
                        city: this.city,
                        email: this.email,
                        password: this.password,
                        phoneNum: this.phoneNum,
                        bannerUrl: this.bannerUrl,
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
            clearTextBox(){
                this.name = "";
                this.address = "";
                this.bio = "";
                this.city = "";
                this.email = "";
                this.password = "";
                this.phoneNum = "";
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
    background-position: center;
    /* position: absolute; */
    width: 40%;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid black;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.cardTitle{
    text-align: center;
}
.v-btn{
    font-size: 12pt;
    color: white;
    background-color: black;
}
p{
    color: black;
    font-size: 16pt;
    font-weight: bold;
}
.error{
    color: white;
    font-weight: bold;
    font-size: 10pt;
    margin-top: 5px;
}

</style>