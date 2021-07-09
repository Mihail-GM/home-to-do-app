<template>
	<div>

		<v-container style="max-width: 270px">

			<v-divider class="mt-4"></v-divider>

			<v-row
				class="my-1"
			>
				Task
				<v-spacer></v-spacer>

				<v-menu
					bottom
					left
					offset-y
					transition="scroll-y-transition"
					id="more-option-button"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							icon
							v-bind="attrs"
							v-on="on"
						>
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>

					<v-card
						class="mx-auto secondary"
						max-width="300"
						tile
					>
						<v-list dense flat>
							<v-list-item-group color="secondary">
								<v-list-item id="more-action-button-0" @click.native="editList">
									<v-list-item-icon>
										<v-icon>mdi-clipboard-edit-outline</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>Edit</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-list-item
									id="more-action-button-1"
									@click.native="deleteList(tasksGroup.objectId)"
								>
									<v-list-item-icon>
										<v-icon>mdi-delete-forever</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>Delete</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
				</v-menu>
			</v-row>

			<v-row class="my-1">
				<strong class="mx-2 success--text text--darken-2">
					<v-divider vertical></v-divider>
					Completed: {{ numberCompletedTasks }}
				</strong>

				<v-spacer></v-spacer>
			</v-row>

			<v-row class="my-1">

				<strong
					class="mx-2 info--text text--darken-2"
					id="remaining"
				>
					<v-divider vertical></v-divider>

					Remaining: {{ remainingTasks }}
				</strong>

				<v-spacer></v-spacer>

				<v-progress-circular
					:value="progressOfTasks"
					class="mr-2"
				></v-progress-circular>
				<span id="progress">
					{{ progressOfTasks }}%
				</span>
			</v-row>

			<v-hover>
				<v-card v-if="tasksGroup.tasks.length > 0">
					<v-slide-y-transition
						class="py-0"
						group
					>
						<template v-for="(task, i) in tasksGroup.tasks">

							<task-list-item
								v-if="task.done === false"
								class=""
								:key="`${i}-${task.title}`"
								:task-prop="task"
							/>

						</template>
					</v-slide-y-transition>
				</v-card>
			</v-hover>
			<v-btn
				text
				color="dark"
				id="add-task-button"
				block
				@click.native="$emit('openAddTaskModal')"
			>
				<v-icon
					color="green"
					dark
				>
					mdi-plus
				</v-icon>
				<span> Add task </span>
			</v-btn>

		</v-container>

	</div>
</template>

<script lang="ts">
	import { defineComponent, computed, PropType } from "@vue/composition-api";
	import TaskListItem from "@/components/Task/TaskListItem.vue";
	import { TasksListInfoModel } from "@/models/interfaces/TasksListInfoModel";
	import TaskService from "@/services/tasks.services"

	export default defineComponent({
		name: "TaskList",
		components: { TaskListItem },

		props: {
			taskListProp: {
				required: true,
				type: Object as PropType<TasksListInfoModel>,
			},

			taskListIdProp: {
				required: true,
				type: String
			}
		},
		emits: ['openAddTaskModal', 'refreshTaskLists'],

		setup(props, { emit }) {

			const tasksGroup = computed(() => props.taskListProp);

			const numberCompletedTasks = computed(() => {
				return tasksGroup.value.tasks.filter(task => task.done).length;
			});

			const progressOfTasks = computed(() => {
				return Math.round((numberCompletedTasks.value / tasksGroup.value.tasks.length * 100));
			});

			const remainingTasks = computed(() => {
				return tasksGroup.value.tasks.length - numberCompletedTasks.value;
			});

			const editList = (() => {

				console.log("edit function");
			});

			const deleteList = (() => {

				TaskService.deleteTask(props.taskListIdProp);
				emit('refreshTaskLists');
			});

			return {
				tasksGroup,
				numberCompletedTasks,
				progressOfTasks,
				remainingTasks,
				editList,
				deleteList
			}
		}
	});

</script>

<style lang="scss" scoped>

	::v-deep .v-sheet.v-card:not(.v-sheet--outlined) {
		box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
	}
</style>