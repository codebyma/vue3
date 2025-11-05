<!-- Form.vue -->
<template>
	<div class="form" @submit.prevent="handleSubmit">
		<!-- slot으로 내부 폼 요소를 자유롭게 넣음 -->
		<slot></slot>
	</div>
</template>

<script setup>
import { defineEmits } from 'vue'

// submit 이벤트를 부모로 전달
const emit = defineEmits(['submit'])

function handleSubmit(event) {
	emit('submit', event)
}
</script>

<style>
.form_label {
	display: flex;
	align-items: center;
	font-size: 1.4rem;
	color: var(--gray900);
}

.form_message {
	display: flex;
	justify-content: space-between;
	margin-top: var(--spacing_xs);
}

.form_hint {
	margin-top:0.8rem;
	font-size: var(--form-message-font);
}

.form_error {
	color: var(--danger);
	font-size: var(--form-message-font);
}

.form_counter {
	display: flex;
	gap: 0.4rem;
	font-size: var(--form-message-font);
}

.form_hint:first-child,
.form_error:first-child {
	margin-top: 0;
}

.form_texts > p + p {
	margin-top: 0.2rem;
}


.form > .form_item + .form_item,
.form > .form_item + .form_group,
.form > .form_group + .form_group,
.form > .form_group + .form_item {
	margin-top: var(--form-item-margin);
}


/* 폼 레이아웃 */
.form .layout_column {
	display: flex;
	flex-direction: column;
	gap: var(--gap_md);
}

.form .layout_row {
	display: flex;
	gap: var(--gap_md);
}

.form .layout_row .form_item {
	flex: 1;
}

.form .form_label + .type_checkbox,
.form .form_label + .type_radio {
	margin-top: var(--spacing_xs);
}
</style>
