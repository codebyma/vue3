<template>
	<DefaultLayout bg="gray">
		<SectionTitle title="아코디언 가이드" subTitle="아코디언에 대한 설명 노출"></SectionTitle>
		<Section>
			<h2 class="h_tit2">기본</h2>
			<Box>
				<Accordion>
					<AccordionItem title="아코디언 1">
						첫 번째 아코디언 내용입니다.
					</AccordionItem>

					<AccordionItem title="아코디언 2">
						두 번째 아코디언 내용입니다.
					</AccordionItem>

					<AccordionItem title="아코디언 3">
						세 번째 아코디언 내용입니다.
					</AccordionItem>
				</Accordion>
			</Box>

			<h2 class="h_tit2">모두 열림</h2>
			<Box>
				<Accordion :multiple="true">
					<AccordionItem title="아코디언 1">
						첫 번째 아코디언 내용입니다.
					</AccordionItem>

					<AccordionItem title="아코디언 2">
						두 번째 아코디언 내용입니다.
					</AccordionItem>

					<AccordionItem title="아코디언 3">
						세 번째 아코디언 내용입니다.
					</AccordionItem>
				</Accordion>
			</Box>

			<h2 class="h_tit2">상단으로 스크롤 이동</h2>
			<Box>
				<Accordion :scroll-to-active="true" :fixed-selectors="['#header1']">
					<AccordionItem title="아코디언 1">
						내용 1
					</AccordionItem>
					<AccordionItem title="아코디언 2">
						내용 2
					</AccordionItem>
					<AccordionItem title="아코디언 3">
						내용 3
					</AccordionItem>
				</Accordion>
			</Box>
			<div style="height:20000px"></div>
		</Section>
	</DefaultLayout>
</template>

<script setup>
import Box from '@/components/Box.vue'
import Accordion from '@/components/Accordion.vue'
import AccordionItem from '@/components/AccordionItem.vue' // ✅ 꼭 import 해야 함
</script>