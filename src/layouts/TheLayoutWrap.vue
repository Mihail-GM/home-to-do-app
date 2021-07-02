<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			app
		>
			<TheLayoutWrapMenuList
				v-if="items"
				:items-prop="items"
			/>
		</v-navigation-drawer>

		<v-app-bar app>

			<v-btn icon @click="drawer = !drawer">
				<v-icon>mdi-apps</v-icon>

			</v-btn>
			<!-- -->
		</v-app-bar>

		<v-container fluid>
			<router-view></router-view>
		</v-container>

		<!--		<v-footer app>-->
		<!--			&lt;!&ndash; &ndash;&gt;-->
		<!--		</v-footer>-->
	</v-app>
</template>

<script>
	import {defineComponent, ref} from "@vue/composition-api";
	import TheLayoutWrapMenuList from "./TheLayoutWrapMenuList";

	export default defineComponent({
		name: "TheLayoutWrap",
		components: {
			TheLayoutWrapMenuList
		},

		setup() {

			const drawer = ref(true)
			const items = ref([
				{
					icon: 'mdi-home-circle',
					title: 'Home',
					to: '/'
				},

				{
					icon: 'mdi-clock',
					title: 'Tasks',
					to: '/tasks'
				},

				{
					icon: 'mdi-television',
					title: 'Living Room',
					to: '/living-room'
				},

				{
					icon: 'mdi-bed',
					title: 'Bedroom',
					to: '/bedroom'
				},

				{
					icon: 'mdi-knife',
					title: 'Kitchen',
					to: '/kitchen'
				},

				{
					icon: 'mdi-pizza',
					title: 'Dining Room',
					to: '/dining-room'
				},

				{
					icon: 'mdi-duck',
					title: 'Bathroom',
					to: '/bathroom'
				},
			])

			return {
				drawer,
				items
			};
		},
	});
</script>

<style scoped>

</style>