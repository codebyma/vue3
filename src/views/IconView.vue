<template>
	<DefaultLayout bg="gray">
		<SectionTitle title="아이콘 가이드" subTitle="아이콘에 대한 설명 노출"></SectionTitle>
		<Section>
			<h2 class="h_tit2">형태</h2>
			
			<div class="icon_wrap">
				<Icon iconName="camera_reels.svg" iconColor="gray900" iconAlt="카메라" />
				<Icon iconName="camera_reels.svg" iconColor="gray900" iconAlt="카메라" iconPosition="left" />
			</div>


		</Section>
	</DefaultLayout>
</template>

<script setup>
import Icon from '@/components/Icon.vue'
// import Box from '@/components/Box.vue'

</script>