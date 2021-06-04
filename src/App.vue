<template>
	<v-app>
		<v-main>
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name: 'App',

		data: () => ({
			//
		}),
	});
</script>
