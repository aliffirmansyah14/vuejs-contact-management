<script setup>
import { useLocalStorage } from "@vueuse/core";
import { onMounted, reactive, ref } from "vue";
import {
	userDetail,
	userUpdatePassword,
	userUpdateProfile,
} from "../../lib/UserApi";
import { alertError, alertSuccess } from "../../lib/alert";
import Spinner from "../ui/Spinner.vue";
import Label from "../ui/Label.vue";
import Input from "../ui/Input.vue";
import { useRouter } from "vue-router";
import Card from "../ui/Card.vue";

const router = useRouter();

const token = useLocalStorage("token");
const state = reactive({
	name: "",
	isLoading: true,
	errors: undefined,
});

const formPassword = reactive({
	password: "",
	confirmPassword: "",
});

const isSubmitting = ref(false);

async function fetchUser() {
	state.isLoading = true;
	try {
		// await new Promise(resolve => setTimeout(resolve, 1000));
		const response = await userDetail(token.value);
		const result = await response.json();
		if (response.status === 200) {
			state.name = result.data.name;
		} else {
			await alertError(result.errors, async () => {
				state.errors = result.errors;
				await router.push({
					path: "/login",
				});
			});
		}
	} catch (error) {
		await alertError("Terjadi kesalahan");
	} finally {
		state.isLoading = false;
	}
}
onMounted(async () => await fetchUser());

async function handleUpdateProfile() {
	if (!state.name.trim()) {
		await alertError("Name tidak boleh kosong");
		return;
	}

	isSubmitting.value = true;
	try {
		// await new Promise(resolve => setTimeout(resolve, 300));
		const response = await userUpdateProfile({ name: state.name }, token.value);
		const result = await response.json();

		console.log(result);
		if (response.status === 200) {
			await alertSuccess("Update name berhasil");
		} else {
			await alertError(result.errors);
		}
	} catch (error) {
		await alertError("Terjadi Kesalahan");
	} finally {
		isSubmitting.value = false;
	}
}

async function handleUpdatePassword() {
	if (!formPassword.password.trim() || !formPassword.confirmPassword.trim()) {
		await alertError("Password atau Confirm Password tidak boleh kosong");
		return;
	}
	if (formPassword.password.trim() !== formPassword.confirmPassword.trim()) {
		await alertError("Password atau Confirm Password tidak sama");
		return;
	}
	isSubmitting.value = true;
	try {
		// await new Promise(resolve => setTimeout(resolve, 300));
		const response = await userUpdatePassword(
			{ password: formPassword.password },
			token.value,
		);
		const result = await response.json();

		console.log(result);
		if (response.status === 200) {
			await alertSuccess("Update password berhasil");
		} else {
			await alertError(result.errors);
		}
	} catch (error) {
		await alertError("Terjadi Kesalahan");
	} finally {
		isSubmitting.value = false;
		resetFormPassword();
	}
}
function resetFormPassword() {
	formPassword.confirmPassword = "";
	formPassword.password = "";
}
</script>

<template>
	<Spinner v-if="state.isLoading" style-container="grow" />
	<template v-else-if="!state.isLoading && !state.errors">
		<div class="flex items-center mb-6">
			<i class="fas fa-user-cog text-blue-400 text-2xl mr-3"></i>
			<h1 class="text-2xl font-bold text-white">My Profile</h1>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- Form 1: Edit Name -->
			<Card>
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div
							class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
						>
							<i class="fas fa-user-edit text-white"></i>
						</div>
						<h2 class="text-xl font-semibold text-white">Edit Profile</h2>
					</div>
					<form v-on:submit.prevent="handleUpdateProfile">
						<div class="mb-5">
							<Label for="name">Full Name</Label>
							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
								>
									<i class="fas fa-user text-gray-500"></i>
								</div>
								<Input
									v-model="state.name"
									type="text"
									id="name"
									name="name"
									placeholder="Enter your full name"
									required
								/>
							</div>
						</div>

						<div class="mt-6">
							<button
								type="submit"
								:disabled="isSubmitting"
								class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center disabled:[background:var(--color-gray-500)]"
							>
								<i class="fas fa-save mr-2"></i> Update Profile
							</button>
						</div>
					</form>
				</div>
			</Card>

			<!-- Form 2: Edit Password -->
			<Card>
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div
							class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md"
						>
							<i class="fas fa-key text-white"></i>
						</div>
						<h2 class="text-xl font-semibold text-white">Change Password</h2>
					</div>
					<form v-on:submit.prevent="handleUpdatePassword">
						<div class="mb-5">
							<Label for="new_password">New Password</Label>
							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
								>
									<i class="fas fa-lock text-gray-500"></i>
								</div>
								<Input
									v-model="formPassword.password"
									type="password"
									id="new_password"
									name="new_password"
									placeholder="Enter your new password"
									required
								/>
							</div>
						</div>

						<div class="mb-5">
							<label
								for="confirm_password"
								class="block text-gray-300 text-sm font-medium mb-2"
								>Confirm New Password</label
							>
							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
								>
									<i class="fas fa-check-double text-gray-500"></i>
								</div>
								<Input
									v-model="formPassword.confirmPassword"
									type="password"
									id="confirm_password"
									placeholder="Confirm your new password"
									required
								/>
							</div>
						</div>

						<div class="mt-6">
							<button
								type="submit"
								class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center disabled:[background:var(--color-gray-500)]"
								:disabled="isSubmitting"
							>
								<i class="fas fa-key mr-2"></i> Update Password
							</button>
						</div>
					</form>
				</div>
			</Card>
		</div>
	</template>
</template>
