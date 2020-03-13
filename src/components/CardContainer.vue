<template>
<div>
	<div class="card text-wrap mb-2" style="background: #effcef">
		<div class="card-body" style="position: relative;">
			<span style="position: absolute; right: 10px; top: 2px; cursor: pointer" @click="confirmDelete">X</span>
			<blockquote class="blockquote mb-0" style="font-size: 1rem;">
				<p>{{ card.description }}</p>
				<footer class="blockquote-footer">{{ card.User.name }}</footer>
			</blockquote>
			<a href="#" class="card-link" @click="toggleCardModal">Edit</a>
			<a href="#" class="card-link" @click="toggleSelectCategory">Move</a>
			<select v-model="selected" v-if="selectCategory">
				<option disabled value="">Category</option>
				<option value="Backlog">Backlog</option>
				<option value="Product">Product</option>
				<option value="Development">Development</option>
				<option value="Done">Done</option>
			</select>
		</div>
	</div>
	<transition name="modal" v-if="showModal">
		<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container col-12 col-md-6" v-if="modalType === 'update'">
				<div class="modal-header" style="position:relative">
					<slot name="header">
					Update Card
					</slot>
					<span style="position: absolute; right: 10px; top: 2px; cursor: pointer" @click="closeModal">X</span>
				</div>

				<div class="modal-body">
					<slot name="body">
						<form id="cardForm" @submit.prevent="save">
							<div class="form-group">
								<label for="description">description</label>
								<input v-model="cardObj.description" id="description" type="text" class="form-control" autofocus>
							</div>
						</form>
					</slot>
				</div>

				<div class="modal-footer">
					<slot name="footer">
					<button form="cardForm" type="submit" class="btn btn-green">Save</button>
					</slot>
				</div>
			</div>
			<div class="modal-container col-12 col-md-6" v-if="modalType === 'confirm'">
				<div class="modal-header" style="position:relative">
					<slot name="header">
					Heads Up!
					</slot>
					<span style="position: absolute; right: 10px; top: 2px; cursor: pointer" @click="closeModal">X</span>
				</div>

				<div class="modal-body">
					<slot name="body">
						You are about to delete this card, Are you sure?
					</slot>
				</div>

				<div class="modal-footer">
					<slot name="footer">
					<button form="cardForm" type="submit" class="btn btn-green" @click="deleteCard">Yes</button>
					<button form="cardForm" type="submit" class="btn btn-danger" @click="closeModal">No</button>
					</slot>
				</div>
			</div>
		</div>
		</div>
	</transition>
	<loading-icon v-if="isLoading"></loading-icon>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import LoadingIcon from './LoadingIcon';
export default {
	name: 'CardContainer',
	components: {
		LoadingIcon
	},
	data () {
		return {
			cardModal: false,
			selectCategory: false,
			selected: '',
			cardObj: {
				id: '',
				description: ''
			},
			showModal: false,
			modalType: '',
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
	props: [ 'card' ],
	methods: {
		confirmDelete () {
			this.showModal = true;
			this.modalType = 'confirm';
		},
		toggleCardModal () {
			this.cardObj.id = this.card.id;
			this.cardObj.description = this.card.description;
			this.cardModal = !this.cardModal;
			this.showModal = !this.showModal;
			this.modalType = 'update'
		},
		closeModal () {
			this.toggleCardModal();
		},
		save () {
			this.$emit('saveCard', this.cardObj)
		},
		deleteCard () {
			let token = localStorage.getItem('token');
			this.isLoading = true;
			// setTimeout(() => {
			// 	this.isLoading = false;
			// }, 3000);
			axios({
				method: 'DELETE',
				url: `https://h8-kanban.herokuapp.com/cards/${this.card.id}`,
				headers: {
					token
				}
			})
				.then(result => {
					// this.isLoading = false
					this.$emit('getKanban');
					this.Toast.fire({
						icon: 'success',
						title: `Card Successfuly deleted!`
					})
				})
				.catch(err => {
					// this.isLoading = false
					this.Toast.fire({
						icon: 'error',
						title: err.response.data[0]
					})
				})
		
				.finally(() => {
					this.showModal = false;
					this.isLoading = false;
				})
		},
		toggleSelectCategory () {
			this.selectCategory = !this.selectCategory;
		},
		changeStatus (status) {
			let token = localStorage.getItem('token');
			this.isLoading = true;
			axios({
				method: 'PUT',
				url: `https://h8-kanban.herokuapp.com/cards/${this.card.id}/${status}`,
				headers: {
					token
				}
			})
				.then(response => {
					this.$emit('getKanban');
					this.toggleSelectCategory();
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
		}
	},
	watch: {
		selected: function () {
			this.changeStatus(this.selected);
		}
	}
}
</script>

<style scoped>

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