<template>
    <div v-if="modelValue" class="modal" :aria-labelledby="ariaLabelledby" ref="modalEl">
        <div class="modal_dialog">
            <div class="modal_top">
                <h2 :id="ariaLabelledby">{{ props.title }}</h2>
                <button class="btn_modal_close" @click="close"></button>
            </div>
            <div class="modal_body">
                <slot></slot>
                <button @click="test">test</button>
            </div>
            <div class="modal_bottom">
                <div class="btn_wrap j-c-end">
                    <button type="button" class="btn primary small" @click="close">팝업 닫기</button>
                </div>
            </div>
        </div>

        <!-- 오버레이 -->
        <div class="modal-overlay" @click="handleOverlayClick"></div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref, nextTick } from 'vue'
import { UI } from '@/utils/ui/ui.js'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    closeOnOverlay: { type: Boolean, default: true },
    ariaLabelledby: { type: String, required: false, default: null, },
    title: { type: String, default: '' },
    // returnFocusRef: { type: Object, default: null } // 부모 버튼 ref
})

const emit = defineEmits(['update:modelValue'])

const modalEl = ref(null)

const test = () => {
    UI.a11y.accessDisable(UI.dom.prevAll(modalEl.value), 'modal')
}

// 모달 닫기 함수
const close = () => {
    emit('update:modelValue', false)
}

// 오버레이 클릭 처리
const handleOverlayClick = () => {
    if (props.closeOnOverlay) close()
}

// 모달 열릴 때 접근성 함수 실행
watch(
    () => props.modelValue,
    async (newVal) => {
        if (newVal) {
            // 모달이 열릴 때 실행
            // DOM 랜더링 후 실행
            await nextTick();
            // 모달로 포커스 이동
            modalEl.value.setAttribute('tabindex', '0');
            modalEl.value?.focus()
            // 접근성 처리
            UI.a11y.accessDisable(document.querySelector('header'), 'modal')
            UI.a11y.accessDisable(UI.dom.prevAll(modalEl.value), 'modal')
        } else {
            // 모달이 닫힐 때 실행
            UI.a11y.accessEnable(document.querySelector('header'), 'modal')
            UI.a11y.accessEnable(UI.dom.prevAll(modalEl.value), 'modal')
            // 버튼으로 포커스 회귀
            // 닫힐 때 — 마지막 클릭 버튼으로 포커스 복귀
            if (window.__modalFocusStack?.length) {
                const lastBtn = window.__modalFocusStack.pop();
                if (lastBtn && typeof lastBtn.focus === 'function') {
                    lastBtn.focus();
                }
            }
        }
    }
)


</script>

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.4s;
}

.modal .modal_dialog {
    position: relative;
    min-width: 64.0rem;
    border: 1px solid var(--border-color);
    background-color: #fff;
    border-radius: 0.8rem;
    animation: modalFadeIn 0.3s ease-in-out;
}

.modal_top {
    padding: 1.4rem;
    border-bottom: 1px solid var(--border-color);
}

.btn_modal_close {
    position: absolute;
    top: 1.8rem;
    right: 1.4rem;
    width: 3.6rem;
    height: 3.6rem;
    background: url('../img/btn_close.svg') no-repeat center / 100%;
}

.modal_body {
    padding: 1.4rem;
}

.modal_bottom {
    padding: 1.4rem;
    border-top: 1px solid var(--border-color);
}

.modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 999;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
