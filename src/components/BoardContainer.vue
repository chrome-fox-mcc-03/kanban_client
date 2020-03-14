<template>
	<div id="card-container" class="d-flex justify-content-start col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mb-3" style="min-height: 75vh">
		<div class="d-flex flex-column rounded p-3" style="background: #ccedd2; width:100%">
			<div class="pb-3" style="position: relative">
				<span style="font-size: 1.3rem">
					{{ categoryName }}
				</span>
				<button type="submit" class="btn btn-green" style="position:absolute; right: 0; top: 0"
					@click="toggleCardModal">Add a Card</button>
			</div>
			<div>
				<div class="overflow-auto" style="max-height: 65vh">
					<card-container v-for="(card, index) in cards" :key="index" :card="card"
						@saveCard="saveCard" @getKanban="getKanban"
						:ref="`cardContainer-${card.id}`"></card-container>
					<form class="mb-3">
						<textarea class="form-control" id="text-area" rows="2" placeholder="Add a Card" 
							@keydown.enter.exact.prevent="addCard"
							v-model="cardObj.description"></textarea>
					</form>
				</div>
			</div>
		</div>

		<transition name="modal" v-if="showModal">
			<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container col-12 col-md-6">
					<div class="modal-header" style="position: relative">
						<slot name="header">
						New Card
						</slot>
						<span style="position: absolute; right: 10px; top: 2px; cursor: pointer" @click="toggleCardModal">X</span>
					</div>

					<div class="modal-body">
						<slot name="body">
							<form id="cardForm" @submit.prevent="addCard">
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
						<!-- <button class="modal-default-button" @click="save">
							Save
						</button> -->
						</slot>
					</div>
				</div>
			</div>
			</div>
		</transition>
	</div>
</template>

<script>
import CardContainer from './CardContainer';

export default {
	name: 'KanbanBoard',
	components: {
		CardContainer
	},
	data () {
		return {
			cardObj: {
				description: '',
				status: this.categoryName
			},
			showModal: false
		}
	},
	props: [ 'cards', 'categoryName' ],
	methods: {
		addCard () {
			this.showModal = false;
			this.$emit('addCard', this.cardObj);
		},
		resetForm () {
			this.cardObj.description = ''
		},
		closeModal (id) {
			let cardId = `cardContainer-${id}`;
			this.$refs[cardId][0].closeModal();
		},
		saveCard (cardObj) {
			cardObj.status = this.cardObj.status;
			this.$emit('saveCard', cardObj);
		},
		getKanban () {
			this.$emit('getKanban');
		},
		toggleSelectCategory () {
			this.selectCategory = !this.selectCategory;
		},
		toggleCardModal () {
			this.showModal = !this.showModal
		}
	}
}
</script>

<style scoped>
#text-area:focus {
	box-shadow: none;
}
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