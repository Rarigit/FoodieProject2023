<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Foodie Logo"
          class="shrink mr-2"
          contain
          src="https://imgs.search.brave.com/5Ef-gPTV0QNmUPallKcAGH_Hei2EQtHPlhR1ehPbn6E/rs:fit:1487:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC44/am9sYlhjUzJhQ0Mx/LTlBYkhQZlZnSGFD/WCZwaWQ9QXBp"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://imgs.search.brave.com/5Ef-gPTV0QNmUPallKcAGH_Hei2EQtHPlhR1ehPbn6E/rs:fit:1487:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC44/am9sYlhjUzJhQ0Mx/LTlBYkhQZlZnSGFD/WCZwaWQ9QXBp"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main> -->
      <router-view/>
    <!-- </v-main> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
