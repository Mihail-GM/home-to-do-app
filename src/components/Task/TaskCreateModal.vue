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
					@click.native="$emit('update:showDialogProp', false)"
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
	import {computed, defineComponent, ref} from "@vue/composition-api";
	import TasksModel from "@/models/interfaces/TasksModel";
	import TaskService from "@/services/tasks.services"
	import TaskModule from "@/store/modules/Tasks"

	export default defineComponent({
		name: "TaskCreateModal",
		props: {
			showDialogProp: {
				require: true,
				default: false,
				type: Boolean
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

			const saveTask = (async () => {

				TaskService.addTask(task.value)
					.then(async res => {
						await TaskModule.saveTask(res);
						showDialog.value = false;
					})
					.catch(() => {
						//error createing task TODO
						showDialog.value = false;
					})
			});

			return {
				showDialog,
				saveTask,
				task
			}
		}
	});

</script>

<style lang="scss" scoped>

</style>