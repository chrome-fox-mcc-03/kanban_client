<template>
	<div class="row d-flex justify-content-center">
		<div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; width: 50%">
			<form @submit.prevent="register">
				<div id="login-form" class="row p-4" style="border-radius: 1em">
					<span class="col-12 p-3 text-center" style="font-size: 1.25rem;">ACCOUNT REGISTER</span>
					<div class="col-12 p-3 text-center">
						<input v-model="name" type="text" class="form-control form-control-lg" id="name" placeholder="Name">
					</div>
					<div class="col-12 p-3 text-center">
						<input v-model="email" type="text" class="form-control form-control-lg" id="email" placeholder="Email" autofocus>
					</div>
					<div class="col-12 p-3 text-center">
						<input v-model="password" type="password" class="form-control form-control-lg" id="password" placeholder="Password">
					</div>
					<div class="col-12 p-3 text-center">
						<button type="submit" class="btn btn-green btn-lg btn-block">Register</button>
					</div>
					<div class="col-12 p-3 text-center">
						Already have account? Sign in <a href="#" @click="showRegisterForm">here</a>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Axios from 'axios'
export default {
	name: 'RegisterForm',
	data () {
		return {
			name: '',
			email: '',
			password: ''
		}
	},
	methods: {
		register () {
			console.log(`hit`);
			let obj = {
				name: this.name,
				email: this.email,
				password: this.password
			}
			this.$emit('register', obj)
		},
		showRegisterForm () {
			this.$emit('showRegisterForm', false)
		}
	}
}
</script>

<style>

</style>