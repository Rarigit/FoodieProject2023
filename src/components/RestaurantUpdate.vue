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
                                                    <h2 class="profileHead">Edit Restaurant Profile</h2>
                                                    <br>
                                                    <v-text-field
                                                    v-model="name"
                                                    label="Store name"
                                                    prepend-icon="mdi-account-circle"
                                                    />
                                                    <v-text-field
                                                    v-model="address"
                                                    label="Address"
                                                    prepend-icon="mdi-map-marker"
                                                    />
                                                    <v-text-field
                                                    v-model="bio"
                                                    label="Bio"
                                                    prepend-icon="mdi-bio"
                                                    />
                                                    <v-text-field
                                                    v-model="city"
                                                    label="City"
                                                    prepend-icon="mdi-city"
                                                    />
                                                    <v-text-field
                                                    v-model="email"
                                                    label="email (EMAIL CANNOT BE CHANGED!)"
                                                    prepend-icon="mdi-email"
                                                    />
                                                    <v-text-field
                                                    v-model="password"
                                                    label="password"
                                                    prepend-icon="mdi-lock"
                                                    />
                                                    <v-text-field
                                                    v-model="phoneNum"
                                                    label="phone (XXX-XXX-XXXX)"
                                                    prepend-icon="mdi-phone"
                                                    />
                                                    <br>
                                                    <v-row class="mx-auto">
                                                    <v-btn class="mx-auto styleButton blue" @click="updateRestaurant">Save Changes</v-btn>
                                                    </v-row>
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
                                                    Delete your Restaurant?
                                                </h3>
                                            </v-card-text>
                                            <br>
                                            <div class="text-center">
                                                <RestaurantDelete/>
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
import RestaurantDelete from "@/components/RestaurantDelete.vue";

    export default {
        name: "RestaurantUpdate",
        components: {
            RestaurantDelete,
        },
        data() {
            return {
                // apiKey: process.env.VUE_APP_API_KEY,
                url: process.env.VUE_APP_API_URL,
                name: "",
                address: "",
                bio: "",
                city: "",
                email: "",
                password: "",
                phoneNum: "",
            }
        },
        methods: {
            updateRestaurant() {
                axios.request({
                    method : "PATCH",
                    url: this.url + "/restaurant",
                    headers: {
                        'token' : cookies.get('restaurantToken'),
                        // 'x-api-key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        name: this.name,
                        address: this.address,
                        bio: this.bio,
                        city: this.city,
                        email: this.email,
                        password: this.password,
                        phoneNum: this.phoneNum,
                    }
                    }).then((response)=>{
                    console.log(response);
                    this.alertMessage = 'Restaurant Update confirmed!';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
                    window.location.reload();
                    // alert('Restaurant info. updated!!')
                    // cookies.remove(`restaurantToken`)
                    // cookies.remove(`restaurantID`)
                    // router.push(`/loginRestaurant`)
                    }).catch((error)=>{
                    console.log(error);
                    this.alertMessage = 'Failed to update restaurant. Try again.';
                    this.showAlert = true;
                    //Dismiss the alert after 3 seconds
                    setTimeout(()=> {
                        this.showAlert = false;
                    }, 3000);
                    })
            },
        },
    }
</script>

<style scoped>
.styleButton{
        color: black;
        height: 7vh;
        box-shadow: 2px 2px 3px;
    }
.profileHead{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bold;
    color: #072e35;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

</style>