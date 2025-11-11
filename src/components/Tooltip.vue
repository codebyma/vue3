<template>
	<div class="tooltip-wrapper" ref="wrapperRef">
		<!-- 트리거 버튼 -->
		<button ref="triggerRef" class="tooltip-trigger" @click="toggleTooltip" :aria-expanded="isVisible.toString()"
			:aria-controls="tooltipId" type="button" aria-label="툴팁 열기">
			<slot></slot>
		</button>

		<!-- 툴팁 본문 -->
		<transition name="fade">
			<div v-if="isVisible" :id="tooltipId" class="tooltip-content" :class="position" role="tooltip"
				ref="tooltipRef" tabindex="-1" @focusout="onFocusOut">
				<button class="tooltip-close" @click="closeTooltip({ restoreFocus: true })" type="button"
					aria-label="툴팁 닫기">
					<Icon iconName="btn_close.svg" iconColor="white" />
				</button>

				<div class="tooltip-inner">
					<slot name="content"></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Icon from '@/components/Icon.vue'

const props = defineProps({
	position: {
		type: String,
		default: 'top', // top, right, bottom, left
	},
})

const isVisible = ref(false)
const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 9)}`
const wrapperRef = ref(null)
const triggerRef = ref(null)
const tooltipRef = ref(null)

// 툴팁 열기/닫기
function toggleTooltip() {
	isVisible.value = !isVisible.value

	if (isVisible.value) {
		// 툴팁 열리면 바로 포커스 이동
		nextTick(() => tooltipRef.value?.focus())
	}
}

function closeTooltip({ restoreFocus = false } = {}) {
	if (!isVisible.value) return
	isVisible.value = false

	// 클릭이나 ESC로 닫을 때만 포커스 복귀
	if (restoreFocus) {
		nextTick(() => triggerRef.value?.focus())
	}
}

// 포커스가 툴팁 밖으로 나가면 자동 닫기 (TAB 이동 지원)
function onFocusOut(event) {
	if (!wrapperRef.value.contains(event.relatedTarget)) {
		closeTooltip({ restoreFocus: false })
	}
}

// 외부 클릭 시 툴팁 닫기
function handleClickOutside(event) {
	if (wrapperRef.value && !wrapperRef.value.contains(event.target)) {
		closeTooltip({ restoreFocus: true })
	}
}

// ESC 키로 툴팁 닫기
function handleEsc(event) {
	if (event.key === 'Escape') {
		closeTooltip({ restoreFocus: true })
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
	document.addEventListener('keydown', handleEsc)
})

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside)
	document.removeEventListener('keydown', handleEsc)
})
</script>

<style scoped>
.tooltip-wrapper {
	position: relative;
	display: block;
	height: 2.4rem;
}

.tooltip-trigger {
	display: flex;
	align-items: center;
	gap: 0.4rem;
	cursor: pointer;
}

/* 툴팁 위치 */
.tooltip-content {
	position: absolute;
	background: #333;
	color: #fff;
	border-radius: 0.4rem;
	padding: 0.8rem 2.8rem 0.8rem 1.6rem;
	font-size: 1.4rem;
	z-index: 1000;
	min-width: 20rem;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	outline: none;
	/* focus용 */
}

.tooltip-content.top {
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	margin-bottom: 8px;
}

.tooltip-content.bottom {
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	margin-top: 8px;
}

.tooltip-content.left {
	right: 100%;
	top: 50%;
	transform: translateY(-50%);
	margin-right: 8px;
}

.tooltip-content.right {
	left: 100%;
	top: 50%;
	transform: translateY(-50%);
	margin-left: 8px;
}

/* 닫기 버튼 */
.tooltip-close {
	position: absolute;
	top: 0.6rem;
	right: 0.6rem;
	background: transparent;
	cursor: pointer;
}

/* 애니메이션 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-5px);
}
</style>
