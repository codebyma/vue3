<template>
  <div :class="wrapperClass">
    <template v-if="label">
      <label :for="id" class="form_label">{{ label }}</label>
    </template>

    <div ref="wrapperRef" class="form_input" :class="{ 'is-error': error, focused: focused }"
      @focusin="focused = true" @focusout="checkFocusOut">
      <input ref="inputRef" v-bind="inputAttrs" :value="modelValue" :class="inputClass"
        @input="updateValue" />
      <button v-if="showReset" type="button" class="btn_input_reset" :class="{ visible: modelValue }"
        @click="resetInput"></button>
      <span v-if="unit" class="unit">{{ unit }}</span>
      <Button v-if="actionLabel && actionHandler" :label="actionLabel" size="sm" @click="actionHandler" />
    </div>

    <p v-if="error" class="form_info">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import Button from '@/components/Button.vue'

// -------------------------
// Props 정의
// -------------------------
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  id: { type: String, default: '' },
  name: { type: String, default: '' },
  textAlign: { type: String, validator: val => ['right'].includes(val) }, // 기본: left
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  error: { type: String, default: '' },
  unit: { type: String, default: '' },
  showReset: { type: Boolean, default: true }, // 삭제 버튼 표시 여부
  actionLabel: { type: String, default: '' },  // 개별 버튼 라벨
  actionHandler: { type: Function, default: null }, // 개별 버튼 핸들러
})

// -------------------------
// Emits 정의
// -------------------------
const emit = defineEmits(['update:modelValue'])

// -------------------------
// Refs 정의
// -------------------------
const inputRef = ref(null)
const wrapperRef = ref(null)
const focused = ref(false)

// -------------------------
// Inject 그룹 여부
// -------------------------
const isInGroup = inject('inputGroup', false)

// -------------------------
// Computed 정의
// -------------------------
const wrapperClass = computed(() => isInGroup ? 'form_sub_item' : 'form_item')

// input HTML 속성
const inputAttrs = computed(() => ({
  type: props.type,
  id: props.id || undefined,
  name: props.name,
  placeholder: props.placeholder,
  disabled: props.disabled,
  readonly: props.readonly,
}))

// text-align 클래스
const inputClass = computed(() => {
  const classes = ['form_control']
  if (props.textAlign === 'right') classes.push('align_r')
  return classes
}))

// -------------------------
// Methods 정의
// -------------------------
function updateValue(event) {
  emit('update:modelValue', event.target.value)
}

function resetInput() {
  emit('update:modelValue', '')
  inputRef.value?.focus()
}

function checkFocusOut() {
  setTimeout(() => {
    if (!wrapperRef.value.contains(document.activeElement)) {
      focused.value = false
    }
  }, 0)
}
</script>
