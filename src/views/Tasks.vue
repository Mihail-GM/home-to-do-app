<template>
	<div>
		<h1> All tasks</h1>

		<div>
			<v-row
				class="mb-6"
				no-gutters
			>
				<v-col
					v-for="(taskList, index) in allTasksLists"
					:key="index"
				>
					<task-list
						:taskListProp="taskList"
						@openAddTaskModal="openAddTaskModalHandler"
					/>
				</v-col>

			</v-row>
		</div>

		<task-create-modal
			:show-dialog-prop.sync="showCreateTaskModal"
		/>

		<v-btn
			class="ma-2"
			outlined
			color="indigo"
			id="add-section-button"
		>
			<v-icon
				left
				dark
			>
				mdi-tooltip-plus-outline
			</v-icon>

			Add section
		</v-btn>
	</div>
</template>

<script lang="ts">
	import TaskListItem from "@/components/Task/TaskListItem.vue";
	import {defineComponent, ref} from "@vue/composition-api";
	import TaskList from "@/components/Task/TaskList.vue";
	import TaskCreateModal from "@/components/Task/TaskCreateModal.vue";
	import TasksListModel from "@/models/interfaces/TasksListModel";

	export default defineComponent({
		name: "Tasks",
		components: {TaskCreateModal, TaskList, TaskListItem},
		emits: ['openAddTaskModal'],

		setup() {
			const taskTest = ref({
				url: 'mdi-home-circle',
				title: 'Home',
				done: true
			})

			const showCreateTaskModal = ref(false);
			const allTasksLists = ref<TasksListModel[]>([
				{
					name: "task group 1",
					tasks: [
						{done: false, title: 'test', url: 'test'},
						{done: false, title: "test", url: 'test'},
						{done: true, title: "check", url: 'test'}
					]
				},
				{
					name: "task group 1",
					tasks: [
						{done: false, title: 'test', url: 'test'},
						{done: false, title: "test", url: 'test'},
						{done: true, title: "check", url: 'test'}
					]
				},
				{
					name: "task group 1",
					tasks: [
						{done: false, title: 'test', url: 'test'},
						{done: false, title: "test", url: 'test'},
						{done: true, title: "check", url: 'test'}
					]
				},

			])

			const openAddTaskModalHandler = (() => {
				console.log("handler");
				showCreateTaskModal.value = true;

			});

			return {
				taskTest,
				allTasksLists,
				openAddTaskModalHandler,
				showCreateTaskModal,
			};
		}
	});

</script>

<style scoped>

</style>