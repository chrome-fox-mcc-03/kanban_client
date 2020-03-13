<template>
  	<div class="row d-flex justify-content-center">
		<div class="d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh; width: 50%">
			<form @submit.prevent="login">
				<div id="login-form" class="row p-4" style="border-radius: 1em">
					<span class="col-12 p-3 text-center" style="font-size: 1.25rem;">ACCOUNT LOG IN</span>
					<div class="col-6 p-3 text-center">
						<input v-model="email" type="text" class="form-control form-control-lg" id="email" placeholder="Your Email" autofocus>
					</div>
					<div class="col-6 p-3 text-center">
						<input v-model="password" type="password" class="form-control form-control-lg" id="password" placeholder="Your Password">
					</div>
					<div class="col-12 p-3 text-center">
						<button type="submit" class="btn btn-green btn-lg btn-block">Log In</button>
					</div>
					<div class="col-12 p-3 text-center">
						Don't have account yet? Register <a href="#" @click="showRegisterForm">here</a>
					</div>
					<div class="col-12 p-3 text-center">
						<g-signin-button
							:params="googleSignInParams"
							@success="onSignInSuccess"
							@error="onSignInError">
							Sign in with Google
						</g-signin-button>
					</div>
				</div>
			</form>
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoginForm',
	data () {
		return {
			email: '',
			password: '',
			googleSignInParams: {
				client_id: '560114948677-uhuvajbt4su7qbh850b56g7div00na22.apps.googleusercontent.com'
			}
		}
	},
	methods: {
		login () {
			let obj = {
				email: this.email,
				password: this.password
			};
			this.$emit('login', obj)
		},
		showRegisterForm () {
			this.$emit('showRegisterForm', true)
		},
		onSignInSuccess (googleUser) {
			const idToken = googleUser.getAuthResponse().id_token;
			this.$emit('onSignInSuccess', idToken);
		},
		onSignInError (error) {
			console.log(error);
		}
	}
}
</script>

<style>
.g-signin-button {
	/* This is where you control how the button looks. Be creative! */
	display: inline-block;
	padding: 4px 8px;
	border-radius: 3px;
	background-color: #3c82f7;
	color: #fff;
	box-shadow: 0 3px 0 #0f69ff;
	cursor: pointer;
}
</style>