<script setup>
import { useLocalStorage } from "@vueuse/core";
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { contactList } from "../../lib/api/ContactApi";
import { alertError } from "../../lib/alert";
import Card from "../ui/Card.vue";
import Label from "../ui/Label.vue";
import Input from "../ui/Input.vue";

const router = useRouter();
const token = useLocalStorage("token");
const search = reactive({
	name: "",
	email: "",
	phone: "",
});

const page = ref(1);
const totalPage = ref(1);
const contacts = ref([]);

// solusi pagination dengan watch reactive totapage
// const pages = ref([]);

// watch(totalPage,(value)=>{
//    let data =[];
// 	for(let i=1; i<=value; i++){
// 		data.push(i);
// 	}
// 	pages.value = data;
// })

const pages = computed(() => {
	let data = [];
	for (let i = 1; i <= totalPage.value; i++) {
		data.push(i);
	}
	return data;
});

async function handlePageChange(value) {
	page.value = value;
	await fetchContacs();
}

async function fetchContacs() {
	const response = await contactList(
		{
			...search,
			page: search.email || search.name || search.phone ? 1 : page.value,
		},
		token.value,
	);
	const result = await response.json();

	console.log(result);
	if (response.status === 200) {
		contacts.value = result.data;
		page.value = result.paging.page;
		totalPage.value = result.paging.total_page;
	} else {
		await alertError(result.errors, async () => {
			if (response.status === 403) {
				await router.push({
					path: "/login",
				});
			}
		});
	}
}

onBeforeMount(fetchContacs);

onMounted(() => {
	const toggleButton = document.getElementById("toggleSearchForm");
	const searchFormContent = document.getElementById("searchFormContent");
	const toggleIcon = document.getElementById("toggleSearchIcon");

	// Add transition for smooth animation
	searchFormContent.style.transition =
		"max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
	searchFormContent.style.overflow = "hidden";
	searchFormContent.style.maxHeight = "0px";
	searchFormContent.style.opacity = "0";
	searchFormContent.style.marginTop = "0";

	toggleButton.addEventListener("click", function () {
		if (searchFormContent.style.maxHeight !== "0px") {
			// Hide the form
			searchFormContent.style.maxHeight = "0px";
			searchFormContent.style.opacity = "0";
			searchFormContent.style.marginTop = "0";
			toggleIcon.classList.remove("fa-chevron-up");
			toggleIcon.classList.add("fa-chevron-down");
		} else {
			// Show the form
			searchFormContent.style.maxHeight = searchFormContent.scrollHeight + "px";
			searchFormContent.style.opacity = "1";
			searchFormContent.style.marginTop = "1rem";
			toggleIcon.classList.remove("fa-chevron-down");
			toggleIcon.classList.add("fa-chevron-up");
		}
	});
});
</script>

