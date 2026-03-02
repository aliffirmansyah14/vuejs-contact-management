import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";
import Layout from "./components/Layout.vue";
import UserRegister from "./components/User/UserRegister.vue";
import UserLogin from "./components/User/UserLogin.vue";

const routes = [
	{
		component: Layout,
		children: [
			{
				path: "/register",
				component: UserRegister,
			},
			{
				path: "/login",
				component: UserLogin,
			},
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

createApp(App).use(router).mount("#app");
