<template>
	<v-dialog
		v-model="showDialog"
		persistent
		max-width="600px"
	>

		<v-card>
			<v-card-title>
				<span class="headline">Create new task list</span>
			</v-card-title>

			<v-card-text>
				<v-container>
					<v-row>
						<v-col>
							<v-text-field
								label="Home task name*"
								id="title-text-field"
								type="title"
								v-model="newTaskList.name"
								data-cy="name-input"
								required
							/>
						</v-col>
					</v-row>

					<v-row>
						<v-col>
							<v-select
								v-model="newTaskList.room_id"
								item-text="name"
								item-value="id"
								:items="rooms"
								label="Standard"
								dense
							></v-select>
						</v-col>
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
					@click.native="saveTaskList"
				>
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import { computed, defineComponent, ref } from "@vue/composition-api";
	import TaskService from "@/services/tasks.services"
	import TaskModule from "@/store/modules/Tasks"
	import SnackbarModule from "@/store/modules/Snackbar"
	import { TasksListEntityModel } from "@/models/interfaces/TasksListInfoModel";
	import Rooms from "@/models/constants";

	export default defineComponent({
		name: "TaskListCreateModal",
		props: {
			showDialogProp: {
				require: true,
				default: false,
				type: Boolean
			},
		},

		setup(props, { emit }) {

			const rooms = Object.entries(Rooms).map(([key, value]) => ({ name: key, id: value }));
			rooms.shift(); // remove all rooms from selection

			const newTaskList = ref<TasksListEntityModel>(
				{
					name: 'New task list name',
					room_id: 1,
					tasksGroupData: {
						name: '',
						tasks: [],
					},
				}
			);

			const showDialog = computed({
				get: () => props.showDialogProp,
				set: (value) => emit('update:showDialogProp', value)
			});

			const closeModal = (() => {
				emit('update:showDialogProp', false);
			});

			const saveTaskList = (async () => {

				TaskService.addTaskList(newTaskList.value)
					.then(async res => {

						await TaskService.addTaskListRoom(res, newTaskList.value.room_id);
						await TaskModule.saveTask(res);
						showDialog.value = false;
						emit(`fetchTaskListsDataForRoom`);
						await SnackbarModule.showSnackbarMessage(
							"New task list added successfully"
						);
					})
					.catch(() => {

						SnackbarModule.showSnackbarMessage(
							"Something went wrong when adding new task list"
						);
						showDialog.value = false;
					})
			});

			return {
				showDialog,
				saveTaskList,
				newTaskList,
				closeModal,
				rooms
			}
		}
	});

</script>

<style lang="scss" scoped>

</style>