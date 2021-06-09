<template>
	<div>
		<h1>Home tasks App</h1>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import HelloWorld from '../components/HelloWorld.vue'
	import Tasks from "@/views/Tasks.vue";

	export default Vue.extend({
		name: 'Home',

		components: {
			Tasks,
			HelloWorld,
		},
	})
</script>
