<template>
	<!-- 
	✅ SVG일 경우: 파일 내용을 HTML로 직접 삽입 (v-html)
	✅ 비SVG일 경우: 일반 <img> 태그로 렌더링
	-->
	<i v-if="isSvg" v-html="imgContent" :class="iconClass"></i>
	<i v-else :class="iconClass">
		<img :src="imgContent" :alt="props.iconAlt" />
	</i>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'

/* ----------------------------------------------------
	props 정의
	- iconName: 아이콘 파일 이름 (예: 'camera.svg')
	- iconSize: 아이콘 크기 (16, 24, 32 중 하나)
	- iconColor: 색상 클래스명 (gray900, primary 등)
	- iconPosition: 위치 (left, right)
	- iconAlt: 대체 텍스트 (img 전용)
---------------------------------------------------- */
const props = defineProps({
	iconName: { type: String, required: true },
	iconSize: { type: String, default: "24", validator: (val) => ["16", "24", "32"].includes(val) },
	iconColor: { type: String, default: 'gray900' },
	iconPosition: { type: String, default: '', validator: (val) => ['', 'left', 'right'].includes(val) },
	iconAlt: { type: String, default: '' },
})

/* ----------------------------------------------------
	Vite의 import.meta.glob()으로 파일 일괄 로드
	- 모든 SVG 파일을 "텍스트(raw)" 형태로 불러옴
	- raster 이미지(png, jpg 등)는 일반 import로 처리
	- eager: true → 빌드 시 모든 파일을 미리 import
---------------------------------------------------- */
const svgIcons = import.meta.glob('../assets/icons/*.svg', {
	eager: true,       // 런타임이 아닌 빌드 시 즉시 import
	import: 'default', // svg.default 형태 생략 가능
	query: '?raw',     // 파일을 문자열(HTML 소스)로 불러옴
})

const rasterIcons = import.meta.glob('../assets/icons/*.{png,jpg,jpeg,webp,gif}', {
	eager: true,
	import: 'default',
})

/* ----------------------------------------------------
	상태 변수 정의
---------------------------------------------------- */
const imgContent = ref('') // SVG 또는 이미지 경로 저장
const isSvg = computed(() => props.iconName.toLowerCase().endsWith('.svg')) // 파일 확장자로 타입 구분

/* ----------------------------------------------------
	아이콘 로드 함수
	- props.iconName을 기반으로 svgIcons / rasterIcons에서 검색
	- SVG면 인라인 렌더링용 문자열(v-html)
	- 이미지면 일반 <img> 태그의 src로 사용
---------------------------------------------------- */
const loadImg = () => {
	const svgPath = `../assets/icons/${props.iconName}`
	const imgPath = `../assets/icons/${props.iconName}`

	if (isSvg.value && svgIcons[svgPath]) {
		// ✅ 인라인 SVG일 경우: raw 텍스트로 삽입
		imgContent.value = svgIcons[svgPath]
	} else if (rasterIcons[imgPath]) {
		// ✅ 일반 이미지일 경우: 파일 경로 사용
		imgContent.value = rasterIcons[imgPath]
	} else {
		// ⚠️ 해당 파일이 없을 경우 경고 출력
		console.warn(`⚠️ Icon "${props.iconName}" not found.`)
		imgContent.value = ''
	}
}

// 최초 1회 실행
loadImg()

/* ----------------------------------------------------
	동적으로 class 조합
	- 크기(size16 / size24 / size32)
	- 색상(gray900 / primary 등)
	- 위치(left / right)
---------------------------------------------------- */
const iconClass = computed(() => {
	const classes = ['icon']
	if (props.iconSize) classes.push(`size${props.iconSize}`)
	if (props.iconColor) classes.push(`${props.iconColor}`)
	if (props.iconPosition) classes.push(`${props.iconPosition}`)
	return classes
})

/* ----------------------------------------------------
	디버깅용 감시자 (선택사항)
	- iconName 변경 시 로드 재실행 등 확장 가능
---------------------------------------------------- */
watchEffect(() => {
	// console.log('iconName:', props.iconName)
})
</script>

<style>
/* ----------------------------------------------------
	기본 아이콘 스타일
---------------------------------------------------- */
.icon {
	display: inline-flex;
	justify-content: center;
	align-items: center;
}

/* SVG와 IMG가 아이콘 크기에 맞게 100%로 확장 */
.icon svg {
	width: 100%;
	height: 100%;
}

/* 위치 조정 (텍스트와 함께 사용 시 여백 확보) */
.icon.left {
	margin-right: 0.8rem;
}
.icon.right {
	margin-left: 0.8rem;
}

/* 크기별 스타일 */
.icon.size16 svg,
.icon.size16 img {
	width: 1.6rem;
	height: 1.6rem;
}

.icon.size24 svg,
.icon.size24 img {
	width: 2.4rem;
	height: 2.4rem;
}

.icon.size32 svg,
.icon.size32 img {
	width: 3.2rem;
	height: 3.2rem;
}

/* 색상별 스타일 (SVG fill 적용) */
.icon.gray900 svg {
	fill: var(--gray900);
}

.icon.primary svg {
	fill: var(--primary);
}
</style>
