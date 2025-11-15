<template>
	<DefaultLayout bg="gray">
		<nav id="nav">
			<router-link to="/gsap/scrollDemo">scrollDemo</router-link>
			<router-link to="/gsap/backgroundFade">backgroundFade</router-link>
			<router-link to="/gsap/horizontalParallax">horizontalParallax</router-link>
			<router-link to="/gsap/horizontalScroll">horizontalScroll</router-link>
			<router-link to="/gsap/imageZoom">imageZoom</router-link>
			<router-link to="/gsap/observerFade">observerFade</router-link>
			<router-link to="/gsap/parallax">parallax</router-link>
			<router-link to="/gsap/pinSection">pinSection</router-link>
			<router-link to="/gsap/scrollReactive">scrollReactive</router-link>
			<router-link to="/gsap/stretchText">stretchText</router-link>
			<router-link to="/gsap/svgLine">svgLine</router-link>
			<router-link to="/gsap/textReveal">textReveal</router-link>
		</nav>

		<router-view />
	</DefaultLayout>
</template>

<style scoped>
#nav {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 0.8rem;
}
#nav > a {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 4.0rem;
	padding:0 1.6rem;
	font-size: 1.4rem;
	background-color: var(--primary);
	color: var(--white);
	border-radius:5.0rem;
}
</style>

