<template>
	<DefaultLayout bg="gray">
		<SectionTitle title="버튼 가이드" subTitle="버튼에 대한 설명 노출"></SectionTitle>
		<Section>
			<h2 class="h_tit2">형태</h2>
			<Box>
				<h3 class="h_tit3 mgb16">기본</h3>
				<ButtonWrap>
					<Button v-for="btn in basicButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>

				<h3 class="h_tit3 mgb16">라인</h3>
				<ButtonWrap>
					<Button v-for="btn in outlineButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
				
				<h3 class="h_tit3 mgb16">라운드</h3>
				<ButtonWrap>
					<Button v-for="btn in roundButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
			</Box>

			<h2 class="h_tit2">크기</h2>
			<Box>
				<h3 class="h_tit3 mgb16">스몰</h3>
				<ButtonWrap>
					<Button v-for="btn in sizeSmButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>

				<h3 class="h_tit3 mgb16">라지</h3>
				<ButtonWrap>
					<Button v-for="btn in sizeLgButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
			</Box>
			
			<h2 class="h_tit2">너비</h2>
			<Box>
				<h3 class="h_tit3 mgb16">Full</h3>
				<ButtonWrap>
					<Button v-for="btn in fullButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
			</Box>
			
			<h2 class="h_tit2">비활성화</h2>
			<Box>
				<h3 class="h_tit3 mgb16">속성</h3>
				<ButtonWrap>
					<Button v-for="btn in disabledButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
				
				<h3 class="h_tit3 mgb16">클래스</h3>
				<ButtonWrap>
					<Button v-for="btn in disabledClassButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
			</Box>
			
			<h2 class="h_tit2">아이콘</h2>
			<Box>
				<h3 class="h_tit3 mgb16">정렬</h3>
				<ButtonWrap>
					<Button v-for="btn in iconPositionButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>

				<h3 class="h_tit3 mgb16">크기</h3>
				<ButtonWrap>
					<Button v-for="btn in iconSizeButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
				
				<h3 class="h_tit3 mgb16">색상</h3>
				<ButtonWrap>
					<Button v-for="btn in iconColorButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
				
				<h3 class="h_tit3 mgb16">확장자</h3>
				<ButtonWrap>
					<Button v-for="btn in iconFileButtons" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
			</Box>

			<h2 class="h_tit2">버튼 랩</h2>
			<Box>
				<h3 class="h_tit3 mgb16">버튼 수평</h3>
				<ButtonWrap spacing="0">
					<Button v-for="btn in basicBtnWrap" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
				
				<h3 class="h_tit3">버튼 수직</h3>
				<p>.vertical로 버튼 정렬을 수직으로 변경 가능합니다.</p>
				<ButtonWrap spacing="sm" :vertical="true">
					<Button v-for="btn in basicBtnWrap" :key="btn.label + '_vertical'" v-bind="btn" />
				</ButtonWrap>
				
				<h3 class="h_tit3 mgb16">버튼 간격</h3>
				<p>버튼 사이 간격으로 xs부터 xl까지 세팅 가능합니다.</p>
				<ButtonWrap spacing="sm" gap="sm">
					<Button v-for="btn in basicBtnWrap" :key="btn.label + '_gap_sm'" v-bind="btn" />
				</ButtonWrap>
				<ButtonWrap spacing="xs" gap="lg">
					<Button v-for="btn in basicBtnWrap" :key="btn.label + '_gap_xs'" v-bind="btn" />
				</ButtonWrap>
				
				<h3 class="h_tit3 mgb16">랩 마진</h3>
				<p>버튼랩 상단 마진으로 xs부터 xl까지 세팅 가능합니다.</p>
				<ButtonWrap spacing="sm">
					<Button v-for="btn in basicBtnWrap" :key="btn.label + '_spacing_sm'" v-bind="btn" />
				</ButtonWrap>
				<ButtonWrap spacing="lg">
					<Button v-for="btn in basicBtnWrap" :key="btn.label + '_spacing_lg'" v-bind="btn" />
				</ButtonWrap>
			</Box>



			<!-- <Box padding="sm" background="gray100" shadow="sm">
				<ButtonWrap spacing="lg">
					<Button v-for="btn in basicButtons2" :key="btn.label" v-bind="btn" />
				</ButtonWrap>
				<ButtonWrap spacing="sm">
					<Button v-for="btn in basicButtons2" :key="btn.label + '_v2'" v-bind="btn" />
				</ButtonWrap>
			</Box>
			<Box>
				<ButtonWrap spacing="lg" customClass="test">
					<Button :label="buttonText" type="primary" @click="goNext('기본 버튼')" />
					<Button label="Yes" type="primary" />
					<Button label="No" type="secondary" />
					<Button label="Maybe" />
				</ButtonWrap>
			</Box> -->
			
			<!-- <Box padding="sm" background="gray100" shadow="sm">
				<ButtonWrap spacing="lg" customClass="test">
					<Button :label="buttonText" type="primary" @click="goNext('기본 버튼')" />
					<Button label="로딩중" aria-label="ariaLabel" type="primary" :loading="isLoading" />
					<Button label="아이콘 버튼" type="secondary" icon="⭐" iconPosition="left" @click="onClick('아이콘 버튼')" />
					<Button label="텍스트 버튼" type="text" @click="onClick('텍스트 버튼')" />
					<Button label="비활성 버튼" :disabled="true" />
				</ButtonWrap>
			</Box>
			-->
		</Section>
	</DefaultLayout>
