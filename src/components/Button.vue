<template>
	<button 
		ref="buttonRef" 
		:class="buttonClass" 	
		:disabled="isDisabled" 
		:aria-busy="loading ? 'true' : 'false'"
		:aria-label="ariaLabel || undefined" 
		@click="handleClick"
	>
		<!-- 로딩 상태 -->
		<span v-if="loading" class="btn__spinner" aria-hidden="true"></span>

		<!-- 왼쪽 아이콘 이미지 -->
		<Icon v-if="iconName && iconPosition === 'left'" :iconName="iconName" :iconSize="iconSize" :iconColor="iconColor" :iconPosition="iconPosition" :iconAlt="iconAlt" />
		<!-- 왼쪽 아이콘 이모지 -->
		<!-- <span v-if="emoji && iconPosition === 'left'" class="btn_emoji" aria-hidden="true">
			<slot name="icon">{{ icon }}</slot>
		</span> -->

		<!-- 버튼 텍스트 -->
		<span class="btn_label">
			<slot >{{ label }}</slot>
		</span>

		<!-- 오른쪽 아이콘 -->
		<Icon v-if="iconName && iconPosition === 'right'" :iconName="iconName" :iconSize="iconSize" :iconColor="iconColor" :iconPosition="iconPosition" :iconAlt="iconAlt" />
	</button>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import Icon from '@/components/Icon.vue';

const props = defineProps({
	label: { type: String, default: '' },
	type: { type: String, default: 'primary' }, // primary | secondary | text
	size: { type: String, default: '' }, // sm | md | lg
	full: { type: Boolean, default: false },
	round: { type: Boolean, default: false },
	outline: { type: Boolean, default: false },
	loading: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false },
	disabledClass: { type: Boolean, default: false },
	iconName: { type: String },
	iconSize: { type: String },
	iconPosition: { type: String },
	iconColor: { type: String },
	iconAlt: { type: String },
	customClass: { type: String, default: '' },
	ariaLabel: { type: String, default: '' },
});

const emit = defineEmits(['click']);

const buttonRef = ref(null);

const handleClick = (event) => {
	if (!props.loading && !props.disabled) {
		emit('click', event);
	}
};

// 비활성 상태 계산
const isDisabled = computed(() => props.disabled || props.loading);

const buttonClass = computed(() => {
	const classes = ['btn']

	if (props.outline) classes.push('outline')
	if (props.round) classes.push('round')
	if (props.type) classes.push(props.type)
	if (props.size) classes.push(props.size)
	if (props.full) classes.push('full')
	if (props.loading) classes.push(props.loading)
	if (props.disabledClass) classes.push('disabled')
	if (props.customClass) classes.push(`${props.customClass}`)

	return classes
})
</script>

<style scoped>
.btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: var(--form-ele-padding-y) var(--form-ele-padding-x);
	background-color: var(--white);
	border: 1px solid var(--border-color);
	font-size: var(--form-ele-font);
	border-radius: var(--form-ele-radius);
	line-height: var(--line-height);
}

.primary {
	background-color: var(--primary);
	border-color: var(--primary);
	color: var(--white);
}

.primary.outline {
	background-color: var(--white);
	border-color: var(--primary);
	color: var(--primary);
}

.secondary {
	background-color: var(--secondary);
	border-color: var(--secondary);
	color: var(--white);
}

.secondary.outline {
	background-color: var(--white);
	border-color: var(--secondary);
	color: var(--secondary);
}

.light {
	background-color: var(--gray100);
	border-color: var(--gray300);
}

.light.outline {
	background-color: var(--white);
	color: var(--secondary);
}

.sm {
	padding: var(--form-ele-padding-sm-y) var(--form-ele-padding-sm-x);
	font-size: var(--form-ele-font-sm);
}

.lg {
	padding: var(--form-ele-padding-lg-y) var(--form-ele-padding-lg-x);
	font-size: var(--form-ele-font-lg);
}

.round {
	border-radius: 5.0rem;
	padding-left: var(--form-ele-round-padding-x);
	padding-right: var(--form-ele-round-padding-x);
}

.sm.round {
	border-radius: 5.0rem;
	padding-left: var(--form-ele-round-padding-sm-x);
	padding-right: var(--form-ele-round-padding-sm-x);
}

.lg.round {
	padding-left: var(--form-ele-round-padding-lg-x);
	padding-right: var(--form-ele-round-padding-lg-x);
}

.btn.full {
	width: 100%;
}

.btn[disabled],
.btn.disabled {
	opacity: 0.7;
	pointer-events: none;
}

.btn[readonly],
.btn.readonly {
	opacity: 0.7;
}
</style>
