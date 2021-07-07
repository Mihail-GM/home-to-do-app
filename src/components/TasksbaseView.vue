<template>
	<div>
		<slot/>

		<v-btn
			class="ma-2"
			outlined
			color="indigo"
			id="add-section-button"
		>
			<v-icon left dark>
				mdi-tooltip-plus-outline
			</v-icon>
			Add section
		</v-btn>

		<v-container fluid>
			<div class="container-list-main">
				<div class="list-section">
					<div
						class="item"
						v-for="(taskList, index) in allTasksLists"
						:key="index"
					>
						<task-list
							style="min-width: 300px; overflow-x: auto!important;"
							v-if="taskList && taskList.tasksGroupData"
							:taskListProp="taskList.tasksGroupData"
							:taskListIdProp="taskList.objectId"
							@openAddTaskModal="openAddTaskModalHandler(index)"
							@refreshTaskLists="fetchTaskListsData"
						/>
					</div>
				</div>
			</div>

			<task-create-modal
				:taskListProp.sync="allTasksLists[taskListToEditIndex]"
				:show-dialog-prop.sync="showCreateTaskModal"
			/>
		</v-container>
	</div>

</template>

<script lang="ts">

	import TaskListItem from "@/components/Task/TaskListItem.vue";
	import { defineComponent, ref, onBeforeMount } from "@vue/composition-api";
	import TaskList from "@/components/Task/TaskList.vue";
	import TaskCreateModal from "@/components/Task/TaskCreateModal.vue";
	import TaskService from "@/services/tasks.services"

	export default defineComponent({
		name: "TasksBaseView",
		components: {
			TaskCreateModal,
			TaskList,
			TaskListItem,
		},

		props: {
			roomTasksIdProp: {
				required: true,
				type: String,
				default: 'get all tasks'
			}
		},

		emits: ['openAddTaskModal', 'refreshTaskLists'],

		setup(props) {

			const taskListToEditIndex = ref();
			const showCreateTaskModal = ref(false);
			let allTasksLists = ref({ tasksGroupData: null });

			const openAddTaskModalHandler = ((index: number) => {

				taskListToEditIndex.value = index;
				showCreateTaskModal.value = true;
			});

			const fetchTaskListsData = (() => {

				return TaskService.getAllTasksGroup()
					.then((res) => {

							allTasksLists.value = res;
							return res
						}
					);
			});

			const fetchTaskListsDataForRoom = ((id: string) => {

				return TaskService.getAllTasksGroupForRoom(id)
					.then((res) => {

							allTasksLists.value = res;
							return res
						}
					);
			});

			onBeforeMount(async () => {

				if (props.roomTasksIdProp === 'get all tasks') {
					await fetchTaskListsData();
					return;
				}

				await fetchTaskListsDataForRoom(props.roomTasksIdProp);
			});

			return {
				allTasksLists,
				openAddTaskModalHandler,
				showCreateTaskModal,
				fetchTaskListsData,
				taskListToEditIndex
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
