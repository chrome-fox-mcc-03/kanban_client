<template>
	<div style="padding-top: 4em;">
		<h3>{{ humanizedGreeting }}</h3>
		<div class="jumbotron" v-if="!isLoading && projects.length === 0">
			<h1 class="display-4">Oops!</h1>
			<p class="lead">You don't have any project yet!</p>
			<hr class="my-4">
			<p>Click this button to add a project.</p>
			<p class="lead">
				<a class="btn btn-primary btn-lg" href="#" role="button" @click="toggleProjectModal">Add New Project</a>
			</p>
		</div>
		<div class="d-flex justify-content-between pb-2">
			<project-container v-if="!isLoading && projects.length > 0"
				class="pb-3"
				:projects="projects"
				@getKanban="getKanban">
			</project-container>
			<div v-if="projects.length > 0">
				<a class="btn btn-green" href="#" role="button" @click="toggleProjectModal">Add New Project</a>
			</div>
		</div>
		
		<div class="row" v-if="!isLoading && projects.length > 0">
			<board-container v-for="(board,i) in boards" :key="i" :cards="board" :categoryName="i"
				@addCard="addCard" @saveCard="saveCard" @getKanban="refreshKanban"
				:ref="`boardContainer-${i}`"></board-container>
		</div>
		<transition name="modal" v-if="showModal">
			<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container col-12 col-md-6">
					<div class="modal-header" style="position: relative">
						<slot name="header">
							Create New Project
						</slot>
						<span style="position: absolute; right: 10px; top: 2px; cursor: pointer" @click="toggleProjectModal">X</span>
					</div>

					<div class="modal-body">
						<slot name="body">
							<form id="projectForm" @submit.prevent="addProject">
								<div class="form-group">
									<label for="name">Name</label>
									<input v-model="projectObj.name" id="name" type="text" class="form-control" autofocus>
								</div>
								<div class="form-group">
									<label for="name">Description</label>
									<textarea v-model="projectObj.description" class="form-control" name="description" id="" rows="2"></textarea>
								</div>
							</form>
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
						<button form="projectForm" type="submit" class="btn btn-green">Save</button>
						</slot>
					</div>
				</div>
			</div>
			</div>
		</transition>
		<loading-icon v-if="isPullingDB"></loading-icon>
	</div>
</template>

<script>
import ProjectContainer from './ProjectContainer';
import BoardContainer from './BoardContainer';
import LoadingIcon from './LoadingIcon';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';

export default {
	name: 'KanbanContainer',
	components: {
		ProjectContainer,
		BoardContainer,
		LoadingIcon
	},
	props: [ 'projects', 'boards', 'isLoading' ],
	data () {
		return {
			projectId: '',
			humanizedGreeting: "Good " + this.getGreetingTime(moment()) + ", " + localStorage.getItem('name'),
			showModal: false,
			projectObj: {
				name: '',
				description: ''
			},
			isPullingDB: false,
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
		getKanban (id) {
			this.projectId = id;
			this.$emit('getKanban', id);
		},
		refreshKanban (id) {
			this.$emit('getKanban', this.projectId);
		},
		reset (boardId) {
			// console.log(id);
			// this.$refs.boardContainer.forEach(el => el.resetForm());
			let idRef = `boardContainer-${boardId}`;
			
			this.$refs[idRef][0].resetForm();
		},
		closeModal (boardId, id) {
			// this.$refs.boardContainer.forEach(el => el.closeModal(id));
			let idRef = `boardContainer-${boardId}`;
			
			this.$refs[idRef][0].closeModal(id);
		},
		addCard (cardObj) {
			cardObj.ProjectId = this.projectId
			this.$emit('addCard', cardObj);
		},
		saveCard (cardObj) {
			cardObj.ProjectId = this.projectId
			this.$emit('saveCard', cardObj);
		},
		getGreetingTime (m) {
			let g = null; //return g
			
			if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
			
			let split_afternoon = 12 //24hr time to split the afternoon
			let split_evening = 17 //24hr time to split the evening
			let currentHour = parseFloat(m.format("HH"));
			
			if(currentHour >= split_afternoon && currentHour <= split_evening) {
				g = "afternoon";
			} else if(currentHour >= split_evening) {
				g = "evening";
			} else {
				g = "morning";
			}
			
			return g;
		},
		addProject () {
			let token = localStorage.getItem('token');
			this.isPullingDB = true;
			axios({
				method: 'POST',
				url: 'https://h8-kanban.herokuapp.com/projects',
				headers: {
					token
				},
				data: {
					name: this.projectObj.name,
					description: this.projectObj.description
				}
			})
				.then(response => {
					this.toggleProjectModal();
					this.$emit('getProject');
					this.projectObj.name = '';
					this.projectObj.description = '';

					this.Toast.fire({
						icon: 'success',
						title: `Project Successfully added!`
					})
				})
				.catch(err => {
					this.Toast.fire({
						icon: 'error',
						title: err.response.data[0]
					})
				})
				.finally(() => this.isPullingDB = false);
		},
		toggleProjectModal () {
			this.showModal = !this.showModal;
		}
	},
	created () {
		// console.log(this)
		this.$emit('getProject');
	}
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>