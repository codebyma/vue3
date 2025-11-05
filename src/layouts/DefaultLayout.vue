<template>
	<div id="wrap" :class="bg">
		<Header /> <!-- 공통 헤더 -->
		<main id="container">
			<div class="sections">
				<slot /> <!-- 각 페이지 내용이 들어감 -->
			</div>
		</main>
		<Footer /> <!-- 공통 푸터 -->
	</div>
</template>

<script setup>
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'

const props = defineProps({
	bg: { type: String, default: '' },    // gray
})
</script>

<style scoped>
#wrap {
	height: 100%;
}

#wrap.gray {
	background-color: var(--gray100);
}
</style>
