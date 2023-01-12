<template>
    <div>
        <v-container>
            <h2>Confirm your order</h2>
        </v-container>
    </div>
</template>

<script>
// This has to be imported into MenuPublic
import cookies from "vue-cookies";
import axios from "axios";
import router from '@/router';

    export default {
        name: "OrderCart",
        data() {
            return {
                items: []
            }
        },
        methods: {
            name() {
                
            }
        },
    }
</script>

<style scoped>

</style>