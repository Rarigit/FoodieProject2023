<template>
    <v-footer class="light-black-footer">
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
        <v-col class="px-4 py-2 blue text-center w-100" cols="12">
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
                // '2024 Vuetify'
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

    .light-black-footer {
        background-color: #141414;
    }
</style>