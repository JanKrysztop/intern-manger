import { createRouter, createWebHistory } from "vue-router";
import InternForm from "@/components/InternForm.vue";
import InternList from "@/components/InternList.vue";

const routes = [
  {
    path: "/",
    name: "UserList",
    component: InternList,
  },
  {
    path: "/add",
    name: "AddIntern",
    component: InternForm,
  },
  {
    path: "/edit/:id",
    name: "EditIntern",
    component: InternForm,
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;