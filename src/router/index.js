import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
let loadView = (path, view) => {
  let viewRaw = view? () => import(`@/views/${path}/${view}.vue`) : () => import(`@/views/${path}.vue`);
  return viewRaw;
};
const routes = [
  {
    path: "/",
    name: "Welcome",
    component: loadView('Welcome'),
  },
  {
    path: "/home",
    name: "Home",
    component: loadView('Home'),
  },
  {
    path: "/about",
    name: "About",
    component: loadView('About'),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
