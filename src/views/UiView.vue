<template>
    <h2>Offset Height: {{ offsetHeight }}</h2>

    <button @click="showAlert">Alert</button>

    <div data-animation-number-simple="12345" ref="numEl"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { UI } from '@/utils/ui/ui.js';

const offsetHeight = ref(0);
const numEl = ref(null);

// DOM이 그려진 이후 실행
onMounted(() => {
    // DOM 높이 측정
    offsetHeight.value = UI.dom.getOffsetHeight('div');

    // Device info 초기화
    UI.deviceInfo.init();

    // 애니메이션 예시
    UI.animation.numberSpinSimple.setAmount('[data-animation-number-simple]');
});

const showAlert = () => {
    alert(`Browser: ${UI.deviceInfo.browser}, Mobile: ${UI.deviceInfo.mobile}`);
};
</script>
