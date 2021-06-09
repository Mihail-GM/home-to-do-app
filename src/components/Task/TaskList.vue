<template>
	<div>
		<v-container style="max-width: 500px">

			<h2 class="display-1 success--text pl-4">
				Tasks:&nbsp;
				<v-fade-transition leave-absolute>
					<span :key="`tasks-${tasks.length}`">
					  {{ tasks.length }}
					</span>
				</v-fade-transition>
			</h2>

			<v-divider class="mt-4"></v-divider>

			<v-row
				class="my-1"
				align="center"
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

			<v-card v-if="tasks.length > 0">
				<v-slide-y-transition
					class="py-0"
					group

				>
					<template v-for="(task, i) in tasks">
						<v-divider
							v-if="i !== 0"
							:key="`${i}-divider`"
						></v-divider>

						<task-list-item :key="`${i}-${task.title}`" :task-prop="task"></task-list-item>

					</template>
				</v-slide-y-transition>
			</v-card>

		</v-container>
	</div>
</template>

<script lang="ts">
	import {defineComponent, ref, computed} from "@vue/composition-api";
	import TaskListItem from "@/components/Task/TaskListItem.vue";
	import TasksModel from "@/models/interfaces/TasksModel"

	export default defineComponent({
		name: "TaskList",
		components: {TaskListItem},
		setup() {

			const tasks = ref<TasksModel[]>([
				{done: false, title: 'test', url: 'test'},
				{done: false, title: "test", url: 'test'},
				{done: true, title: "check", url: 'test'},
			]);

			const numberCompletedTasks = computed(() => {
				return tasks.value.filter(task => task.done).length;
			});

			const progressOfTasks = computed(() => {
				return numberCompletedTasks.value / tasks.value.length * 100;
			});

			const remainingTasks = computed(() => {
				return tasks.value.length - numberCompletedTasks.value;
			});

			return {
				tasks,
				numberCompletedTasks,
				progressOfTasks,
				remainingTasks
			}
		}
	});

</script>

<style scoped>

</style>