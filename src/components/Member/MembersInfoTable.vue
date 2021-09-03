<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
	<v-data-table
		:headers="headers"
		:items="members"
		sort-by="role.id"
		class="elevation-1"
	>
		<template v-slot:item.role="{ item }">
			<v-chip
				:color="getColor(item.role.id)"
				dark
			>
				{{ item.role.name }}
			</v-chip>
		</template>

		<template v-slot:top>
			<v-toolbar
				flat
			>
				<v-toolbar-title>MEMBERS</v-toolbar-title>
				<v-divider
					class="mx-4"
					inset
					vertical
				></v-divider>
				<v-spacer></v-spacer>
				<v-dialog
					v-model="dialog"
					max-width="500px"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							color="primary"
							dark
							class="mb-2"
							v-bind="attrs"
							v-on="on"
						>
							New Member
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="text-h5">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col
										cols="12"
										sm="6"
										md="12"
									>
										<v-text-field
											v-model="editedMember.name"
											label="Name"
										></v-text-field>
									</v-col>

									<v-col
										cols="12"
										sm="6"
										md="12"
									>
										<v-text-field
											v-model="editedMember.email"
											label="Email"
										></v-text-field>
									</v-col>

									<v-col
										cols="12"
										sm="6"
										md="12"
									>
										<v-text-field
											v-model="editedMember.role.id"
											label="Role"
										></v-text-field>
									</v-col>

								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="blue darken-1"
								text
								@click="close"
							>
								Cancel
							</v-btn>
							<v-btn
								color="blue darken-1"
								text
								@click="save"
							>
								Save
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="text-h5">Are you sure you want to delete this member?</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
							<v-btn color="blue darken-1" text @click="deleteMemberConfirm">OK</v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:member.actions="{ member }">
			<v-icon
				small
				class="mr-2"
				@click="editMember(member)"
			>
				mdi-pencil
			</v-icon>
			<v-icon
				small
				@click="deleteMember(member)"
			>
				mdi-delete
			</v-icon>
		</template>
		<template v-slot:no-data>
			<v-btn
				color="primary"
				@click="initialize"
			>
				Reset
			</v-btn>
		</template>
	</v-data-table>
</template>

<script lang="ts">
	import { defineComponent, computed, ref, onMounted, watch, nextTick } from "@vue/composition-api";
	import UserService from "@/services/users.services"
	import MemberModel from "@/models/interfaces/MemberModel";

	export default defineComponent({
		name: "MembersInfoTable",

		setup() {

			let dialog = ref(false);
			let dialogDelete = ref(false);
			let headers = ref([
				{ text: 'Name', align: 'start', sortable: false, value: 'name', },
				{ text: 'Role', value: 'role', sortable: false },
				{ text: 'Email', value: 'email' },
				{ text: 'Actions', value: 'actions', sortable: false },
			]);

			let members = ref<MemberModel[]>([]);
			let editedIndex = ref(-1);

			let editedMember = ref({
				name: '',
				role: 0,
				email: '',
			});

			let defaultMember = ref({
				name: '',
				role: 0,
				email: '',
			});

			let formTitle = computed(() => editedIndex.value === -1 ? 'New Member' : 'Edit Member');

			watch(dialog, (newValue) => newValue || close());
			watch(dialogDelete, (newValue) => newValue || closeDelete());

			const fetchAllUsers = (async () => {

				members.value = await UserService.getAllUsers();

				return;
			});

			const initialize = (async () => {

					await fetchAllUsers();
				}
			);

			onMounted(() => {
				initialize();
			});

			const editMember = ((member: MemberModel) => {

					editedIndex.value = members.value.indexOf(member);
					editedMember.value = Object.assign({}, member);
					dialog.value = true;
				}
			);

			const deleteMember = ((member: MemberModel) => {

					editedIndex.value = members.value.indexOf(member);
					editedMember.value = Object.assign({}, member);
					dialogDelete.value = true;
				}
			);

			const deleteMemberConfirm = (() => {

					members.value.splice(editedIndex.value, 1);
					closeDelete();
				}
			);

			const close = (() => {

				dialog.value = false;

				nextTick(() => {
					editedMember.value = Object.assign({}, defaultMember.value)
					editedIndex.value = -1
				})
			});

			const closeDelete = (() => {

				dialogDelete.value = false;

				nextTick(() => {
					editedMember.value = Object.assign({}, defaultMember.value);
					editedIndex.value = -1;
				})
			});

			const save = (() => {

				if (editedIndex.value > -1) {

					Object.assign(members.value[editedIndex.value], editedMember.value);
					close();
					return;
				}

				members.value.push(editedMember.value);
				close();
			});

			const getColor = ((role: any) => {

				if (role == 3) {

					return 'blue'
				} else if (role == 2) {

					return 'orange'
				}

				return 'green'
			});

			return {
				dialog,
				dialogDelete,
				headers,
				members,
				editedIndex,
				editedMember,
				defaultMember,
				formTitle,
				initialize,
				editMember,
				deleteMember,
				deleteMemberConfirm,
				close,
				closeDelete,
				save,
				getColor
			}
		}
	});

</script>

<style lang="scss" scoped>

</style>