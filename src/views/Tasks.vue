<template>
	<div>
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

		<v-container fluid>
			<div class="container-list-main">
				<div class="list-section">
					<div class="item"
					     v-for="(taskList, index) in allTasksLists"
					     :key="index"
					>

						<task-list
							style="min-width: 300px; overflow-x: auto!important;"
							v-if="taskList && taskList.tasksGroupData"
							:taskListProp="taskList.tasksGroupData"
							@openAddTaskModal="openAddTaskModalHandler"
						/>
					</div>
				</div>
			</div>

			<task-create-modal
				:show-dialog-prop.sync="showCreateTaskModal"
			/>
		</v-container>

	</div>

</template>

<script lang="ts">

	import TaskListItem from "@/components/Task/TaskListItem.vue";
	import {defineComponent, onMounted, ref, onBeforeMount} from "@vue/composition-api";
	import TaskList from "@/components/Task/TaskList.vue";
	import TaskCreateModal from "@/components/Task/TaskCreateModal.vue";
	import TasksListModel from "@/models/interfaces/TasksListModel";
	import TaskService from "@/services/tasks.services"
	// @ts-ignore
	import {VclFacebook, VclInstagram, VclList, VueContentLoading} from 'vue-content-loading';

	export default defineComponent({
		name: "Tasks",
		components: {
			TaskCreateModal,
			TaskList,
			TaskListItem,
			VclFacebook,
			VclInstagram,
			VclList,
			VueContentLoading
		},
		emits: ['openAddTaskModal'],

		setup() {
			const taskTest = ref({
				url: 'mdi-home-circle',
				title: 'Home',
				done: true
			})

			const showCreateTaskModal = ref(false);
			let allTasksLists = ref({tasksGroupData: null});

			const openAddTaskModalHandler = (() => {
				console.log("handler");
				showCreateTaskModal.value = true;

			});

			const fetchTaskListsData = (() => {

				return TaskService.getAllTasksGroup()
					.then((res) => {

							// console.log("res.data: " + res.tasksGroupData);
							return res
						}
					);

			});

			onBeforeMount(async () => {

				let data = await fetchTaskListsData();

				console.log('data!' + data);
				allTasksLists.value = data;
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