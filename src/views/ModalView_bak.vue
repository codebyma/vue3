<template>
    <!-- 모달 열기 버튼 -->
    <div>
        <button @click="openModal('modal1', $event)" title="팝업 열기">모달 1 열기</button>
        <button @click="openModal('modal2', $event)" title="팝업 열기">모달 2 열기</button>
    </div>
    <!-- 모달 컴포넌트 각각 slot 내용 다르게 -->
    <Modal v-model="modals.modal1" :ariaLabelledby="'modal1'" :title="'모달1 제목'">
        팝업 내용1
        <div style="height:300px"></div>
        <div class="btn-wrap">
            <button type="button" class="btn primary" title="팝업 열기" @click="openModal('modal2', $event)">모달2 열기</button>
        </div>

    </Modal>

    <Modal v-model="modals.modal2" :ariaLabelledby="'modal2'" :title="'모달2 제목'">
        <h2>모달 2</h2>
        <p>모달 2 내용</p>
    </Modal>
</template>

<script setup>
import { ref, reactive, onMounted  } from 'vue';
import Modal from '@/components/Modal.vue'

// 1️⃣ 모달 상태를 객체로 관리 (필요한 만큼 추가)
const modals = reactive({
    modal1: false,
    modal2: false,
})

// 공통 열기 함수
const openModal = (name, event) => {
    if (modals[name] !== undefined) {
        // 현재 클릭된 버튼을 스택에 저장
        window.__modalFocusStack = window.__modalFocusStack || [];
        window.__modalFocusStack.push(event.currentTarget);
        modals[name] = true;
    }
};
const closeModal = (name) => {
    if (modals[name] !== undefined) modals[name] = false
}
</script>
