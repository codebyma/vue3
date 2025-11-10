<template>
	<DefaultLayout bg="gray">
		<SectionTitle title="툴팁 가이드" subTitle="툴팁 대한 설명 노출"></SectionTitle>
		<Section>
			<h2 class="h_tit2">기본</h2>
			<Box>
				<div class="flex_center gap_xs">
					<span>상단 툴팁</span>
					<Tooltip position="top">
						<Icon iconName="question_circle_fill.svg" iconColor="gray900" />
						<template #content>
							단순 텍스트 툴팁입니다.
						</template>
					</Tooltip>
				</div>
				
				<div class="flex_center gap_xs spacing_xs">
					<span>하단 툴팁</span>
					<Tooltip position="bottom">
						<Icon iconName="question_circle_fill.svg" iconColor="gray900" />
						<template #content>
							단순 텍스트 툴팁입니다.
						</template>
					</Tooltip>
				</div>

				<div class="flex_center gap_xs spacing_xs">
					<span>왼쪽 툴팁</span>
					<Tooltip position="left">
						<Icon iconName="question_circle_fill.svg" iconColor="gray900" />
						<template #content>
							단순 텍스트 툴팁입니다.
						</template>
					</Tooltip>
				</div>

				<div class="flex_center gap_xs spacing_xs">
					<span>오른쪽 툴팁</span>
					<Tooltip position="right">
						<Icon iconName="question_circle_fill.svg" iconColor="gray900" />
						<template #content>
							단순 텍스트 툴팁입니다.
						</template>
					</Tooltip>
				</div>
			</Box>

			<h2 class="h_tit2">텍스트 포함</h2>
			<Box>
				<div class="flex_center gap_xs">
					<Tooltip position="top">
						<span>상단 툴팁</span>
						<Icon iconName="question_circle_fill.svg" iconColor="gray900" />
						<template #content>
							단순 텍스트 툴팁입니다. 단순 텍스트 툴팁입니다.
						</template>
					</Tooltip>
				</div>
				<div class="flex_center gap_xs spacing_xs">
					<Tooltip position="bottom">
						<span>하단 툴팁</span>
						<Icon iconName="question_circle_fill.svg" iconColor="gray900" />
						<template #content>
							단순 텍스트 툴팁입니다. 단순 텍스트 툴팁입니다.
						</template>
					</Tooltip>
				</div>
				<div class="flex_center gap_xs spacing_xs">
					<Tooltip position="left">
						<span>왼쪽 툴팁</span>
						<Icon iconName="question_circle_fill.svg" iconColor="gray900" />
						<template #content>
							단순 텍스트 툴팁입니다. 단순 텍스트 툴팁입니다.
						</template>
					</Tooltip>
				</div>
				<div class="flex_center gap_xs spacing_xs">
					<Tooltip position="right">
						<span>오른쪽 툴팁</span>
						<Icon iconName="question_circle_fill.svg" iconColor="gray900" />
						<template #content>
							단순 텍스트 툴팁입니다. 단순 텍스트 툴팁입니다.
						</template>
					</Tooltip>
				</div>
			</Box>
		</Section>
	</DefaultLayout>
</template>

<script setup>
import Box from '@/components/Box.vue'
import Tooltip from '@/components/Tooltip.vue'
import Icon from '@/components/Icon.vue'
</script>