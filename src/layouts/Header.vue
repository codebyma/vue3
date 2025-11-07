<template>
	<header id="header">
		<nav id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/modal">Modal</router-link> |
			<router-link to="/ui">Ui</router-link> |
			<router-link to="/router">router</router-link> |
			<router-link to="/button">Button</router-link> |
			<router-link to="/form">Form</router-link> |
			<router-link to="/accordion">accordion</router-link> |
			<router-link to="/tooltip">tooltip</router-link> |
		</nav>
	</header>
</template>

<script setup>

</script>

<style scoped>
#header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 8.0rem;
	background-color: var(--gray900);
}
#nav a {color:#fff}
</style>