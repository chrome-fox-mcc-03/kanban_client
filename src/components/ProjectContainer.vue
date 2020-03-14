<template>
	<div>
		<span>Select To Open Your Project Kanban</span>
		<select v-model="selected" id="">
			<option disabled value="">Your Project</option>
			<option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
		</select>
		<select v-model="selectedUser" v-if="this.selected !== ''">
			<option disabled value="">Choose User</option>
			<option v-for="(user, i) in users" :key="i" :value="user.id">{{ user.name }}</option>
		</select>
		<button class="btn btn-green" @click="invite" v-if="this.selected !== ''">Invite</button>
		<loading-icon v-if="isloading"></loading-icon>
	</div>
</template>

<script>
import Swal from 'sweetalert2';
import Axios from 'axios';
import LoadingIcon from './LoadingIcon';
export default {
	name: 'ProjectContainer',
	components: {
		LoadingIcon
	},
	data () {
		return {
			selected: '',
			selectedUser: '',
			users: [],
			isloading: false,
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
	props: [ 'projects' ],
	methods: {
		invite () {
			let token = localStorage.getItem('token');
			this.isloading = true;
			Axios({
				method: 'POST',
				url: `https://h8-kanban.herokuapp.com/projects/${this.selected}/participants/${this.selectedUser}`,
				headers: {
					token
				},
				data: {
					email: this.email
				}
			})
				.then(response => {
					const { data } = response;
					
					this.Toast.fire({
						icon: 'success',
						title: `User Successfuly invited!`
					})
				})
				.catch(err => {
					this.Toast.fire({
						icon: 'error',
						title: err.response.data[0]
					})
				})
				.finally(() => this.isloading = false);
		}
	},
	watch: {
		selected: function () {
			this.$emit('getKanban', this.selected);
		}
	},
	created () {
		let token = localStorage.getItem('token');
		Axios({
			method: 'GET',
			url: 'https://h8-kanban.herokuapp.com/users',
			headers: { token }
		})
			.then(response => {
				const { data } = response;
				this.users = data
			})
			.catch(err => {
				this.Toast.fire({
					icon: 'error',
					title: err.response.data[0]
				})
			})
			.finally(() => this.isloading = false);
	}
}
</script>

<style>

</style>