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
					:close-on-content-click="false"
					:nudge-width="200"
					offset-x
					class="edit-task-menu"
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

					<v-card>
						<v-list>
							<v-list-item>
								<v-list-item-avatar>
									<img
										src="https://cdn.vuetifyjs.com/images/john.jpg"
										alt="John"
									>
								</v-list-item-avatar>

								<v-list-item-content>
									<v-list-item-title>"Task name "</v-list-item-title>
									<v-list-item-subtitle>To: Mihail Mihalev</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list>

						<v-divider></v-divider>

						<v-list dense flat>
							<v-list-item id="edit-single-task-button" @click.native="editList">
								<v-list-item-icon>
									<v-icon>mdi-clipboard-edit-outline</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>Edit</v-list-item-title>
								</v-list-item-content>
							</v-list-item>

							<v-divider></v-divider>

							<span class="ml-2"> Room </span>
							<v-list-item id="change-room" @click.native="changeRoom">

								<v-tooltip top>
									<template v-slot:activator="{ on, attrs }">
										<v-list-item-icon>
											<v-icon color="green">mdi-television</v-icon>
										</v-list-item-icon>
									</template>
									<span>Living Room</span>
								</v-tooltip>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon color="yellow">mdi-bed</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon color="purple">mdi-knife</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon color="red">mdi-pizza</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon color="blue">mdi-duck</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon>mdi-dots-vertical</v-icon>
								</v-list-item-icon>

							</v-list-item>

							<v-divider></v-divider>

							<v-list-item id="schedule-single-task-button" @click.native="editList">

								<v-list-item-icon>
									<v-icon>mdi-clock</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>Schedule</v-list-item-title>
								</v-list-item-content>
							</v-list-item>

							<v-divider></v-divider>

							<span class="ml-2"> Priority </span>

							<v-list-item id="change-flag" @click.native="changeFlag">

								<v-list-item-icon>
									<v-icon color="red">mdi-flag</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon color="yellow">mdi-flag</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon color="green">mdi-flag</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon color="purple">mdi-flag</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

								<v-list-item-icon>
									<v-icon color="blue">mdi-flag</v-icon>
								</v-list-item-icon>

								<v-spacer></v-spacer>

							</v-list-item>

							<v-divider></v-divider>

							<v-list-item @click.native="editList">

								<v-list-item-icon>
									<v-icon>mdi-alarm-plus</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>Duplicate</v-list-item-title>
								</v-list-item-content>
							</v-list-item>

							<v-list-item @click.native="editList">

								<v-list-item-icon>
									<v-icon>mdi-delete</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>Delete</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
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

	#change-room, #change-flag {

		.v-list-item__icon {
			margin-right: 2px !important;
			margin-left: 2px !important;
			cursor: pointer !important;
		}
	}
</style>