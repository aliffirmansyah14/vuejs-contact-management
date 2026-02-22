<script setup>
import { cn } from "../lib/utils";

const model = defineModel();
const { className } = defineProps({ className: String });
</script>
<template>
	<input
		v-model="model"
		:class="
			cn(
				'w-full text-white rounded-lg',
				'pl-10 pr-3 py-3',
				'border border-gray-600',
				'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
				'bg-gray-700 bg-opacity-50',
				'transition-all duration-200',
				className,
			)
		"
	/>
</template>
