<template>
    <div>$route : {{ $route.path }}</div>
    <p>https://www.youtube.com/watch?v=2AK-UOKOSR8 라우터 유튜브</p>
    <button type="button" @click="$router.push('/')">$router 객체의 push메서드를 사용해서 홈으로 이동</button>
    <button type="button" @click="goModalView">setup 함수에서 모달로 이동</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goModalView = () => {
    router.push('/modal')
}

</script>
