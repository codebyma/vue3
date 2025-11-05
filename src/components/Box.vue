<template>
	<div :class="wrapClass">
		<slot />
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	padding: { type: String, default: '' },    // sm, md, lg
	shadow: { type: String, default: '' },     // sm, md, lg, xl
	background: { type: String, default: '' }, // white, gray100, gray300, primary 등
	radius: { type: String, default: '' },     // sm, md, lg, xl
	customClass: { type: String, default: '' },     // 커스텀
})

const wrapClass = computed(() => [
    'box',
    props.customClass,
    props.padding ? `box_padding_${props.padding}` : '',
	props.background ? `box_bg_${props.background}` : '',
	props.radius ? `box_radius_${props.radius}` : '',
    props.shadow ? `box_shadow_${props.shadow}` : '',
])
</script>

<style scoped>
.box {
	display: block;
	margin-top: 1.6rem;
	padding: 2.0rem;
	background-color: var(--white);
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: all 0.25s ease;
}

/* ===== Padding ===== */
.box_padding_sm {
	padding: 0.8rem;
}

.box_padding_lg {
	padding: 2.8rem;
}

.box_padding_xl {
	padding: 3.6rem;
}

/* ===== Shadow ===== */
.box_shadow_sm {
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.box_shadow_lg {
	box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
}

.box_shadow_xl {
	box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);
}

/* ===== Background ===== */
.box_bg_gray0 {
	background: var(--gray0);
}

.box_bg_gray100 {
	background: var(--gray100);
}

.box_bg_gray900 {
	background: var(--gray900);
	color: var(--gray0);
}

.box_bg_primary {
	background: var(--primary);
	color: var(--white);
}

/* ===== Border Radius ===== */
.box_radius_sm {
	border-radius: 4px;
}

.box_radius_lg {
	border-radius: 16px;
}

.box_radius_xl {
	border-radius: 24px;
}
</style>
