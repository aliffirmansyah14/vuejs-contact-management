<script setup>
import { useLocalStorage } from "@vueuse/core";
import { userLogout } from "../../lib/UserApi";
import { alertError } from "../../lib/alert";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";

const router = useRouter();
const token = useLocalStorage("token");

async function fetchUserLogout() {
	const response = await userLogout(token);
	const result = await response.json();

	console.log(result);
	if (response.status === 200) {
		await router.push({
			path: "/login",
		});
		token.value = "";
	} else {
		await alertError(result.errors);
	}
}

onBeforeMount(fetchUserLogout);
</script>

<template></template>
