<script setup>
import { useLocalStorage } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { userDetail } from "../../lib/UserApi";
import { alertError } from "../../lib/alert";
import Spinner from "../ui/Spinner.vue";
import Label from "../ui/Label.vue";
import Input from "../ui/Input.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const token = useLocalStorage("token");
const name = ref("");
const loading = ref(true);

async function fetchUser() {
	loading.value = true;
	try {
		await new Promise(resolve => setTimeout(resolve, 10000));
		const response = await userDetail(token.value);
		const result = await response.json();
		if (response.status === 200) {
			name.value = result.data.name;
		} else {
			await alertError(
				result.errors,
				async () =>
					await router.push({
						path: "/login",
					}),
			);
		}
	} catch (error) {
		await alertError("Terjadi kesalahan");
	} finally {
		loading.value = false;
	}
}
onMounted(async () => await fetchUser());
</script>

<template>
	<Spinner v-if="loading" class-name="grow" />
	<template v-else-if="!loading && name">
		<div class="flex items-center mb-6">
			<i class="fas fa-user-cog text-blue-400 text-2xl mr-3"></i>
			<h1 class="text-2xl font-bold text-white">My Profile</h1>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- Form 1: Edit Name -->
			<div
				class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
			>
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div
							class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
						>
							<i class="fas fa-user-edit text-white"></i>
						</div>
						<h2 class="text-xl font-semibold text-white">Edit Profile</h2>
					</div>
					<form>
						<div class="mb-5">
							<Label for="name">Full Name</Label>
							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
								>
									<i class="fas fa-user text-gray-500"></i>
								</div>
								<Input
									v-model="name"
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
								class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
							>
								<i class="fas fa-save mr-2"></i> Update Profile
							</button>
						</div>
					</form>
				</div>
			</div>

			<!-- Form 2: Edit Password -->
			<div
				class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
			>
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div
							class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md"
						>
							<i class="fas fa-key text-white"></i>
						</div>
						<h2 class="text-xl font-semibold text-white">Change Password</h2>
					</div>
					<form>
						<div class="mb-5">
							<Label for="new_password">New Password</Label>
							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
								>
									<i class="fas fa-lock text-gray-500"></i>
								</div>
								<Input
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
								class="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
							>
								<i class="fas fa-key mr-2"></i> Update Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</template>
</template>