<template>
	<div class="flex items-center mb-6">
		<i class="fas fa-users text-blue-400 text-2xl mr-3"></i>
		<h1 class="text-2xl font-bold text-white">My Contacts</h1>
	</div>

	<!-- Search form -->
	<Card class-name="bg-gray-800/80 p-6 mb-8">
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center">
				<i class="fas fa-search text-blue-400 mr-3"></i>
				<h2 class="text-xl font-semibold text-white">Search Contacts</h2>
			</div>
			<button
				type="button"
				id="toggleSearchForm"
				class="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200"
			>
				<i class="fas fa-chevron-down text-lg" id="toggleSearchIcon"></i>
			</button>
		</div>
		<div id="searchFormContent" class="mt-4">
			<form v-on:submit.prevent="fetchContacs">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					<div>
						<Label for="search_name" label-name="Name" />

						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-user text-gray-500"></i>
							</div>
							<Input
								v-model="search.name"
								type="text"
								id="search_name"
								name="name"
								placeholder="Search by name"
							/>
						</div>
					</div>
					<div>
						<Label for="search_name" label-name="Email" />

						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-envelope text-gray-500"></i>
							</div>
							<Input
								v-model="search.email"
								type="text"
								id="search_email"
								name="search_email"
								placeholder="Search by email"
							/>
						</div>
					</div>
					<div>
						<Label for="search_phone" label-name="Phone" />

						<div class="relative">
							<div
								class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
							>
								<i class="fas fa-phone text-gray-500"></i>
							</div>
							<Input
								v-model="search.phone"
								type="text"
								id="search_phone"
								name="search_phone"
								placeholder="Search by phone"
							/>
						</div>
					</div>
				</div>
				<div class="mt-5 text-right">
					<button
						type="submit"
						class="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
					>
						<i class="fas fa-search mr-2"></i> Search
					</button>
				</div>
			</form>
		</div>
	</Card>

	<!-- Contact cards grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<!-- Create New Contact Card -->
		<Card class-name="bg-gray-800/80">
			<RouterLink to="/dashboard/contacts/create" class="block p-6 h-full">
				<div
					class="flex flex-col items-center justify-center h-full text-center"
				>
					<div
						class="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110"
					>
						<i class="fas fa-user-plus text-3xl text-white"></i>
					</div>
					<h2 class="text-xl font-semibold text-white mb-3">
						Create New Contact
					</h2>
					<p class="text-gray-300">Add a new contact to your list</p>
				</div>
			</RouterLink>
		</Card>

		<!-- Contact Card 1 -->
		<Card
			v-for="contact in contacts"
			:key="contact.id"
			class-name="bg-gray-800/80"
		>
			<div class="p-6">
				<RouterLink
					:to="`/dashboard/contacts/${contact.id}/detail`"
					class="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
				>
					<div class="flex items-center mb-3">
						<div
							class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-3 shadow-md"
						>
							<i class="fas fa-user text-white"></i>
						</div>
						<h2
							class="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200"
						>
							{{ contact.first_name + " " + contact.last_name }}
						</h2>
					</div>
					<div class="space-y-3 text-gray-300 ml-2">
						<p class="flex items-center">
							<i class="fas fa-user-tag text-gray-500 w-6"></i>
							<span class="font-medium w-24">First Name:</span>
							<span>{{ contact.first_name }}</span>
						</p>
						<p class="flex items-center">
							<i class="fas fa-user-tag text-gray-500 w-6"></i>
							<span class="font-medium w-24">Last Name:</span>
							<span>{{ contact.last_name }}</span>
						</p>
						<p class="flex items-center">
							<i class="fas fa-envelope text-gray-500 w-6"></i>
							<span class="font-medium w-24">Email:</span>
							<span class="truncate">{{ contact.email }}</span>
						</p>
						<p class="flex items-center">
							<i class="fas fa-phone text-gray-500 w-6"></i>
							<span class="font-medium w-24">Phone:</span>
							<span>{{ contact.phone }}</span>
						</p>
					</div>
				</RouterLink>
				<div class="mt-4 flex justify-end space-x-3">
					<RouterLink
						:to="`/dashboard/contacts/${contact.id}/edit`"
						class="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
					>
						<i class="fas fa-edit mr-2"></i> Edit
					</RouterLink>
					<button
						class="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
					>
						<i class="fas fa-trash-alt mr-2"></i> Delete
					</button>
				</div>
			</div>
		</Card>
	</div>

	<!-- Pagination -->
	<div class="mt-10 flex justify-center">
		<nav
			v-if="totalPage > 0"
			class="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in"
		>
			<a
				v-if="page > 1"
				v-on:click="() => handlePageChange(page - 1)"
				href="#"
				class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
			>
				<i class="fas fa-chevron-left mr-2"></i> Previous
			</a>
			<a
				v-for="value in pages"
				:key="value"
				href="#"
				v-on:click="() => handlePageChange(value)"
				:class="[
					'px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md',
					value === page
						? 'bg-gradient text-white rounded-lg hover:opacity-90'
						: 'bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 ',
				]"
			>
				{{ value }}
			</a>

			<a
				v-if="page < totalPage"
				v-on:click="() => handlePageChange(page + 1)"
				href="#"
				class="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
			>
				Next <i class="fas fa-chevron-right ml-2"></i>
			</a>
		</nav>
	</div>
</template>
