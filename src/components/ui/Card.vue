<script setup>
import { cn } from "../../lib/utils";

const { className } = defineProps({ className: String });
</script>

<template>
	<div
		:class="
			cn(
				'bg-gray-800/80 ',
				'card-hover',
				'border border-gray-700',
				'rounded-xl ',
				'shadow-custom  overflow-hidden  ',
				className,
			)
		"
	>
		<slot />
	</div>
</template>
