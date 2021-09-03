<template>
	<form>
		<v-text-field
			v-model="email"
			:error-messages="emailErrors"
			label="E-mail"
			required
			@input="$v.email.$touch()"
			@blur="$v.email.$touch()"
		/>

		<v-text-field
			v-model="password"
			:error-messages="passwordErrors"
			@input="$v.password.$touch()"
			@blur="$v.password.$touch()"
			required
			:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
			:type="show1 ? 'text' : 'password'"
			name="input-10-1"
			label="Password"
			hint="At least 8 characters"
			counter
			@click:append="show1 = !show1"
		/>

		<v-checkbox
			v-model="checkbox"
			:error-messages="checkboxErrors"
			label="Do you agree?"
			required
			@change="$v.checkbox.$touch()"
			@blur="$v.checkbox.$touch()"
		/>

		<v-btn
			class="mr-4"
			@click="submit"
		>
			submit
		</v-btn>

		<v-btn @click="clear">
			clear
		</v-btn>
	</form>
</template>

<script>
	import {validationMixin} from 'vuelidate'
	import {required, maxLength, email, minLength} from 'vuelidate/lib/validators'
	import UserService from '@/services/users.services'

	export default {
		mixins: [validationMixin],

		validations: {
			name: {required, maxLength: maxLength(10)},
			email: {required, email},
			password: {required, minLength: minLength(8)},
			select: {required},
			checkbox: {
				checked(val) {
					return val
				},
			},
		},

		data: () => ({
			show1: false,
			name: '',
			email: '',
			password: '',
			select: null,
			items: [
				'Item 1',
				'Item 2',
				'Item 3',
				'Item 4',
			],
			checkbox: false,
		}),

		computed: {

			checkboxErrors() {

				const errors = []
				if (!this.$v.checkbox.$dirty) return errors
				!this.$v.checkbox.checked && errors.push('You must agree to continue!')
				return errors
			},

			selectErrors() {

				const errors = []
				if (!this.$v.select.$dirty) return errors
				!this.$v.select.required && errors.push('Item is required')
				return errors
			},

			nameErrors() {

				const errors = []
				if (!this.$v.name.$dirty) return errors
				!this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
				!this.$v.name.required && errors.push('Name is required.')
				return errors
			},

			passwordErrors() {

				const errors = []
				if (!this.$v.password.$dirty) return errors
				!this.$v.password.minLength && errors.push('Password must be min 8 characters long')
				!this.$v.password.required && errors.push('Password is required.')
				return errors
			},

			emailErrors() {

				const errors = []
				if (!this.$v.email.$dirty) return errors
				!this.$v.email.email && errors.push('Must be valid e-mail')
				!this.$v.email.required && errors.push('E-mail is required')
				return errors
			},
		},

		methods: {

			submit() {

				UserService.register({email: this.email, password: this.password});
				this.$v.$touch()
			},

			clear() {

				this.$v.$reset()
				this.name = ''
				this.email = ''
				this.select = null
				this.checkbox = false
			},
		},
	}

</script>

<style lang="scss" scoped>

</style>