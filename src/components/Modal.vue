<template>
	<div v-if="modelValue" class="modal" :aria-labelledby="ariaLabelledby" ref="modalEl">
		<div class="modal_dialog">
			<div class="modal_top">
				<h2 :id="ariaLabelledby">{{ title }}</h2>
				<button class="btn_modal_close" @click="close">X</button>
			</div>
			<div class="modal_body">
				<slot></slot>
			</div>
			<div class="modal_bottom">
				<div class="btn_wrap j-c-end">
					<button type="button" class="btn primary small" @click="close">팝업 닫기</button>
				</div>
			</div>
		</div>
		<div class="modal-overlay" @click="handleOverlayClick"></div>
	</div>
</template>

<script setup>
import { defineProps, defineEmits, ref, nextTick, defineExpose, onBeforeUnmount } from 'vue';
import { UI } from '@/utils/ui/ui.js';

const props = defineProps({
	modelValue: Boolean,
	ariaLabelledby: String,
	title: String,
	closeOnOverlay: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue']);
const modalEl = ref(null);
const focusStack = [];

const open = async (event) => {
	if (event?.currentTarget) focusStack.push(event.currentTarget);
	emit('update:modelValue', true);
	await nextTick();

	if (modalEl.value) {
		modalEl.value.setAttribute('tabindex', '0');
		modalEl.value.focus();
		UI.a11y.accessDisable(document.querySelector('#wrap'), 'modal');
		// UI.a11y.accessDisable(UI.dom.prevAll(modalEl.value), 'modal');
	}
};

const close = async () => {
	// 복원 로직을 DOM 제거 전에 미리 실행
	if (modalEl.value) {
		UI.a11y.accessEnable(document.querySelector('#wrap'), 'modal');
		// UI.a11y.accessEnable(UI.dom.prevAll(modalEl.value), 'modal');
	}

	emit('update:modelValue', false);

	// 포커스 복귀는 DOM이 완전히 닫힌 뒤 실행되도록 지연
	await nextTick();
	const lastBtn = focusStack.pop();
	if (lastBtn?.focus) setTimeout(() => lastBtn.focus(), 10);
};

const handleOverlayClick = () => {
	if (props.closeOnOverlay) close();
};

// 만약 부모에서 강제로 unmount될 때도 접근성 복원이 필요하다면:
onBeforeUnmount(() => {
	UI.a11y.accessEnable(document.querySelector('header'), 'modal');
	UI.a11y.accessEnable(UI.dom.prevAll(modalEl.value), 'modal');
});

defineExpose({ open, close });
</script>

<style scoped>
.modal {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	background-color: rgba(0, 0, 0, 0.5);
	transition: all 0.4s;
}

.modal .modal_dialog {
	position: relative;
	min-width: 64.0rem;
	border: 1px solid var(--border-color);
	background-color: #fff;
	border-radius: 0.8rem;
	animation: modalFadeIn 0.3s ease-in-out;
}

.modal_top {
	padding: 1.4rem;
	border-bottom: 1px solid var(--border-color);
}

.btn_modal_close {
	position: absolute;
	top: 1.8rem;
	right: 1.4rem;
	width: 3.6rem;
	height: 3.6rem;
	background: url('../img/btn_close.svg') no-repeat center / 100%;
}

.modal_body {
	padding: 1.4rem;
}

.modal_bottom {
	padding: 1.4rem;
	border-top: 1px solid var(--border-color);
}

.modal-overlay {
	display: none;
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(3px);
	z-index: 999;
}

@keyframes modalFadeIn {
	from {
		opacity: 0;
		transform: translateY(-30px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
