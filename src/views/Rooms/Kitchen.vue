<template>
	<div>
		<TasksBaseView :roomTasksIdProp="Rooms.Kitchen">
			<h1>Kitchen room: all tasks</h1>
		</TasksBaseView>
	</div>
</template>

<script lang="ts">
	import {defineComponent} from "@vue/composition-api";
	import TasksBaseView from "@/components/TasksbaseView.vue";
	import Rooms from "@/models/constants";

	export default defineComponent({
		name: "Kitchen",
		components: {
			TasksBaseView
		},

		setup() {
			return {
				Rooms
			};
		}
	});

</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		overflow-x: auto;
	}

	.list-section {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: calc(100vh - 129px);
		padding: 0 47px 8px;
		align-items: flex-start;
		overflow-x: auto;
		overscroll-behavior-x: none;
	}
</style>