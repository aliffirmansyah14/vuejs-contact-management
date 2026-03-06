<script setup>
import { RouterLink } from "vue-router";
import Card from "../ui/Card.vue";
import Input from "../ui/Input.vue";
import Label from "../ui/Label.vue";
</script>

<template>
	<div class="flex items-center mb-6">
		<RouterLink
			to="/dashboard/contacts"
			class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
		>
			<i class="fas fa-arrow-left mr-2"></i> Back to Contacts
		</RouterLink>
		<h1 class="text-2xl font-bold text-white flex items-center">
			<i class="fas fa-user-plus text-blue-400 mr-3"></i> Create New Contact
		</h1>
	</div>

	<Card
		class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in"
	>
		<div class="p-8">
			<form>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
					<div>
						<Label for="first_name" label-name="Firstname" />
						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-user-tag text-gray-500"></i>
							</div>
							<Input
								type="text"
								id="first_name"
								name="first_name"
								class-name="bg-gray-700/50"
								placeholder="Enter first name"
								required
							/>
						</div>
					</div>
					<div>
						<Label for="last_name" label-name="Lastname" />
						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-user-tag text-gray-500"></i>
							</div>
							<Input
								type="text"
								id="last_name"
								name="last_name"
								class-name="bg-gray-700/50"
								placeholder="Enter last name"
								required
							/>
						</div>
					</div>
				</div>

				<div class="mb-5">
					<Label for="email" label-name="Email" />
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
						>
							<i class="fas fa-envelope text-gray-500"></i>
						</div>
						<Input
							type="email"
							id="email"
							name="email"
							class-name="bg-gray-700/50"
							placeholder="Enter email address"
							required
						/>
					</div>
				</div>

				<div class="mb-6">
					<Label for="phone" label-name="Phone" />
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
						>
							<i class="fas fa-phone text-gray-500"></i>
						</div>
						<Input
							type="tel"
							id="phone"
							name="phone"
							class-name="bg-gray-700/50"
							placeholder="Enter phone number"
							required
						/>
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
						<i class="fas fa-plus-circle mr-2"></i> Create Contact
					</button>
				</div>
			</form>
		</div>
	</Card>
</template>
