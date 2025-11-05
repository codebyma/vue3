<template>
	<DefaultLayout bg="gray">
		<SectionTitle title="폼 가이드" subTitle="인풋에 대한 설명 노출"></SectionTitle>
		<Section>
			<h2 class="h_tit2">인풋</h2>
			<Box>
				<Form>
					<Input 
						v-model="form.input1" 
						id="input0" 
						hint="label없는 인풋 aria-label 추가해야함"
						placeholder="입력하세요" 
					/>
					<Input 
						v-model="form.input1" 
						id="input1" 
						label="인풋" 
						hint="안내 텍스트가 노출됩니다."
						placeholder="입력하세요" 
					/>
					<Input 
						v-model="form.input2" 
						id="input2" 
						label="인풋과 버튼" 
						placeholder="입력하세요" 
						actionLabel="버튼명"
						:actionHandler="onAlert"
					/>
					<Input 
						v-model="form.input3" 
						id="input3" 
						label="인풋과 유닛" 
						placeholder="입력하세요" 
						unit="원(유닛)"
					/>
					<Input 
						v-model="form.input4" 
						id="input4" 
						label="인풋과 버튼과 유닛" 
						placeholder="입력하세요" 
						unit="원(유닛)"
						actionLabel="버튼명"
						:actionHandler="onAlert"
					/>
					<Input 
						v-model="form.email" 
						id="email" 
						type="email" 
						label="인풋과 유효성 검사" 
						placeholder="example@email.com"
						:error="form.emailError" 
						actionLabel="버튼명"
						:actionHandler="validateEmail"
					/>
				</Form>
			</Box>

			<h2 class="h_tit2">체크박스</h2>
			<Box>
				<Form>
					<FormGroup>
						<CheckRadio v-model="singleCheck" id="check1_1" customClass="check_single" label="체크박스 혼자" />
					</FormGroup>

					<!-- 체크박스 + 레이블(가로) -->
					<FormGroup type="checkbox" layout="row" label="체크박스 + 레이블(가로)" labelAs="div">
						<CheckRadio v-model="checkbox1" id="check2_1" label="체크박스1" />
						<CheckRadio v-model="checkbox2" id="check2_2" label="체크박스2" />
					</FormGroup>

					<!-- 체크박스 + 레이블(세로) -->
					<FormGroup type="checkbox" label="체크박스 + 레이블(세로)" labelAs="div">
						<CheckRadio v-model="checkbox3" id="check3_1" label="체크박스1" />
						<CheckRadio v-model="checkbox4" id="check3_2" label="체크박스2" />
					</FormGroup>

					<!-- 체크박스 디자인 -->
					<FormGroup type="checkbox" label="체크박스 디자인" layout="row" labelAs="div" customClass="check_btn">
						<CheckRadio v-model="checkbox5" id="check4_1" label="체크박스1" />
						<CheckRadio v-model="checkbox6" id="check4_2" label="체크박스2" />
					</FormGroup>
				</Form>
			</Box>
			
			<h2 class="h_tit2">라디오버튼</h2>
			<Box>
				<Form>
					<FormGroup>
						<CheckRadio v-model="singleRadio" type="radio" id="radio1_1" name="radio" label="라디오버튼 혼자" />
					</FormGroup>

					<!-- 라디오버튼 + 레이블(가로) -->
					<FormGroup type="radio" layout="row" label="라디오버튼 + 레이블(가로)" labelAs="div">
						<CheckRadio v-model="radio1" type="radio" id="radio2_1" name="radio2" label="라디오버튼1" />
						<CheckRadio v-model="radio2" type="radio" id="radio2_2" name="radio2" label="라디오버튼2" />
					</FormGroup>

					<!-- 라디오버튼 + 레이블(세로) -->
					<FormGroup type="radio" label="라디오버튼 + 레이블(세로)" labelAs="div">
						<CheckRadio v-model="radio3" type="radio" id="radio3_1" name="radio3" label="라디오버튼1" />
						<CheckRadio v-model="radio4" type="radio" id="radio3_2" name="radio3" label="라디오버튼2" />
					</FormGroup>

					<!-- 라디오버튼 디자인 -->
					<FormGroup type="radio" label="라디오버튼 디자인" layout="row" labelAs="div" customClass="check_btn">
						<CheckRadio v-model="radio5" type="radio" id="radio4_1" name="radio4" label="라디오버튼1 " />
						<CheckRadio v-model="radio6" type="radio" id="radio4_2" name="radio4" label="라디오버튼2" />
					</FormGroup>
				</Form>
			</Box>

			<h2 class="h_tit2">텍스트 에어리어</h2>
			<Box>
				<Form>
					<Textarea
						v-model="form.comment"
						id="textarea1"
						label="의견"
						placeholder="의견을 입력하세요"
						hint="최대 200자까지 입력 가능"
						:maxlength="20"
					/>


					<!-- 에러 상태 -->
					<Textarea
						v-model="form.feedback"
						id="textarea2"
						label="오류"
						error="필수 입력 항목입니다."
						required
					/>


					<!-- Autosize 예시 -->
					<Textarea
						v-model="form.autosize"
						id="textarea3"
						label="자동 높이 조절"
						autosize
						placeholder="줄바꿈 시 자동으로 높이가 늘어납니다."
					/>

					<!-- Disabled 예시 -->
					<Textarea
						v-model="form.disabled"
						label="비활성 상태"
						disabled
						hint="입력할 수 없습니다."
						error="필수 입력 항목입니다."
						:showCounter="false"
					/>
				</Form>
			</Box>

			<h2 class="h_tit2">폼 그룹</h2>
			<Box>
				<Form @submit="onSubmit">
					<Input 
						v-model="form.name" 
						id="name" 
						name="name"
						label="이름" 
						placeholder="이름을 입력하세요"
					/>
					<Input 
						v-model="form.tel" 
						type="tel" 
						id="price" 
						label="전화번호" 
						placeholder="'-' 없이 입력해주세요" 
					/>

					<FormGroup label="주민등록번호" id="jumin" layout="row">
						<Input v-model="form.jumin1" id="jumin" :maxlength="6" placeholder="앞 6자리"   />
						<Input v-model="form.jumin2" type="password" :showReset="false" :maxlength="6" placeholder="뒤 6자리"  />
					</FormGroup>

					<FormGroup label="주소" layout="column" gap="lg" labelAs="div">
						<Input v-model="form.postcode" placeholder="우편번호" actionLabel="검색" :actionHandler="searchPostcode" />
						<Input v-model="form.address" placeholder="기본주소" />
						<Input v-model="form.detailAddress" placeholder="상세주소" />
					</FormGroup>
					
					<FormGroup label="인풋" layout="row" id="a2_1">
						<Input v-model="form.postcode" id="a2_1" placeholder="우편번호" />
						<Input v-model="form.detailAddress" id="a2_2" placeholder="상세주소" actionLabel="버튼명" :actionHandler="validateEmail" />
					</FormGroup>
					
					<FormGroup layout="row">
						<Input v-model="form.postcode" id="a1_1" label="이름" placeholder="우편번호" />
						<Input v-model="form.detailAddress" id="a1_2" label="이름"  placeholder="상세주소" actionLabel="버튼명" :actionHandler="validateEmail" />
					</FormGroup>


					<!-- 제출 버튼 -->
					<ButtonWrap spacing="lg" >
						<Button label="제출" :full="true" @click="onAlert" />
					</ButtonWrap>
				</Form>
			</Box>
		</Section>
	</DefaultLayout>
