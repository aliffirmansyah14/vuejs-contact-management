<script setup>
defineProps({
	street: String,
	city: String,
	province: String,
	country: String,
	postal_code: String,
	contactId: String,
	addressId: String,
	handleDelete: {
		type: Function,
		required: true,
	},
});
</script>

<template>
	<div
		class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover"
	>
		<div class="flex items-center mb-3">
			<div
				class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md"
			>
				<i class="fas fa-home text-white"></i>
			</div>
			<h4 class="text-lg font-semibold text-white">Address</h4>
		</div>
		<div class="space-y-3 text-gray-300 ml-2 mb-4">
			<p class="flex items-center">
				<i class="fas fa-road text-gray-500 w-6"></i>
				<span class="font-medium w-24">Street:</span>
				<span class="truncate">{{ street }}</span>
			</p>
			<p class="flex items-center">
				<i class="fas fa-city text-gray-500 w-6"></i>
				<span class="font-medium w-24">City:</span>
				<span>{{ city }}</span>
			</p>
			<p class="flex items-center">
				<i class="fas fa-map text-gray-500 w-6"></i>
				<span class="font-medium w-24">Province:</span>
				<span>{{ province }}</span>
			</p>
			<p class="flex items-center">
				<i class="fas fa-flag text-gray-500 w-6"></i>
				<span class="font-medium w-24">Country:</span>
				<span>{{ country }}</span>
			</p>
			<p class="flex items-center">
				<i class="fa-solid fa-envelopes-bulk text-gray-500 w-6"></i>
				<span class="font-medium w-24">Postal Code:</span>
				<span>{{ postal_code }}</span>
			</p>
		</div>
		<div class="flex justify-end space-x-3">
			<a
				:href="`/dashboard/contacts/${contactId}/addresses/${addressId}/edit`"
				class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
			>
				<i class="fas fa-edit mr-2"></i> Edit
			</a>
			<button
				@click="handleDelete"
				class="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
			>
				<i class="fas fa-trash-alt mr-2"></i> Delete
			</button>
		</div>
	</div>
</template>
