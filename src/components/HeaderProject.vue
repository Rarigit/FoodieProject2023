<template>
    <v-app-bar app flat class=" header px-18">
        <v-btn text class="black--text mr-3 title" router-link to="/">Foodze</v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn text class="black--text" router-link to="/loginRestaurant">Restaurant Login</v-btn>
        <v-btn text class="black--text" router-link to="/registerRestaurant">Register Restaurant</v-btn>
        <v-btn text class="black--text" router-link to="/registerClient">Client Register</v-btn>
    </v-app-bar>
</template>

<script>
    export default {//Got most of my UI styling implementation from the official Vuetify docs. Good resource.
        name: "HeaderProject"
    }
</script>

<style scoped>
.header{
    background-image: url(@/assets/foodze\ yellow.png);
}

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');
.title {
    font-family: 'Lato', sans-serif;
    font-size: xx-large;
}

</style>