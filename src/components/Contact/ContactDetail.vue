<script setup>
import { useLocalStorage } from "@vueuse/core";
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { contactDetail } from "../../lib/api/ContactApi";
import ContactHeader from "./ContactHeader.vue";

const route = useRoute();
const { id } = route.params;
const token = useLocalStorage("token");

const contact = reactive({
	first_name: "",
	last_name: "",
	email: "",
	phone: "",
});
// solusi pertama
// const fullname = ref("");
// watch(contact, (value, _) => {
// 	fullname.value = `${value.first_name} ${value.last_name}`;
// });

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

onMounted(async () => await fetchContact());
</script>

<template>
	<ContactHeader>
		<i class="fas fa-address-book text-white text-2xl mr-3"></i>
		<div class="text-white font-bold text-xl">
			Contact Management
		</div></ContactHeader
	>
	<div
		class="bg-gray-800/80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in"
	>
		<div class="p-8">
			<!-- Contact Header -->
			<div class="mb-8 text-center">
				<div
					class="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg"
				>
					<i class="fas fa-user text-3xl text-white"></i>
				</div>
				<h2 class="text-2xl font-bold text-white mb-2">
					{{ fullname }}
				</h2>
				<div class="w-24 h-1 bg-gradient mx-auto rounded-full"></div>
			</div>

			<!-- Contact Information -->
			<div class="space-y-5 mb-8">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div
						class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
					>
						<div class="flex items-center mb-2">
							<i class="fas fa-user-tag text-blue-400 mr-2"></i>
							<h3 class="text-gray-300 text-sm font-medium">First Name</h3>
						</div>
						<p class="text-white text-lg ml-6">{{ contact.first_name }}</p>
					</div>
					<div
						class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
					>
						<div class="flex items-center mb-2">
							<i class="fas fa-user-tag text-blue-400 mr-2"></i>
							<h3 class="text-gray-300 text-sm font-medium">Last Name</h3>
						</div>
						<p class="text-white text-lg ml-6">{{ contact.last_name }}</p>
					</div>
				</div>

				<div
					class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
				>
					<div class="flex items-center mb-2">
						<i class="fas fa-envelope text-blue-400 mr-2"></i>
						<h3 class="text-gray-300 text-sm font-medium">Email</h3>
					</div>
					<p class="text-white text-lg ml-6">{{ contact.email }}</p>
				</div>

				<div
					class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70"
				>
					<div class="flex items-center mb-2">
						<i class="fas fa-phone text-blue-400 mr-2"></i>
						<h3 class="text-gray-300 text-sm font-medium">Phone</h3>
					</div>
					<p class="text-white text-lg ml-6">{{ contact.phone }}</p>
				</div>
			</div>

			<!-- Addresses Section -->
			<div class="mb-8">
				<div class="flex items-center mb-5">
					<i class="fas fa-map-marker-alt text-blue-400 mr-3"></i>
					<h3 class="text-xl font-semibold text-white">Addresses</h3>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
					<!-- Add Address Card -->
					<div
						class="bg-gray-700 bg-opacity-50 p-5 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover"
					>
						<a href="add_address.html" class="block h-full">
							<div
								class="flex flex-col items-center justify-center h-full text-center py-4"
							>
								<div
									class="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110"
								>
									<i class="fas fa-plus text-2xl text-white"></i>
								</div>
								<h4 class="text-lg font-semibold text-white">Add Address</h4>
							</div>
						</a>
					</div>

					<!-- Address Card 1 -->
					<div
						class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover"
					>
						<div class="flex items-center mb-3">
							<div
								class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
							>
								<i class="fas fa-home text-white"></i>
							</div>
							<h4 class="text-lg font-semibold text-white">Home Address</h4>
						</div>
						<div class="space-y-3 text-gray-300 ml-2 mb-4">
							<p class="flex items-center">
								<i class="fas fa-road text-gray-500 w-6"></i>
								<span class="font-medium w-24">Street:</span>
								<span>123 Main St</span>
							</p>
							<p class="flex items-center">
								<i class="fas fa-city text-gray-500 w-6"></i>
								<span class="font-medium w-24">City:</span>
								<span>New York</span>
							</p>
							<p class="flex items-center">
								<i class="fas fa-map text-gray-500 w-6"></i>
								<span class="font-medium w-24">Province:</span>
								<span>NY</span>
							</p>
							<p class="flex items-center">
								<i class="fas fa-flag text-gray-500 w-6"></i>
								<span class="font-medium w-24">Country:</span>
								<span>USA</span>
							</p>
							<p class="flex items-center">
								<i class="fas fa-mailbox text-gray-500 w-6"></i>
								<span class="font-medium w-24">Postal Code:</span>
								<span>10001</span>
							</p>
						</div>
						<div class="flex justify-end space-x-3">
							<a
								href="edit_address.html"
								class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
							>
								<i class="fas fa-edit mr-2"></i> Edit
							</a>
							<button
								class="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
							>
								<i class="fas fa-trash-alt mr-2"></i> Delete
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex justify-end space-x-4">
				<a
					href="dashboard.html"
					class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
				>
					<i class="fas fa-arrow-left mr-2"></i> Back
				</a>
				<a
					href="edit_contact.html"
					class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
				>
					<i class="fas fa-user-edit mr-2"></i> Edit Contact
				</a>
			</div>
		</div>
	</div>
</template>
