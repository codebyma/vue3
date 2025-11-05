<template>
	<!-- <div class="box" :class="[
		shadowClass,
		paddingClass,
		backgroundClass,
		radiusClass
	]"> -->
	<div :class="wrapClass">
		<slot />
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	padding: { type: String, default: '' },   // sm, md, lg
	shadow: { type: String, default: '' },  // none, sm, md, lg, xl
	background: { type: String, default: '' }, // white, gray, dark, primary 등
	radius: { type: String, default: '' },     // sm, md, lg, xl
	customClass: { type: String, default: '' },
})

const wrapClass = computed(() => [
    'box',
    props.shadow ? `box_shadow_${props.shadow}` : '',
    props.padding ? `box_padding_${props.padding}` : '',
	props.background ? `box_bg_${props.background}` : '',
	props.radius ? `box_radius_${props.radius}` : '',
    props.customClass,
])

const shadowClass = computed(() => props.shadow ? `box_shadow_${props.shadow}` : '',)
const paddingClass = computed(() => props.padding ? `box_padding_${props.padding}` : '',)
const backgroundClass = computed(() => props.background ? `box_bg_${props.background}` : '',)
const radiusClass = computed(() => props.radius ? `box_radius_${props.radius}` : '',)
</script>

<style scoped>
.box {
	display: block;
	padding: 0.8rem;
	border-radius: 4px;
	transition: all 0.25s ease;
}

/* ===== Padding ===== */
.box_padding_sm {
	padding: 0.4rem;
}

.box_padding_md {
	padding: 1.2rem;
}

.box_padding_lg {
	padding: 2.0rem;
}

/* ===== Shadow ===== */
.box_shadow_sm {
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.box_shadow_md {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
	border-radius: 2px;
}

.box_radius_md {
	border-radius: 8px;
}

.box_radius_lg {
	border-radius: 16px;
}

.box_radius_xl {
	border-radius: 24px;
}
</style>
