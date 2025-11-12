<template>
	<SectionTitle title="테이블 가이드" subTitle="테이블에 대한 설명 노출"></SectionTitle>
	<Section>
		<h2 class="h_tit2">기본</h2>
		<Box>
			<Table :columns="columns" :rows="rows" variant="default" />
		</Box>

		<h2 class="h_tit2">줄무늬형</h2>
		<Box>
			<Table :columns="columns" :rows="rows" variant="striped" />
		</Box>

		<h2 class="h_tit2">테두리형</h2>
		<Box>
			<Table :columns="columns" :rows="rows" variant="bordered" />
		</Box>

		<h2 class="h_tit2">Hover형</h2>
		<Box>
			<Table :columns="columns" :rows="rows" variant="hover" />
		</Box>

		<h2 class="h_tit2">Compact형</h2>
		<Box>
			<Table :columns="columns" :rows="rows" variant="compact" />
		</Box>
		
		<h2 class="h_tit2">Scroll형</h2>
		<Box>
			<Table :columns="columns" :rows="rows" variant="striped" />
		</Box>
	</Section>
</template>

<script setup>
import Box from '@/components/Box.vue'
import Table from '@/components/Table.vue'

const columns = [
	{ key: 'name', label: '이름', sortable: true },
	{ key: 'age', label: '나이', sortable: true },
	{ key: 'city', label: '도시', sortable: false },
]

const rows = [
	{ name: '홍길동', age: 25, city: '서울' },
	{ name: '이영희', age: 32, city: '부산' },
	{ name: '김철수', age: 28, city: '대구' },
]
</script>
