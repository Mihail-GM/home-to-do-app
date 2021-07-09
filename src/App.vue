<template>
	<v-app>
		<v-main>
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>

			<app-snackbar/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';
	import AppSnackbar from "@/components/Base/AppSnackbar.vue";

	export default Vue.extend({
		name: 'App',
		components: { AppSnackbar },
		data: () => ({
			//
		}),
	});
</script>
