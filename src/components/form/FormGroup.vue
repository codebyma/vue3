<template>
	<div class="form_group">
		<!-- 그룹 라벨 -->
		<component
			v-if="label"
			:is="labelTag"
			:for="labelTag === 'label' ? id : null"
			class="form_label"
		>
			{{ label }}
		</component>

		<!-- 그룹 input wrapper -->
		<div :class="layoutClass">
			<!-- slot으로 하위 Input 배치 -->
			<slot></slot>

			<!-- 그룹 액션 버튼 -->
			<Button v-if="actionLabel && actionHandler" :label="actionLabel" size="sm" @click="actionHandler" />
		</div>

		<!-- 그룹 에러 메시지 -->
		<p v-if="error" class="form_info">{{ error }}</p>
	</div>
</template>

<script setup>
import { computed  } from 'vue'

const props = defineProps({
	label: { type: String, default: '' },
	type: { type: String, default: 'input', validator: val => ['input', 'checkbox', 'radio', 'select'].includes(val)  },
	id: { type: String, default: '' },
	layout: { type: String, default: 'column', validator: val => ['row', 'column'].includes(val) },
	gap: { type: String, default: '', validator: val => ['', 'sm', 'lg'].includes(val) },
	actionLabel: { type: String, default: '' },
	actionHandler: { type: Function, default: null },
	error: { type: String, default: '' },
	customClass: { type: String, default: '' },
	labelAs: { type: String, default: 'label', validator: val => ['label', 'div'].includes(val) },
})

const layoutClass = computed(() => [
	`layout_${props.layout}`,               // 가로 세로 정렬
	props.gap ? `gap_${props.gap}` : '',    // 내부 간격
	`type_${props.type}`,                   // type별 커스텀
	props.customClass ? `${props.customClass}` : '', // 필요시 커스텀 클래스

])

// 동적으로 사용할 라벨 태그 결정
const labelTag = computed(() => props.labelAs)
</script>
