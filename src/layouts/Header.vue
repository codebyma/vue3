<template>
	<header id="header">
		<nav id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/modal">Modal</router-link> |
			<router-link to="/ui">Ui</router-link> |
			<router-link to="/router">router</router-link> |
			<router-link to="/button">button</router-link> |
			<router-link to="/form">form</router-link> |
		</nav>
	</header>
</template>

<script setup>

</script>

<style scoped>
#header {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 8.0rem;
	background-color: var(--gray900);
}
#nav a {color:#fff}
</style>