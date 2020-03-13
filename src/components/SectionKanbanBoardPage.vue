<template>
  <section id="kanban-board">
      <div class="nav-container">
                <img @click.prevent="changePage('dashboard-home')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1588978741582004484-256.png" alt="">
                <div class="container">
                    <div class="row">
                            <h2 class="display-6 col col-10">{{title}}</h2>
                    </div>
                </div> 
                <img @click.prevent="showSetting('kanban-new')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12817025351582004496-256.png" alt="">
        </div>
        <div class="kanban-detail" v-show="show === 'kanban-detail'">
                    <img  @click.prevent="showSetting('')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12355707351582004488-256.png" alt="" class="close">
                    <h1 v-show="!editName" @click.prevent="editName = !editName" >{{cardDetail.title}}</h1>
                    <input type="text" v-show="editName" v-model="cardDetail.title" v-on:blur="editCardTitle">
                    <p>created by</p>
                    <div class="row">
                        <img class="col-4" src="https://www.wretched.org/wp-content/uploads/2017/09/Anon-profile.png" alt="" >
                        <div class="col-8">
                            <p>{{cardDetail.createdAt}}</p>
                            <p class="name">{{cardDetail.User.name}}</p>
                        </div>
                    </div>
                    <div class="row due-date">
                        <p class="col-4">Due date: </p>
                        <div class="col-8">
                            <date-pick v-model="cardDetail.due_date"></date-pick>
                        </div>
                    </div>
                    <p>Description: </p>
                    <p class="detail-desc" v-show="!editDesc" @click.prevent="editDesc = !editDesc">{{cardDetail.description}}</p>
                    <textarea rows="60" cols="25" v-show="editDesc" v-model="cardDetail.description" v-on:blur="editCardDesc"></textarea>
                    <img  @click.prevent="deleteCard"  src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/14458160321582004493-256.png" class="bottom-icon" alt="">
                </div>
                <div class="kanban-new" v-show="show === 'kanban-new'">
                    <img @click.prevent="showSetting('')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12355707351582004488-256.png" alt="" class="close">
                    <h1>New Card</h1>
                    <form>
                        <div class="form-group">
                            <input type="text" v-model="newCard.title" class="form-control" id="add-kanban-name" placeholder="Title">
                            </div>
                            <div class="form-group">
                            <textarea type="text" id="add-kanban-desc" placeholder="Description" v-model="newCard.description">
                            </textarea>
                        <div class="form-group">
                            <p>Select due date</p>
                            <input type="date" class="form-control" id="add-kanban-due-date" placeholder="Due Date" v-model="newCard.due_date">
                        </div>
                        <button type="button" class="bottom-icon"><img @click.prevent="addNewCard" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12817025351582004496-256.png" alt="" > </button>
                    </form>  
                </div>
        <div class="kanban-content">
            <div class="row">
                <task-container class="col col-3" :title="'Backlog'" :cards="tasks.backlog" @editCard="editCard" @moveLeft="moveLeft" @moveRight="moveRight"></task-container>
                <task-container class="col col-3" :title="'Todo'" :cards="tasks.todo" @editCard="editCard"  @moveLeft="moveLeft" @moveRight="moveRight"></task-container>
                <task-container class="col col-3" :title="'On Going'" :cards="tasks.ongoing" @editCard="editCard"  @moveLeft="moveLeft" @moveRight="moveRight"></task-container>
                <task-container class="col col-3" :title="'Done'" :cards="tasks.done" @editCard="editCard"  @moveLeft="moveLeft" @moveRight="moveRight"></task-container>
            </div>
        </div>
  </section>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import TaskContainer from './TaskContainer'
export default {
    data: () => {
        return {
            show: '',
            newCard: {
                title: '',
                description:'',
                due_date: ''
            },
            cardDetail: {
                title: '',
                description: '',
                due_date: '',
                id: null,
                createdAt: '',
                creator_id: '',
                User: {

                }
            },
            editName: false,
            editDesc: false
        }
    },
    props: {
        title: String,
        tasks: Object
    },
    methods: {
        changePage(page){
            this.$emit('page', page)
        },
        showSetting(page){
            this.show = page
        },
        addNewCard() {
            const cardEmit = this.newCard
            this.$emit('addNewCard', cardEmit)
            this.show = ''
            for(const key in this.newCard) this.newCard[key] = ''
        },
        editCard(card){
            console.log(card)
            this.show = 'kanban-detail'
            this.cardDetail = card
        },
        editCardDesc(){
            this.editDesc = !this.editDesc
            this.$emit('editDescription', {
                description: this.cardDetail.description,
                id: this.cardDetail.id})
        },
        editCardTitle(){
            this.editTitle = !this.editTitle
            this.$emit('editName', {
                title: this.cardDetail.title,
                id: this.cardDetail.id})
        },
        editCardDueDate(){
            this.editDueDate = !this.editDueDate
            this.$emit('editDueDate', {
                due_date: this.cardDetail.due_date,
                id: this.cardDetail.id})
        },
        moveLeft(card){
            this.$emit('moveLeft', card)
        },
        moveRight(card){
            this.$emit('moveRight', card)
        },
        deleteCard(){
            this.show = ''
            this.$emit('deleteCard', this.cardDetail.id)
        }
        
    },
    components: {
        TaskContainer,
        DatePick
    },
    watch: {
        'cardDetail.due_date': function(){
            this.editCardDueDate()
        }
    }
}
</script>

<style>

</style>