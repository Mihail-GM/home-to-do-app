<template>
	<v-app>
		<TheLayoutWrap>
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</TheLayoutWrap>

		<!--		<v-main>-->
		<!--			<router-view/>-->
		<!--		</v-main>-->
	</v-app>
</template>

<script lang="ts">
	import { defineComponent, ref, onMounted, computed, onUnmounted } from "@vue/composition-api";
	import TheLayoutWrap from "@/layouts/TheLayoutWrap.vue"

	export default defineComponent({
		name: 'AppContent',
		components: {

			TheLayoutWrap
		},

		data() {
			return {
				//
			}
		},
	})
</script>
