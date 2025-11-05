<template>
	<div class="section_tit">
		<h1 class="h_tit1">{{ title }}</h1>
		<p v-if="props.subTitle" class="h_tit1_sub">{{ subTitle }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	title: { type: String, default: '' },
	subTitle: { type: String, default: '' },
})
</script>

<style scoped>
.section_tit {
	margin-top: 2.4rem;
	padding: 0 var(--container_gap);
	text-align: center;
}
</style>
