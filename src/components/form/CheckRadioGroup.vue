<template>
	<div class="form_item">
		<div v-if="label" class="form_label">{{ label }}</div>
		<div :class="['form_check_group', typeClass]">
			<!-- 그룹 라벨 -->
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	/** 그룹 형태: 
	 * - 'default' 기본 가로형
	 * - 'check_col' 세로형
	 * - 'check_btn' 버튼형
	 * - 'check_only' 단일 체크박스
	 */
	type: { type: String, default: 'default' },
	label: { type: String }
})

// 클래스 계산
const typeClass = computed(() => {
	const classes = ['btn']

	if (props.type) classes.push(props.type)
	if (props.label) classes.push(props.label)

	return classes
})

</script>

<style scoped>
.form_check_grooup {
	margin-top: 1.6rem;
}

.form_check_grooup:first-child {
	margin-top: 0;
}

.form_check_group {
	display: flex;
	gap: 1.6rem;
}

.form_check_group.check_only {
	display: inline-flex;
	margin:0;
}

.form_check_group.check_col {
	flex-direction: column;
}
</style>
