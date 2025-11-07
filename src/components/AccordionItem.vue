<template>
	<div class="accordion_item">
		<h3 class="accordion_header">
			<button :id="buttonId" class="accordion_button" :class="{ is_open: isPanelOpen }"
				:aria-expanded="isPanelOpen" :aria-controls="panelId" @click="toggle">
				<span class="accordion_title">{{ title }}</span>
			</button>
		</h3>

		<div :id="panelId" class="accordion_body" role="region" :aria-labelledby="buttonId"
			:style="{ maxHeight: isPanelOpen ? bodyHeight + 'px' : 0 }" ref="bodyRef">
			<div class="accordion_content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject, ref, computed, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
	title: { type: String, required: true }
})

const { registerItem, toggleItem, isOpen } = inject('accordion')

const index = ref(null)
index.value = registerItem({ title: props.title })

const isPanelOpen = computed(() => isOpen(index.value))
const toggle = () => toggleItem(index.value)

// 접근성 ID
const buttonId = `accordion_button_${index.value}`
const panelId = `accordion_body_${index.value}`

const bodyRef = ref(null)
const bodyHeight = ref(0)

watch(isPanelOpen, async (val) => {
	await nextTick()
	bodyHeight.value = val ? bodyRef.value.scrollHeight : 0
})

onMounted(() => {
	bodyHeight.value = isPanelOpen.value ? bodyRef.value.scrollHeight : 0
})
</script>

<style scoped>
.accordion {
	margin-top: var(--spacing_xs);
	border-top: 1px solid var(--border-color);
	border-bottom: 1px solid var(--light);
}

.accordion:first-child {
	margin-top: 0;
}

.accordion_item+.accordion_item {
	border-top: 1px solid var(--border-color);
}

.accordion_button {
	position: relative;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
	padding: 2.4rem 2.4rem 2.4rem 0;
	color: var(--black);
	font-size: 1.8rem;
}

.accordion_button::after {
	content: '';
	display: block;
	position: absolute;
	top: 50%;
	right: 0;
	width: 1.6rem;
	height: 1.6rem;
	margin-left: auto;
	background: url('@/assets/icons/caret_down_fill.svg') no-repeat center;
	transform: translateY(-50%);
	transition: transform 0.2s ease-in-out;
}

.accordion_body {
	overflow: hidden;
	transition: max-height 0.3s ease;
}

.accordion_content {
	padding: 1.6rem 0;
}

.accordion_button.is_open::after {
	transform: translateY(-50%) rotate(180deg);
}
</style>