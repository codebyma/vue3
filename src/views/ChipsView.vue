<template>
	<SectionTitle title="칩스 가이드" subTitle="칩스에 대한 설명 노출"></SectionTitle>
	<Section>
		<h2 class="h_tit2">기본</h2>
		<Box>
			<Chips :chips="items" />
		</Box>
	</Section>
</template>

<script setup>
import Box from '@/components/Box.vue'
import Chips from '@/components/Chips.vue'

const items = [
    '사과', '바나나', '포도', '딸기', '복숭아', '키위', '오렌지'
]
</script>