</template>

<script setup>
import Box from '@/components/Box.vue'
import { Form, FormGroup, Input, CheckRadio, Textarea } from '@/components/form'

import { ref, reactive } from 'vue'

const form = reactive({
	postcode: '',
	address: '',
	detailAddress: '',
	phone: '',
	email: '',
	emailError: '오류 메시가 노출됩니다.',
	jumin1: '',
	jumin2: '',
})

function onAlert() {
	alert('버튼을 클릭했습니다.')
}


// 이메일 유효성 검사 함수
function isValidEmail(email) {
	// 간단한 정규식 예시
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return regex.test(email)
}

// 제출 버튼 클릭 시 이메일 검사
function validateEmail() {
	if (!form.email) {
		form.emailError = '이메일을 입력해주세요.'
	} else if (!isValidEmail(form.email)) {
		form.emailError = '이메일 형식이 올바르지 않습니다.'
	} else {
		form.emailError = ''
		alert('이메일이 정상입니다: ' + form.email)
	}
}


function searchPostcode() {
  console.log('우편번호 검색 실행')
  // ex) API 호출 가능
}

function onSubmit() {
  console.log('폼 제출', form)
}



// 체크박스 상태
const singleCheck = ref(true)
const checkbox1 = ref(true)
const checkbox2 = ref(false)
const checkbox3 = ref(true)
const checkbox4 = ref(false)
const checkbox5 = ref(true)
const checkbox6 = ref(false)

// 라디오버튼 상태
const singleRadio = ref(true)
const radio1 = ref(true)
const radio2 = ref(false)
const radio3 = ref(true)
const radio4 = ref(false)
const radio5 = ref(true)
const radio6 = ref(false)
</script>

<style scoped>
</style>