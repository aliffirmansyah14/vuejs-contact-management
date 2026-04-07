<script setup>
import { useLocalStorage } from "@vueuse/core";
import { computed, onMounted, reactive, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { contactDetail } from "../../lib/api/ContactApi";
import Header from "../ui/Header.vue";
import { addresDelete, addressesList } from "../../lib/api/AddressApi";
import AddressCard from "./AddressCard.vue";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";

const route = useRoute();
const { id } = route.params;
const token = useLocalStorage("token");

const contact = reactive({
	first_name: "",
	last_name: "",
	email: "",
	phone: "",
});

const addresses = ref([]);
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
async function fetchAddresses() {
	const response = await addressesList(token.value, id);
	const result = await response.json();

	console.log(result);
	if (response.status === 200) {
		addresses.value = result.data;
	} else {
		await alertError(result.errors);
	}
}

onMounted(async () => {
	await fetchContact();
	await fetchAddresses();
});

async function handleDeleteAddress(addressId) {
	if (!(await alertConfirm("Sudah yakin ingin menghapus address ini?"))) {
		return;
	}
	const response = await addresDelete(token.value, id, addressId);
	const result = await response.json();

	if (response.status === 200) {
		await alertSuccess("Sucessfuly menghapus data");
		await fetchAddresses();
	} else {
		await alertError(result.errors);
	}
}
</script>

<template>
	<Header>
		<i class="fas fa-address-book text-white text-2xl mr-3"></i>
		<div class="text-white font-bold text-xl">Contact Management</div></Header
	>
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
						<RouterLink
							:to="`/dashboard/contacts/${id}/addresses/create`"
							class="block h-full"
						>
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
						</RouterLink>
					</div>
					<!-- Address Card 1 -->
					<AddressCard
						v-if="addresses.length > 0"
						v-for="address in addresses"
						:key="address.id"
						:contact-id="id"
						:address-id="address.id"
						:city="address.city"
						:country="address.country"
						:postal_code="address.postal_code"
						:province="address.province"
						:street="address.street"
						:handle-delete="() => handleDeleteAddress(address.id)"
					/>
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
