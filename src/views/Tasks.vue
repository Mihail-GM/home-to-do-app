<template>
	<div>
		<task-list/>
	</div>
</template>

<script>
	import TaskListItem from "../components/Task/TaskListItem";
	import {defineComponent, ref} from "@vue/composition-api";
	import TaskList from "@/components/Task/TaskList";

	export default defineComponent({
		name: "Tasks",
		components: {TaskList, TaskListItem},

		setup() {
			const taskTest = ref({
				url: 'mdi-home-circle',
				title: 'Home',
				done: true
			})

			return {
				taskTest
			};
		}
	});

</script>

<style scoped>

</style>