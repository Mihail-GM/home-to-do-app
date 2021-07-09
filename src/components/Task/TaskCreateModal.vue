<template>
	<v-dialog
		v-model="showDialog"
		persistent
		max-width="600px"
	>

		<v-card>
			<v-card-title>
				<span class="headline">Create home task</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>

						<v-text-field
							label="Home task name*"
							id="title-text-field"
							type="title"
							v-model="task.title"
							data-cy="name-input"
							required
						/>

					</v-row>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="red darken-1"
					id="close-button"
					text
					@click.native="closeModal"
				>
					Close
				</v-btn>

				<v-btn
					color="green darken-1"
					id="create-button"
					text
					@click.native="saveTask"
				>
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import { computed, defineComponent, PropType, ref } from "@vue/composition-api";
	import TasksModel from "@/models/interfaces/TasksModel";
	import TaskService from "@/services/tasks.services"
	import TaskModule from "@/store/modules/Tasks"
	import SnackbarModule from "@/store/modules/Snackbar"
	import { TasksListEntityModel } from "@/models/interfaces/TasksListInfoModel";

	export default defineComponent({
		name: "TaskCreateModal",
		props: {
			showDialogProp: {
				require: true,
				default: false,
				type: Boolean
			},

			taskListProp: {
				require: true,
				default: () => {
				},
				type: Object as PropType<TasksListEntityModel>
			}
		},

		setup(props, { emit }) {

			const task = ref<TasksModel>(
				{
					done: false,
					title: 'test',
					url: 'test',
				}
			);

			const showDialog = computed({
				get: () => props.showDialogProp,
				set: (value) => emit('update:showDialogProp', value)
			});

			const closeModal = (() => {
				emit('update:showDialogProp', false);
			});

			const createNewObjectWithNewTaskToSave = (() => {

				let tasks = props.taskListProp;
				tasks.tasksGroupData.tasks.push(task.value);

				return tasks;
			});

			const saveTask = (async () => {

				let newTaskList = createNewObjectWithNewTaskToSave();

				TaskService.addTask(newTaskList)
					.then(async res => {

						await TaskModule.saveTask(res);
						showDialog.value = false;
						await SnackbarModule.showSnackbarMessage(
							"New task added successfully"
						);
					})
					.catch(() => {
						//error creating task TODO
						SnackbarModule.showSnackbarMessage(
							"Something went wrong when adding new task"
						);
						showDialog.value = false;
					})
			});

			return {
				showDialog,
				saveTask,
				task,
				closeModal
			}
		}
	});

</script>

<style lang="scss" scoped>

</style>