import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginClientHome from "@/views/LoginClientHome.vue"
import LoginRestaurant from "@/components/LoginRestaurant.vue"
import RegistrationRestaurant from "@/components/RegistrationRestaurant.vue"
import RegisterClient from "@/components/RegisterClient.vue"
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
import OrderRegister from "@/components/OrderRegister.vue"
import HeaderProject from "@/components/HeaderProject.vue"
import FooterProject from "@/components/FooterProject.vue"
import OrderAlpha from "@/views/OrderAlpha.vue"
import OrderPatch from "@/components/OrderPatch.vue"
import RestaurantOrderAlpha from "@/views/RestaurantOrderAlpha.vue"
import RestaurantOrderPatch from "@/components/RestaurantOrderPatch.vue"



Vue.use(VueRouter)

const routes = [
  {
    path: `/registerClient`,
    component: RegisterClient
  },
  {
    path: `/loginRestaurant`,
    component: LoginRestaurant
  },
  {
    path: "/",
    component: LoginClientHome//This is the new home path
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
  {
    path: "/orderRegister",
    component: OrderRegister,
  },
  {
    path: "/header",
    component: HeaderProject,
  },
  {
    path: "/footer",
    component: FooterProject,
  },
  {
    path: "/orderAlpha",
    component: OrderAlpha,
  },
  {
    path: "/orderPatch",
    component: OrderPatch,
  },
  {
    path: "/restOrderAlpha",
    component: RestaurantOrderAlpha,
  },
  {
    path: "/restOrderPatch",
    component: RestaurantOrderPatch,
  },
]

const router = new VueRouter({
  routes
  
});

export default router