</template>

<script setup>
import Box from '@/components/Box.vue'

import { ref, computed  } from 'vue';

// 로딩 완료 예시
const isLoading = ref(true); // 초기에는 로딩 상태

// 로딩 상태에 따라 aria-label 동적 변경
const ariaLabel = computed(() => isLoading.value ? '로딩중...' : '로딩 완료');

setTimeout(() => {
 	isLoading.value = false; // 로딩 완료
},1000)


// 버튼명 변경하기 
// 버튼 텍스트 상태
const buttonText = ref('이전'); // 초기 기본값

// 필요할 때 버튼명을 변경하는 함수
const goNext = () => {
  buttonText.value = '다음'; // 버튼명 변경
};

// Basic Button
const basicButtons = [
	{ label: '기본형 버튼', type: 'primary' },
	{ label: '보조형 버튼', type: 'secondary' },
	{ label: '보조형 버튼', type: 'light' },
]

// Outline Button
const outlineButtons = [
	{ label: '기본형 버튼', type: 'primary', outline: true },
	{ label: '보조형 버튼', type: 'secondary', outline: true },
	{ label: '보조형 버튼', type: 'light', outline: true },
]

// Round Button
const roundButtons = [
	{ label: '기본형 버튼', type: 'primary', round: true },
	{ label: '보조형 버튼', type: 'secondary', round: true },
	{ label: '기본형 버튼 / 라인', type: 'primary', round: true, outline: true },
	{ label: '보조형 버튼 / 라인', type: 'secondary', round: true, outline: true },
]

// Small Size 버튼
const sizeSmButtons = [
	{ label: '기본형 버튼 / 스몰', type: 'primary', size: 'sm' },
	{ label: '보조형 버튼 / 스몰', type: 'secondary', size: 'sm' },
]

// Large Size 버튼
const sizeLgButtons = [
	{ label: '기본형 버튼 / 라지', type: 'primary', size: 'lg' },
	{ label: '보조형 버튼 / 라지', type: 'secondary', size: 'lg' },
]

// full 버튼
const fullButtons = [
	{ label: '기본형 버튼 / 너비100%', type: 'primary', full: true },
	{ label: '보조형 버튼 / 너비100%', type: 'secondary', full: true },
]

// Disabled Button
const disabledButtons = [
	{ label: '기본형 버튼', type: 'primary', disabled: true },
	{ label: '보조형 버튼', type: 'secondary', disabled: true },
	{ label: '보조형 버튼', type: 'light', disabled: true },
]

// Disabled Button
const disabledClassButtons = [
	{ label: '기본형 버튼', type: 'primary', disabledClass: true },
	{ label: '보조형 버튼', type: 'secondary', disabledClass: true },
	{ label: '보조형 버튼', type: 'light', disabledClass: true },
]

// Icon Position
const iconPositionButtons = [
	{ label: '기본형 버튼 / 왼쪽', type: 'primary', iconName: 'camera.svg', iconColor: 'white', iconPosition: 'left' },
	{ label: '보조형 버튼 / 오른쪽', type: 'secondary', iconName: 'camera.svg', iconColor: 'white', iconPosition: 'right' },
]

// Icon Size
const iconSizeButtons = [
	{ label: '기본형 버튼 / 16', type: 'primary', iconName: 'camera.svg', iconColor: 'white', iconPosition: 'left', iconSize: '16' },
	{ label: '보조형 버튼 / 24', type: 'secondary', iconName: "camera.svg", iconColor: 'white', iconPosition: 'left', iconSize: '24' },
	{ label: '보조형 버튼 / 32', type: 'light', iconName: "camera.svg", iconPosition: 'left', iconSize: '32' },
]

// Icon File
const iconFileButtons = [
	{ label: '기본형 버튼 / svg', type: 'primary', iconName: 'camera.svg', iconColor: 'white', iconPosition: 'left' },
	{ label: '보조형 버튼 / png', type: 'secondary', iconName: "flag_kor.png", iconAlt: "대만민국 국기", iconColor: 'white', iconPosition: 'left' },
]

// Icon Color
const iconColorButtons = [
	{ label: '기본형 버튼 / 흰색', type: 'primary', iconName: 'camera.svg', iconColor: 'white', iconPosition: 'left' },
	{ label: '보조형 버튼 / 검정', type: 'light', iconName: "camera.svg", iconPosition: 'left' },
]

// Icon Wrap
const basicBtnWrap = [
	{ label: '기본형 버튼', type: 'primary' },
	{ label: '보조형 버튼', type: 'secondary' },
]

const basicButtons2 = [
	{ label: buttonText.value, type: 'primary', onClick: () => goNext('기본 버튼') },
	{ label: 'Yes', type: 'primary' },
	{ label: 'No', type: 'secondary' },
	{ label: 'Maybe', type: 'default' }
]
</script>