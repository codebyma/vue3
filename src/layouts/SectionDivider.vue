<template>
	<div :class="wrapClass">
		<slot />
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	hrStroke: { type: String, default: '', validator: (val) => ['', 'sm', 'lg'].includes(val) },
	hrSpacing: { type: String, default: '', validator: (val) => ['', 'sm', 'lg', '0'].includes(val) },
	customClass: { type: String, default: '' },
})

const wrapClass = computed(() => {
	const classes = ['section_divider']

	if (props.hrStroke) classes.push(`hr_stroke_${props.hrStroke}`)
	if (props.hrSpacing) classes.push(`hr_spacing_${props.hrSpacing}`)
	if (props.customClass) classes.push(`${props.customClass}`)

	return classes
})
</script>

<style scoped>
.section_divider {
	margin: var(--spacing_md) calc( -1 * var(--container_gap) ) 0;
	border-top: 8px solid var(--gray300);
	padding: var(--spacing_md) var(--container_gap) 0;
}

.section_divider.hr_spacing_0 {
	margin-top: var(--spacing_0);
	padding-top: var(--spacing_0);
}

.section_divider.hr_spacing_sm {
	margin-top: var(--spacing_sm);
	padding-top: var(--spacing_sm);
}

.section_divider.hr_spacing_lg {
	margin-top: var(--spacing_lg);
	padding-top: var(--spacing_lg);
}

.section_divider.hr_stroke_sm {
	border-top-width: 1px;
}

.section_divider.hr_stroke_lg {
	border-top-width: 16px;
}
</style>