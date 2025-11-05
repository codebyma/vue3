<template>
	<div :class="['form_item', { 'is_error': error, 'is_disabled': disabled }]">
		<label v-if="label" :for="id" class="form_label">{{ label }}</label>
		<div 
			ref="wrapperRef" 
			class="form_input" 
			:class="{ 'is_error': error, focused: focused }"
			@focusin="focused = true" 
			@focusout="checkFocusOut"
		>
			<input 
				ref="inputRef" 
				v-bind="{ ...inputAttrs, ...$attrs }" 
				:value="modelValue" 
				:class="inputClass"
				@input="updateValue" 
				autocomplete="off" 
			/>
			<button 
				v-if="showReset" 
				type="button" 
				class="btn_input_reset" 
				:class="{ visible: modelValue }"
				@click="resetInput"
			></button>
			<span v-if="unit" class="unit">{{ unit }}</span>
			<Button v-if="actionLabel && actionHandler" :label="actionLabel" size="sm" @click="actionHandler" />
		</div>

		<div class="form_message" v-if="hint || error">
			<p v-if="hint" class="form_hint">{{ hint }}</p>
			<p v-if="error" class="form_error">{{ error }}</p>
		</div>
	</div>
</template>

<script setup>
/**
 * Input.vue
 * - 기본 Input 기능
 * - 삭제 버튼, 단위 표시, 개별 액션 버튼 지원
 * - 포커스 상태 관리
 */

import { ref, computed } from 'vue'

// -------------------------
// 1️⃣ Props 정의
// -------------------------
const props = defineProps({
	modelValue: { type: [String, Number], default: '' },
	label: { type: String, default: '' },
	type: { type: String, default: 'text' },
	id: { type: String, default: '' },
	// name: { type: String, default: '' },
	textAlign: { type: String, validator: val => ['right'].includes(val) }, // 기본: left
	// placeholder: { type: String, default: '' },
	disabled: { type: Boolean, default: false },
	readonly: { type: Boolean, default: false },
	error: { type: String, default: '' },
	hint: { type: String, default: '' },
	unit: { type: String, default: '' },
	showReset: { type: Boolean, default: true }, // 삭제 버튼 표시 여부
	actionLabel: { type: String, default: '' },  // 개별 버튼 라벨
	actionHandler: { type: Function, default: null }, // 개별 버튼 핸들러
})

// -------------------------
// 2️⃣ Emits 정의
// -------------------------
const emit = defineEmits(['update:modelValue'])

// -------------------------
// 3️⃣ Refs 정의
// -------------------------
const inputRef = ref(null)
const wrapperRef = ref(null)
const focused = ref(false)

// -------------------------
// Computed 정의
// -------------------------

// input HTML 속성
const inputAttrs = computed(() => ({
	type: props.type,
	id: props.id || undefined,       // ''이면 undefined → DOM에 아예 안붙음
	// name: props.name || undefined,
	// placeholder: props.placeholder || undefined,
	disabled: props.disabled,
	readonly: props.readonly,
}))

// text-align 클래스 (right만 지원, left는 기본)
const inputClass = computed(() => {
	const classes = ['form_control']
	if (props.textAlign === 'right') classes.push('align_r')
	return classes
})

// -------------------------
// 5️⃣ Methods 정의
// -------------------------
// v-model 업데이트
function updateValue(event) {
	emit('update:modelValue', event.target.value)
}

// 입력값 초기화
function resetInput() {
	emit('update:modelValue', '')
	inputRef.value?.focus()
}

// 포커스 관리 (인풋 및 버튼 포함)
function checkFocusOut() {
	// setTimeout 사용 → 다음 DOM 업데이트 시점 확인
	setTimeout(() => {
		if (!wrapperRef.value.contains(document.activeElement)) {
			focused.value = false
		}
	}, 0)
}
</script>





<style scoped>
input:not([type="checkbox"]):not([type="radio"]) {
	display: block;
	width: 100%;
	/* padding: var(--form-ele-padding-y) var(--form-ele-padding-x); */
	padding: var(--form-ele-padding-y) 0;
	background-color: transparent;
	border: none;
	color: var(--gray900);
	font-size: var(--form-ele-font);
	line-height: var(--form-ele-line-height);
}

input:not([type="checkbox"]):not([type="radio"])::placeholder {
	font-size: var(--form-ele-font);
	color: var(--gray600);
}

.form_input {
	overflow: hidden;
	position: relative;
	display: flex;
	height: 4.8rem;
	margin-top: var(--spacing_xs);
	border-bottom: 1px solid var(--border-color);
	background-color: var(--white);
	/* border-radius: var(--form-ele-radius); */
}

.form_input.focused {
	border-color: var(--primary);
	/* box-shadow: 0 0 0 .25rem rgba(13,110,253,.25); */
}

.is_error .form_input {
	border-color: var(--danger);
}

/* form input */
.form_control {
	flex-grow: 1;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	outline: 0;
}

/* placeholder 항상 왼쪽 정렬 */
.form_control::placeholder {
	text-align: left;
	color: var(--mediumgray);
	font-size: var(--form-ele-font);
}

/* form btn */
.form_input .btn {
	flex-grow: 1;
	flex-shrink: 0;
	align-self: center;
}

/* input reset */
.btn_input_reset {
	display: none;
	flex-shrink: 0;
	width: 4.0rem;
	height: 100%;
	background: url('@/assets/icons/btn_close.svg') no-repeat center / 2.0rem;
}

.btn_input_reset.visible {
	display: block;
}

/* form unit */
.form_input .unit {
	display: flex;
	align-items: center;
	flex-shrink: 0;
	height: var(--form-item-height);
	padding: 0 1.2rem;
	font-size: 1.4rem;
}
</style>
