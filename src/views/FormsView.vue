<template>
	<DefaultLayout bg="gray">
		<nav id="nav">
			<router-link to="/forms/button">Button</router-link>
			<router-link to="/forms/form">Form</router-link>
			<router-link to="/forms/accordion">accordion</router-link>
			<router-link to="/forms/tooltip">tooltip</router-link>
			<router-link to="/forms/modal">modal</router-link>
			<router-link to="/forms/chips">chips</router-link>
			<router-link to="/forms/table">table</router-link>
			<router-link to="/forms/icon">icon</router-link>
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

