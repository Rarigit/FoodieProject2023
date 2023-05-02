<template>
    <v-footer color="#00B0FF">
    <v-row justify="center" no-gutters>
        <v-btn
            v-for="link in links"
            :key="link"
            color="bisque"
            variant="white--text"
            class="mx-2"
            rounded="xl"
        >
            {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
    </v-row>
</v-footer>
</template>

<script>
    export default {
        name: "FooterProject",
        data: () => ({
            links: [
                'Home',
                'Contact Us'
            ],
        }),
    }

</script>

<style scoped>
    v-footer{
        position: fixed;
    }
</style>