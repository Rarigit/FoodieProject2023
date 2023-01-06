import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginClient from "@/views/LoginClient.vue"
import LoginRestaurant from "@/views/LoginRestaurant.vue"
import RegistrationRestaurant from "@/components/RegistrationRestaurant.vue"
import HomePage from "@/components/HomePage.vue"
import RestaurantProfile from "@/views/RestaurantProfile.vue"
import ClientProfile from "@/views/ClientProfile.vue"
import ClientUpdate from "@/components/ClientUpdate.vue"
import ClientDelete from "@/components/ClientDelete.vue"
import RestaurantUpdate from "@/components/RestaurantUpdate.vue"
import RestaurantDelete from "@/components/RestaurantDelete.vue"
import RestaurantPublic from "@/views/RestaurantPublic.vue"
import RestaurantMenu from "@/components/RestaurantMenu.vue"
import MenuProfile from "@/views/MenuProfile.vue"
import MenuUpdate from "@/components/MenuUpdate.vue"
import MenuDelete from "@/components/MenuDelete.vue"
import MenuPublic from "@/components/MenuPublic.vue"



Vue.use(VueRouter)

const routes = [
  {
    path: `/`,
    component: HomePage
  },
  {
    path: `/loginRestaurant`,
    component: LoginRestaurant
  },
  {
    path: "/loginClient",
    component: LoginClient
  },
  {
    path: "/registerRestaurant",
    component: RegistrationRestaurant
  },
  {
    path: "/restProfile",
    component: RestaurantProfile
  },
  {
    path: "/clientProfile",
    component: ClientProfile
  },
  {
    path: "/clientUpdate",
    component: ClientUpdate
  },
  {
    path: "/clientDelete",
    component: ClientDelete
  },
  {
    path: "/restUpdate",
    component: RestaurantUpdate
  },
  {
    path: "/restDelete",
    component: RestaurantDelete
  },
  {
    path: "/restPublic",
    component: RestaurantPublic
  },
  {
    path: "/restMenu",
    component: RestaurantMenu
  },
  {
    path: "/menuProfile",
    component: MenuProfile
  },
  {
    path: "/menuUpdate",
    component: MenuUpdate
  },
  {
    path: "/menuDelete",
    component: MenuDelete
  },
  {
    path: "/menuPublic/:menuId",
    component: MenuPublic,
  },
  // {
  //   path: "/menu/:menuId",
  //   component: Menu
  // }
]
// const Menu = {template: '<h3>Menu {{route.params.menuId}} </h3>'}
const router = new VueRouter({
  routes
  
});

export default router
