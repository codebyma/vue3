<template>
	<div :class="wrapClass">
		<slot></slot>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    vertical: { type: Boolean, default: false },
    spacing: { type: String, default: '' }, // 'sm' | 'md' | 'lg'
    gap: { type: String, default: '' },
    customClass: { type: String, default: '' },
})

const wrapClass = computed(() => [
    'btn_wrap',
    props.vertical ? 'vertical' : '',
    // `btn_wrap--spacing-${props.spacing}`,
	props.spacing ? `spacing_${props.spacing}` : '', // spacing 값이 있을 때만 클래스 추가
	props.gap ? `gap_${props.gap}` : '', // spacing 값이 있을 때만 클래스 추가
    props.customClass,
])
</script>

<style scoped>
.btn_wrap {
	display: flex;
	flex-wrap: wrap;
	gap: 0.8rem;
	margin-top: var(--spacing_md);
}

.btn_wrap.vertical {
	flex-direction: column;
	align-items: flex-start;
}

.btn_wrap.spacing_lg {
	gap: 1.2rem
}



</style>
