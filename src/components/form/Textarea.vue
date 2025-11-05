<template>
	<div :class="['form_item', { 'is_error': !!error, 'is_disabled': disabled }]">
		<label v-if="label" :for="id" class="form_label">
			{{ label }}
			<span v-if="required" aria-hidden="true">*</span>
		</label>
		<div class="form_textarea">
			<textarea 
				:id="id" 
				ref="textareaRef" 
				:value="modelValue" 
				:placeholder="placeholder" 
				:disabled="disabled"
				:maxlength="maxlength" 
				:rows="rows" 
				:aria-invalid="error ? 'true' : 'false'" 
				:aria-describedby="descId"
				@input="onInput" 
				@focus="onFocus" 
				@blur="onBlur" 
				@keydown="onKeydown"
			></textarea>

			<div class="form_message" v-if="hint || error || showCounter">
				<div class="form_texts">
					<p v-if="hint" :id="hintId" class="form_hint">{{ hint }}</p>
					<p v-if="error" :id="errorId" class="form_error">{{ error }}</p>
				</div>
				<div class="form_counter" v-if="showCounter">
					<span class="form_counter_current">{{ currentLength }}</span>
					<span class="form_counter_divider">/</span>
					<span class="form_counter_max">{{ maxlength || '∞' }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

// Props
const props = defineProps({
	modelValue: { type: String, default: '' },
	id: { type: String, default: '' },
	label: { type: String, default: '' },
	hint: { type: String, default: '' },
	error: { type: String, default: '' },
	placeholder: { type: String, default: '' },
	rows: { type: Number, default: 3 },
	maxlength: { type: [Number, String], default: null },
	autosize: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false },
	required: { type: Boolean, default: false },
	showCounter: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur', 'keydown'])

// Refs
const textareaRef = ref(null)
const internalValue = ref(props.modelValue)

// IDs for accessibility
const errorId = `${props.id}-error`
const hintId = `${props.id}-hint`
const descId = computed(() => (props.error ? errorId : props.hint ? hintId : undefined))

// Computed
const currentLength = computed(() => (internalValue.value ? internalValue.value.length : 0))

// Watch external modelValue
watch(() => props.modelValue, (v) => {
	internalValue.value = v == null ? '' : String(v)
	if (props.autosize) {
		nextTick(() => adjustHeight())
	}
})

// Autosize helper
function adjustHeight() {
	const el = textareaRef.value
	if (!el || !props.autosize) return
	el.style.height = 'auto'
	// add 2px small buffer to avoid scrollbar flicker
	el.style.height = `${el.scrollHeight + 2}px`
}

onMounted(() => {
	if (props.autosize) {
		adjustHeight()
	}
})

// Methods
function onInput(e) {
	let val = e.target.value
	// maxlength 설정 시 강제 자르기 (브라우저와 카운터 싱크 맞추기)
	if (props.maxlength && val.length > props.maxlength) {
		val = val.slice(0, props.maxlength)
		e.target.value = val
	}

	internalValue.value = val
	emit('update:modelValue', val)
	emit('input', val)

	if (props.autosize) adjustHeight()
}

function onFocus(e) {
	emit('focus', e)
}

function onBlur(e) {
	emit('blur', e)
}

function onKeydown(e) {
	emit('keydown', e)
}

// Expose focus method
defineExpose({
	focus() {
		textareaRef.value?.focus()
	},
	blur() {
		textareaRef.value?.blur()
	},
})
</script>

<style scoped>
textarea {
	width: 100%;
	min-height: 10.0rem;
	padding: 1.6rem;
	border: 1px solid var(--border-color);
	font-size: var(--form-ele-font);
	border-radius: var(--form-ele-radius);
	font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.form_textarea {
	position: relative;
	display: flex;
	flex-direction: column;
	margin-top: var(--spacing_xs);
}


.form_textarea_info {
	display: flex;
	justify-content: space-between;
	margin-top: var(--spacing_xs);
	gap: 0.8rem;
}

</style>
