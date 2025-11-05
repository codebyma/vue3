<template>
	<div :class="wrapClass">
		<slot />
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	hr: { type: Boolean, default: false },
	hrStroke: { type: String, default: '', validator: (val) => ['', 'sm', 'lg'].includes(val) },
	hrSpacing: { type: String, default: '', validator: (val) => ['', 'sm', 'lg', '0'].includes(val) },
	customClass: { type: String, default: '' },
})

const wrapClass = computed(() => {
	const classes = ['section']

	if (props.hr) classes.push('hr')
	if (props.hrStroke) classes.push(`hr_stroke_${props.hrStroke}`)
	if (props.hrSpacing) classes.push(`hr_spacing_${props.hrSpacing}`)
	if (props.customClass) classes.push(`${props.customClass}`)

	return classes
})
</script>

<style scoped>
.section {
	margin-top: var(--spacing_md);
	padding: 0 var(--container_gap);
}

.hr {
	border-top: 8px solid var(--gray300);
	padding-top: var(--spacing_md);
}

.hr.hr_spacing_0 {
	margin-top: var(--spacing_0);
	padding-top: var(--spacing_0);
}

.hr.hr_spacing_sm {
	margin-top: var(--spacing_sm);
	padding-top: var(--spacing_sm);
}

.hr.hr_spacing_lg {
	margin-top: var(--spacing_lg);
	padding-top: var(--spacing_lg);
}

.hr.hr_stroke_sm {
	border-top-width: 1px;
}

.hr.hr_stroke_lg {
	border-top-width: 16px;
}
</style>