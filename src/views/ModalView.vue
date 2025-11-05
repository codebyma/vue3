<template>
	<DefaultLayout>
		<div class="btn_wrap">
			<button class="btn" @click="modal1.open($event)">모달 1 열기</button>
			<button class="btn" @click="modal2.open($event)">모달 2 열기</button>
		</div>
	</DefaultLayout>

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
