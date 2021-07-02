<template>
	<div class="my-5">
		<v-card class="mx-auto"
		        elevation="5"
		>

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
			</v-list-item>
		</v-card>
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

<style lang="scss" scoped>

</style>