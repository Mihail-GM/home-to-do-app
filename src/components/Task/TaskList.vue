<template>
	<div>
		<v-container style="max-width: 300px">

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
						<v-list dense>
							<v-list-item-group
								color="primary"
							>
								<v-list-item
									v-for="(item, i) in items"
									:key="i"
								>
									<v-list-item-icon>
										<v-icon :id="'more-action-button-' + i">{{ item.icon }}</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>{{ item.title }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
				</v-menu>

			</v-row>

			<v-row
				class="my-1"
			>
				<strong
					class="mx-2 info--text text--darken-2"
					id="remaining"
				>
					Remaining: {{ remainingTasks }}
				</strong>

				<v-divider vertical></v-divider>

				<strong class="mx-2 success--text text--darken-2">
					Completed: {{ numberCompletedTasks }}
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

			<v-divider class="mb-4"></v-divider>

			<v-card v-if="tasksGroup.tasks.length > 0">
				<v-slide-y-transition
					class="py-0"
					group

				>
					<template v-for="(task, i) in tasksGroup.tasks">
						<v-divider
							v-if="i !== 0"
							:key="`${i}-divider`"
						/>

						<task-list-item
							:key="`${i}-${task.title}`"
							:task-prop="task"
						/>

					</template>
				</v-slide-y-transition>
			</v-card>

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
	import {defineComponent, computed, PropType, ref} from "@vue/composition-api";
	import TaskListItem from "@/components/Task/TaskListItem.vue";
	import TasksListModel from "@/models/interfaces/TasksListModel";

	export default defineComponent({
		name: "TaskList",
		components: {TaskListItem},

		props: {
			taskListProp: {
				required: true,
				type: Object as PropType<TasksListModel>,
			}
		},
		emits: ['openAddTaskModal'],

		setup(props, {emit}) {

			let items = ref([
				{icon: 'mdi-clipboard-edit-outline', title: 'Edit'},
				{icon: 'mdi-delete-forever', title: 'Delete'}
			]);

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

			return {
				tasksGroup,
				numberCompletedTasks,
				progressOfTasks,
				remainingTasks,
				items
			}
		}
	});

</script>

<style scoped>

</style>