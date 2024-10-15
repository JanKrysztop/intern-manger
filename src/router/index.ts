import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "UserList",
    component: () => import("@/components/InternList.vue"),
    meta: { title: "Intern List" },
  },
  {
    path: "/add",
    name: "AddIntern",
    component: () => import("@/components/InternForm.vue"),
    meta: { title: "Add Intern" },
  },
  {
    path: "/edit/:id",
    name: "EditIntern",
    component: () => import("@/components/InternForm.vue"),
    meta: { title: "Edit Intern" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/components/NotFound.vue"),
    meta: { title: "Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
