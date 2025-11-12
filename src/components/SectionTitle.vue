<template>
	<div class="page_header">
		<h1 class="page_tit">{{ title }}</h1>
		<p v-if="props.subTitle" class="page_subtit">{{ subTitle }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	title: { type: String, default: '' },
	subTitle: { type: String, default: '' },
})
</script>

<style scoped>
.page_header {
	margin-top: 2.4rem;
	padding: 0 var(--container_gap);
	text-align: center;
}

.page_tit {
	font-size: 3.2rem;
	font-weight: 700;
	color: var(--black);
}

.page_subtit {
	color: var(--gray700);
}
</style>
