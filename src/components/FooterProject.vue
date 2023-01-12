<template>
    <v-footer
        dark
        bottom
        fixed
        padless
        >
        <v-card
            class="flex"
            flat
            tile
            justify="center"
            no-gutters
            >

            <v-card-title class="teal">
                <strong class="subheading">Rari Design Inc.</strong>

                <v-spacer></v-spacer>

                <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4"
                dark
                icon
                >
                <v-icon size="24px">
                    {{ icon }}
                </v-icon>
                </v-btn>
            </v-card-title>
            
            <v-card-text class="py-2 white--text text-center">
                {{ new Date().getFullYear() }} — <strong>All Rights Reserved</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        name: "FooterProject",
        data: () => ({
            icons: [
                'mdi-twitter',
                'mdi-instagram',
                'mdi-facebook'
            ],
        }),
    }

</script>

<style scoped>
    v-footer{
        position: fixed;
    }
</style>