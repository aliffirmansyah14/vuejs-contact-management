import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";
import Layout from "./components/Layout.vue";
import UserRegister from "./components/User/UserRegister.vue";
import UserLogin from "./components/User/UserLogin.vue";
import DashboardLayout from "./components/DashboardLayout.vue";
import ContactList from "./components/Contact/ContactList.vue";
import UserProfile from "./components/User/UserProfile.vue";
import UserLogout from "./components/User/UserLogout.vue";

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
	{
		component: DashboardLayout,
		path: "/dashboard",
		children: [
			{
				path: "contacts",
				component: ContactList,
			},
			{
				path: "users/profile",
				component: UserProfile,
			},
			{
				path: "users/logout",
				component: UserLogout,
			},
		],
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

createApp(App).use(router).mount("#app");
