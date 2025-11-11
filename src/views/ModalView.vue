<template>
	<SectionTitle title="모달 가이드" subTitle="모달에 대한 설명 노출"></SectionTitle>
	<Section>
		<h2 class="h_tit2">기본</h2>
		<ButtonWrap spacing="lg" customClass="flex_center">
			<Button label="모달1 열기" type="text" @click="modal1.open($event)" />
			<Button label="모달2 열기" type="text" @click="modal2.open($event)" />
		</ButtonWrap>
	</Section>

	<!-- Modal -->
	<Modal ref="modal1" v-model="isModal1" ariaLabelledby="modal1" title="모달 1">
		<button @click="modal2.open($event)">모달 2 열기</button>
		<p>모달 1 내용입니다.</p>
	</Modal>

	<Modal ref="modal2" v-model="isModal2" ariaLabelledby="modal2" title="모달 2">
		<p>모달 2 내용입니다.</p>
	</Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';

const modal1 = ref(null);
const modal2 = ref(null);

const isModal1 = ref(false);
const isModal2 = ref(false);
</script>
