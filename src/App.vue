<template>
<div>
	<nav-bar v-if="isLogin" @logout="logout"></nav-bar>
	<div class="container-fluid">
		<login-form 
			@login="login" 
			@showRegisterForm="showRegisterForm" 
			v-if="!isRegister && !isLogin"
			@onSignInSuccess="onSignInSuccess"></login-form>
		<register-form
			@register="register" 
			@showRegisterForm="showRegisterForm" 
			v-if="isRegister && !isLogin"></register-form>
		<!-- <login-form @login="login" v-if="!isLogin"></login-form> -->
		<!-- <kanban @login="login" v-else></kanban> -->
		<div v-if="isLogin">
			<kanban-container 
				@getProject="getProject" :projects="projects"
				@getKanban="getKanban" :boards="boards"
				@addCard="addCard" @saveCard="saveCard" :isLoading="isLoading"
				ref="kanbanContainer"></kanban-container>
		</div>
		<loading-icon v-if="isLoading"></loading-icon>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import KanbanContainer from './components/KanbanContainer';
import NavBar from './components/NavBar';
import LoadingIcon from './components/LoadingIcon';

export default {
	name: 'App',
	components: {
		LoginForm,
		RegisterForm,
		NavBar,
		KanbanContainer,
		LoadingIcon
	},
	data () {
		return {
			isLogin: false,
			isRegister: false,
			projects: [],
			boards: [],
			isLoading: false,
			Toast: Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer)
					toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			})
		}
	},
	methods: {
		logout () {
			this.isLoading = true;
			this.isLogin = false;

			let auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(() => {
				localStorage.clear();
				this.isLoading = false;
			})
		},
		login (data) {
			this.isLoading = true;
			axios({
				method: 'POST',
				url: `https://h8-kanban.herokuapp.com/login`,
				data
			})
				.then(({ data }) => {
					localStorage.setItem('token', data.token);
					localStorage.setItem('name', data.name);
					this.isLogin = true;

					this.Toast.fire({
						icon: 'success',
						title: `You Successfully login!`
					})
				})
				.catch(err => {
					this.Toast.fire({
						icon: 'error',
						title: err.response.data[0]
					})
				})
				.finally(this.isLoading = false)
		},
		register (data) {
			this.isLoading = true;
			axios({
				method: 'POST',
				url: `https://h8-kanban.herokuapp.com/register`,
				data
			})
				.then(({ data }) => {
					localStorage.setItem('token', data.token);
					localStorage.setItem('name', data.name);
					this.isLogin = true;

					this.Toast.fire({
						icon: 'success',
						title: `You Successfully login!`
					})
				})
				.catch(err => {
					this.Toast.fire({
						icon: 'error',
						title: err.response.data[0]
					})
				})
				.finally(() => this.isLoading = false);
		},
		showRegisterForm (data) {
			this.isRegister = data
		},
		getProject () {
			if (this.isLogin) {
				this.isLoading = true;
				let token = localStorage.token
				axios({
					method: 'GET',
					url: `https://h8-kanban.herokuapp.com/projects`,
					headers: {
						token
					}
				})
					.then(({data}) => {
						this.projects = data;
					})
					.catch(err => {
						this.Toast.fire({
							icon: 'error',
							title: err.response.data[0]
						})
					})
					.finally(() => {
						this.isLoading = false;
					})
			} else {
				this.isLogin = false;
			}
		},
		getKanban (id) {
			let token = localStorage.getItem('token');
			this.isLoading = true;
			axios({
				method: 'GET',
				url: `https://h8-kanban.herokuapp.com/projects/${id}/kanban`,
				headers: {
					token
				}
			})
				.then(({data}) => {
					this.boards = data
				})
				.catch(err => {
					this.Toast.fire({
						icon: 'error',
						title: err.response.data[0]
					})
				})
				.finally(() => this.isLoading = false)
		},
		addCard (cardObj) {
			let token = localStorage.getItem('token');

			this.isLoading = true;
			axios({
				method: 'POST',
				url: `https://h8-kanban.herokuapp.com/cards`,
				headers: {
					token
				},
				data: cardObj
			})
				.then(response => {
					this.getKanban(cardObj.ProjectId);
					// this.$refs.kanbanContainer.reset(cardObj.status);
					
					this.Toast.fire({
						icon: 'success',
						title: `Card Successfully added!`
					})
				})
				.catch(err => {
					this.Toast.fire({
						icon: 'error',
						title: err.response.data[0]
					})
				})
				.finally(() => this.isLoading = false);
		},
		saveCard (cardObj) {
			let token = localStorage.getItem('token');

			axios({
				method: 'PUT',
				url: `https://h8-kanban.herokuapp.com/cards/${cardObj.id}`,
				headers: {
					token
				},
				data: {
					description: cardObj.description
				}
			})
				.then(response => {
					this.getKanban(cardObj.ProjectId);
					this.$refs.kanbanContainer.closeModal(cardObj.status, cardObj.id);

					this.Toast.fire({
						icon: 'success',
						title: `Card Successfully added!`
					})
				})
				.catch(err => {
					this.Toast.fire({
						icon: 'error',
						title: err.response.data[0]
					})
				})
				.finally(() => this.isLoading = false);
		},
		onSignInSuccess(idToken) {
			this.isLoading = true;
			axios({
				method: 'POST',
				url: 'https://h8-kanban.herokuapp.com/google',
				data: {
					idToken
				}
			})
				.then(result => {
					const { data } = result;
					localStorage.setItem('token', data.token);
					localStorage.setItem('name', data.name)
					this.isLogin = true;

					this.Toast.fire({
						icon: 'success',
						title: `You Successfully login!`
					});
				})
				.catch(err => {
					this.Toast.fire({
						icon: 'error',
						title: err.response
					})
				})
				.finally(() => this.isLoading = false);
		}
	},
	created () {
		if (localStorage.token) this.isLogin = true;
	}
}
</script>

<style>

</style>