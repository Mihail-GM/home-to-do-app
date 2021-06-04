<template>
	<v-app dark>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					:id="'menu-link-' + i"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"/>
					</v-list-item-content>
				</v-list-item>
			</v-list>

		</v-navigation-drawer>

		<v-app-bar app>

			<v-btn icon @click="drawer = !drawer">
				<v-icon>mdi-apps</v-icon>

			</v-btn>
			<!-- -->
		</v-app-bar>

		<!-- Sizes your content based upon application components -->
		<v-main>

			<!-- Provides the application the proper gutter -->
			<v-container fluid>

				<!-- If using vue-router -->
				<router-view></router-view>
			</v-container>
		</v-main>

<!--		<v-footer app>-->
<!--			&lt;!&ndash; &ndash;&gt;-->
<!--		</v-footer>-->
	</v-app>

	<!--	<v-app dark>-->
	<!--		<v-navigation-drawer-->
	<!--			v-model="drawer"-->
	<!--			:mini-variant="miniVariant"-->
	<!--			:clipped="clipped"-->
	<!--			fixed-->
	<!--			app-->
	<!--		>-->
	<!--			<v-list>-->
	<!--				<v-list-item-->
	<!--					v-for="(item, i) in items"-->
	<!--					:key="i"-->
	<!--					:to="item.to"-->
	<!--					router-->
	<!--					exact-->
	<!--				>-->
	<!--					<v-list-item-action>-->
	<!--						<v-icon>{{ item.icon }}</v-icon>-->
	<!--					</v-list-item-action>-->
	<!--					<v-list-item-content>-->
	<!--						<v-list-item-title v-text="item.title"/>-->
	<!--					</v-list-item-content>-->
	<!--				</v-list-item>-->
	<!--			</v-list>-->
	<!--		</v-navigation-drawer>-->

	<!--		<v-app-bar-->
	<!--			:clipped-left="clipped"-->
	<!--			fixed-->
	<!--			app-->
	<!--		>-->
	<!--			<v-btn-->
	<!--				icon-->
	<!--				@click.stop="miniVariant = !miniVariant"-->
	<!--			>-->
	<!--				<v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>-->
	<!--			</v-btn>-->

	<!--			<v-toolbar-title v-text="title"/>-->

	<!--			<v-spacer></v-spacer>-->

	<!--			<v-avatar color="green">-->
	<!--				<v-icon dark>-->
	<!--					mdi-account-circle-->
	<!--				</v-icon>-->
	<!--			</v-avatar>-->
	<!--		</v-app-bar>-->
	<!--		<v-main>-->
	<!--			<v-container>-->

	<!--			</v-container>-->
	<!--		</v-main>-->

	<!--		<v-footer-->
	<!--			:absolute="!fixed"-->
	<!--			app-->
	<!--		>-->
	<!--			<v-spacer/>-->
	<!--			<span>&copy; DigitalWebee {{ new Date().getFullYear() }}</span>-->
	<!--		</v-footer>-->
	<!--	</v-app>-->
</template>

<script>
	import { defineComponent, ref, onMounted, computed, onUnmounted } from "@vue/composition-api";

	export default defineComponent({
		name: "TheLayoutWrap",

		setup() {
			// const theme = ref('light')
			//
			// let clipped = ref(false)
			let drawer = ref(true)
			// let fixed = ref(false)
			// let miniVariant = ref(true)
			let items = ref([
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