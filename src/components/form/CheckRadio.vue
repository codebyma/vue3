<template>
	<div :class="checkClass">
		<label v-if="label" class="form_check_label">
			<input :type="type" class="form_check_input" :id="id" :name="name" :checked="modelValue" @change="updateValue" />
			<span class="form_check_txt">{{ label }}</span>
			<!-- <Icon iconName="checkbox.svg" /> -->
		</label>

		<!-- label 없는 단독 checkbox/radio -->
		<input v-else :type="type" class="form_check_input" :id="id" :name="name" :checked="modelValue"
			@change="updateValue" />
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: { type: [Boolean, String], default: false },
	type: { type: String, default: 'checkbox' }, // 'checkbox' 또는 'radio'
	id: { type: String, default: '' },
	label: { type: String, default: '' },
	name: { type: String, default: '' },
	design: { type: String, default: '' },
})

// -------------------------
// 2️⃣ Emits 정의
// -------------------------
const emit = defineEmits(['update:modelValue'])

// -------------------------
// 5️⃣ Methods 정의
// -------------------------
// v-model 업데이트
function updateValue(event) {
	if (props.type === 'checkbox') {
		emit('update:modelValue', event.target.checked) // Boolean
	} else if (props.type === 'radio') {
		emit('update:modelValue', event.target.value)   // String
	}
}

const checkClass = computed(() => {
	const classes = ['form_check']
	props.design ? classes.push(props.design) : ''
	return classes
})
</script>

<style scoped>
.form_check {
	display: flex;
	align-items: center;
}

.form_check {
	display: flex;
	position: relative;
	align-items: center;
}

.form_check_label {
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
}

.form_check_txt {
	font-size: var(--form-ele-font);
	line-height: 1.4;
}

.form_check_input+.form_check_txt {
	margin-left: 0.8rem;
}


.form_check_input {
	display: flex;
	flex-shrink: 0;
	width: 2.0rem;
	height: 2.0rem;
	border: 1px solid var(--form-ele-border-color);
	border-radius: 0.2rem;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	cursor: pointer;
}

.form_check_input:checked {
	border-color: var(--primary);
}

.form_check_input:focus-visible {
	outline: 1;
}

body.mobile .form_check_input:focus-visible {
	outline: none;
}

/* checkbox */
.form_check_input[type='checkbox']:checked {
	background: var(--primary) url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e") no-repeat center;
}

/* radio */
.form_check_input[type='radio'] {
	border-radius: 50%;
}

.form_check_input[type='radio']:checked {
	background: #0d6efd url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e") no-repeat center;
}

.check_btn .form_check_input {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: none;
	border-width: 1px;
	border-radius: var(--form-ele-radius);
}

.check_btn .form_check_txt {
	position: relative;
	margin: 0;
}

.check_btn .form_check_label {
	padding: var(--form-ele-padding-y) var(--form-ele-padding-x);
	padding-right: 4.0rem
}

.check_btn .form_check_input::after {
	content: '';
	display: block;
	position: absolute;
	top: 50%;
	right: 1.2rem;
	width: 2.0rem;
	height: 2.0rem;
	background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23007bff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e") no-repeat center;
	transform: translateY(-50%);
}

.check_btn .form_check_input:checked {
	background: none;
	background-color: var(--primary);
	border-width: 2px;
}

.check_btn .form_check_input:checked::after {
	background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e") no-repeat center;
}

.check_btn .form_check_input:checked+.form_check_txt {
	color: var(--white);
}
</style>