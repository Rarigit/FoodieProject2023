<template>
    <v-app-bar app flat class=" header px-12">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn text class="black--text" router-link to="/">Home</v-btn>
        <v-btn text class="black--text" router-link to="/registerRestaurant">Register Restaurant</v-btn>
        <v-btn text class="black--text" router-link to="/registerClient">Client Register</v-btn>
    </v-app-bar>
</template>

<script>
    export default {//Got most of my UI styling implementation from the official Vuetify docs. Good resource.
        name: "HeaderPage"
    }
</script>

<style scoped>
.header{
    background-image: url(@/assets/foodze\ yellow.png);
}
</style>