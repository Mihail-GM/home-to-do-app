<template>
	<div>
		<TasksBaseView :roomTasksIdProp="Rooms.all"/>
	</div>
</template>

<script lang="ts">
	import {defineComponent} from "@vue/composition-api";
	import TasksBaseView from "@/components/TasksbaseView.vue";
	import Rooms from "@/models/constants";

	export default defineComponent({
		name: "Tasks",
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

</style>