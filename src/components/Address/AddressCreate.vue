<script setup>
import { useRoute } from "vue-router";
import Header from "../ui/Header.vue";
import { useLocalStorage } from "@vueuse/core";
import { computed, onMounted, reactive } from "vue";
import { contactDetail } from "../../lib/api/ContactApi";
import Input from "../ui/Input.vue";
import Label from "../ui/Label.vue";

const route = useRoute();
const { id } = route.params;
const token = useLocalStorage("token");

const contact = reactive({
	first_name: "",
	last_name: "",
	email: "",
	phone: "",
});

const address = reactive({
	street: "",
	city: "",
	province: "",
	country: "",
	postal_code: "",
});

const fullname = computed(() => `${contact.first_name} ${contact.last_name}`);

async function fetchContact() {
	const response = await contactDetail(id, token.value);
	const result = await response.json();

	if (response.status === 200) {
		contact.email = result.data.email;
		contact.first_name = result.data.first_name;
		contact.last_name = result.data.last_name;
		contact.phone = result.data.phone;
	} else {
		await alertError(result.errors);
	}
}

async function handleSubmit() {
	console.log(address);
}

onMounted(async () => await fetchContact());
</script>

<template>
	<Header :path-to-back="`/dashboard/contacts/${id}/detail`">
		<i class="fas fa-address-book text-white text-2xl mr-3"></i>
		<div class="text-white font-bold text-xl">Contact Management</div>
	</Header>
	<div
		class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in"
	>
		<div class="p-8">
			<!-- Contact Information -->
			<div class="mb-6 pb-6 border-b border-gray-700">
				<div class="flex items-center">
					<div
						class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md"
					>
						<i class="fas fa-user text-white"></i>
					</div>
					<div>
						<h2 class="text-xl font-semibold text-white">{{ fullname }}</h2>
						<p class="text-gray-300 text-sm">
							{{ contact.email }} • {{ contact.phone }}
						</p>
					</div>
				</div>
			</div>

			<form v-on:submit.prevent="handleSubmit">
				<div class="mb-5">
					<Label for="street" label-name="Street" />
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
						>
							<i class="fas fa-road text-gray-500"></i>
						</div>
						<Input
							v-model="address.street"
							type="text"
							id="street"
							name="street"
							placeholder="Enter street address"
							required
						/>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
					<div>
						<Label for="city" label-name="City" />
						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-city text-gray-500"></i>
							</div>
							<Input
								v-model="address.city"
								type="text"
								id="city"
								name="city"
								placeholder="Enter city"
								required
							/>
						</div>
					</div>
					<div>
						<Label for="province" label-name="Province/State" />
						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-map text-gray-500"></i>
							</div>
							<Input
								v-model="address.province"
								type="text"
								id="province"
								name="province"
								placeholder="Enter province or state"
								required
							/>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
					<div>
						<Label for="country" label-name="Country" />
						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-flag text-gray-500"></i>
							</div>
							<Input
								v-model="address.country"
								type="text"
								id="country"
								name="country"
								placeholder="Enter country"
								required
							/>
						</div>
					</div>
					<div>
						<Label for="postal_code" label-name="Postal Code" />
						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-mail-bulk text-gray-500"></i>
							</div>
							<Input
								v-model="address.postal_code"
								type="text"
								id="postal_code"
								name="postal_code"
								placeholder="Enter postal code"
								required
							/>
						</div>
					</div>
				</div>

				<div class="flex justify-end space-x-4">
					<RouterLink
						to="/dashboard/contacts"
						class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
					>
						<i class="fas fa-times mr-2"></i> Cancel
					</RouterLink>
					<button
						type="submit"
						class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
					>
						<i class="fas fa-save mr-2"></i> Save Changes
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
