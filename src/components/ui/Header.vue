<script setup>
import { RouterLink } from "vue-router";

const { pathToBack } = defineProps({
	pathToBack: String,
});
</script>

<template>
	<div class="flex items-center md:justify-center mb-6 relative">
		<RouterLink
			:to="pathToBack ?? '/dashboard/contacts'"
			class="md:absolute left-0 text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
		>
			<i class="fas fa-arrow-left mr-2"></i> Back to Contacts
		</RouterLink>
		<h1 class="text-2xl font-bold text-white flex items-center">
			<slot>
				<i class="fas fa-user-plus text-blue-400 mr-3"></i> Header Title
			</slot>
		</h1>
	</div>
</template>
