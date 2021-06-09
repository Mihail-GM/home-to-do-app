<template>
	<div>
		<v-list-item>

			<v-list-item-action>

				<v-checkbox
					v-model="taskProp.done"
					:color="taskProp.done && 'grey' || 'primary'"
					id="done-checkbox"
				>
					<template v-slot:label>
						<div
							:class="taskProp.done && 'grey--text' || 'primary--text'"
							class="ml-4"
							v-text="taskProp.title"
						>

						</div>
					</template>
				</v-checkbox>
			</v-list-item-action>

			<v-spacer></v-spacer>

			<v-scroll-x-transition>
				<v-icon
					v-if="taskProp.done"
					color="success"
				>
					mdi-check
				</v-icon>
			</v-scroll-x-transition>

			<v-spacer></v-spacer>

			<a :href="taskProp.url"> show details </a>

		</v-list-item>
	</div>
</template>

<script lang="ts">
	import {defineComponent, ref, computed, PropType} from "@vue/composition-api";
	import TasksModel from "@/models/interfaces/TasksModel"

	export default defineComponent({
		name: "TaskListItem",
		props: {
			taskProp: {
				required: true,
				type: Object as PropType<TasksModel>,
			}
		},

		setup(props) {

			const task = computed(() => props.taskProp);

			return {
				task
			}
		}
	});

</script>

<style scoped>

</style>