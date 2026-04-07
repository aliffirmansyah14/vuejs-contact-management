<script setup>
import { onBeforeMount, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { userLogin } from "../../lib/api/UserApi";
import { alertError } from "../../lib/alert";
import { useLocalStorage } from "@vueuse/core";
import Input from "../ui/Input.vue";
import Label from "../ui/Label.vue";

const router = useRouter();
const token = useLocalStorage("token", "");

const user = reactive({
	username: "",
	password: "",
});

async function fetchUser() {
	try {
		const response = await userDetail(token.value);
		const result = await response.json();
		if (response.status === 200) {
			await router.push({
				path: "/dashboard/contacs",
			});
		}
	} catch (error) {
		console.log("error di user login : " + error);
	}
}
async function handleSubmit() {
	const response = await userLogin(user);
	const result = await response.json();

	if (response.status === 200) {
		token.value = result.data.token;
		await router.push({
			path: "/dashboard/contacts",
		});
	} else {
		await alertError(result.errors);
	}
}

onBeforeMount(async () => fetchUser());
</script>
<template>
	<div
		class="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md"
	>
		<div class="text-center mb-8">
			<div class="inline-block p-3 bg-gradient rounded-full mb-4">
				<i class="fas fa-user-plus text-3xl text-white"></i>
			</div>
			<h1 class="text-3xl font-bold text-white">Contact Management</h1>
			<p class="text-gray-300 mt-2">Login to Contact Management</p>
		</div>

		<form v-on:submit.prevent="handleSubmit">
			<div class="mb-4">
				<Label label-name="username" for="username" />
				<div class="relative">
					<div
						class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
					>
						<i class="fas fa-user text-gray-500"></i>
					</div>
					<Input
						v-model="user.username"
						type="text"
						id="username"
						name="username"
						placeholder="choose ur username"
					/>
				</div>
			</div>

			<div class="mb-4">
				<Label label-name="password" for="password" />
				<div class="relative">
					<div
						class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
					>
						<i class="fas fa-lock text-gray-500"></i>
					</div>
					<Input
						v-model="user.password"
						id="password"
						name="password"
						type="password"
						placeholder="Type ur password"
						required
					/>
				</div>
			</div>

			<div class="mb-6">
				<button
					type="submit"
					class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
				>
					<i class="fas fa-user-plus mr-2"></i> Login
				</button>
			</div>

			<div class="text-center text-sm text-gray-400">
				Dont Already have an account?
				<RouterLink
					to="/register"
					class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
					>Sign ups</RouterLink
				>
			</div>
		</form>
	</div>
</template>
