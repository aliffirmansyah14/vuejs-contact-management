<script setup>
import { cn } from "../../lib/utils";

const { labelName, className } = defineProps({
	labelName: String,
	className: String,
});
</script>
<template>
	<label
		:class="cn('block', 'mb-2', 'text-gray-300 text-sm font-medium', className)"
		>{{ labelName }}</label
	>
</template>
