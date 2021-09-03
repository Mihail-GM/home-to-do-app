<template>
	<div>
		<MembersInfoTable/>
	</div>
</template>

<script lang="ts">
	import {defineComponent} from "@vue/composition-api";
	import MembersInfoTable from "@/components/Member/MembersInfoTable.vue";

	export default defineComponent({
		name: "Tasks",
		components: {
			MembersInfoTable
		},

		setup() {
		}
	});

</script>

<style lang="scss" scoped>

</style>