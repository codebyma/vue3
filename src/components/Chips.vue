<template>
	<div
		ref="wrapperRef"
		class="chips_wrapper"
		:class="{ is_active: isExpanded }"
	>
		<!-- 버튼 리스트 -->
		<div ref="scrollRef" class="chips_scroll">
			<Button
				v-for="(item, index) in chips"
				:key="index"
				size="sm"
				type="light"
				:round="true"
			>
				{{ item }}
			</Button>
		</div>

		<!-- 토글 버튼 -->
		<div class="chips_toggle">
			<Button
				v-if="showToggle"
				class="btn sm"
				size="sm"
				type="primary"
				round
				aria-controls="chips-list"
				:aria-expanded="isExpanded.toString()"
				@click="toggleExpand"
				:aria-label="isExpanded ? '접기' : '펼치기'"
				
			>
				<!-- {{ isExpanded ? '접기' : '펼치기' }} -->
			</Button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import Button from '@/components/Button.vue'

const props = defineProps({
	chips: {
		type: Array,
		default: () => []
	}
})

const scrollRef = ref(null)
const wrapperRef = ref(null)
const isExpanded = ref(false)
const showToggle = ref(false)

const checkScrollable = () => {
	const el = scrollRef.value
	if (!el) return
	// scrollWidth와 clientWidth 비교
	showToggle.value = el.scrollWidth > el.clientWidth + 1 // 여백 오차 보정
}

const toggleExpand = () => {
	isExpanded.value = !isExpanded.value
}

onMounted(async () => {
	await nextTick()
	checkScrollable()

	// 리사이즈 시 다시 계산
	window.addEventListener('resize', checkScrollable)
})

watch(
	() => props.chips,
	async () => {
		await nextTick()
		checkScrollable()
	}
)
</script>

<style scoped>
.chips_wrapper {
	position: relative;
	display: flex;
	align-items: center;
	overflow: hidden;
	width: 100%;
	
}

.chips_scroll {
	display: flex;
	gap: 8px;
	overflow-x: auto;
	scroll-behavior: smooth;
	flex: 1;
	padding-right:4.8rem;
}

.chips_scroll .btn {
	white-space: nowrap;
}

.chips_wrapper.is_active .chips_scroll {
	overflow-x: visible; /* 확장 시 스크롤 제거 */
	flex-wrap: wrap;
}

.chips_toggle {
	position: absolute;
	right: 0;
	top: 0;
	height: calc(100% - 12px);
	z-index: 10;
	background-color: var(--white);
}

.chips_toggle .btn {
	width: 2.4rem;
	height: 3.6rem;
	background: url('@/assets/icons/caret_down_fill.svg') no-repeat center;
}
</style>
