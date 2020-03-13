<template>
  <section id="kanban-board" >
      <div class="nav-container">
                <img class="backbtn" @click.prevent="changePage('dashboard-home')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1588978741582004484-256.png" alt="">
                <div class="container">
                    <div class="row">
                            <h2 class="display-6 col col-10">{{title}}</h2>
                    </div>
                </div> 
                <img class="addbtn" @click.prevent="showSetting('kanban-new')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12817025351582004496-256.png" alt="">
                <button class="btn btn-danger" @click.prevent="showSureDeleteBoard" v-show="!deleteConfirm">Delete Board</button>
                <button class="btn btn-danger" @click.prevent="deleteBoard" v-show="deleteConfirm" >click to confirm</button>
        </div>
        <div class="kanban-detail" v-show="show === 'kanban-detail'">
                    <img  @click.prevent="showSetting('')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12355707351582004488-256.png" alt="" class="close">
                    <h1 v-show="!editName" @click.prevent="editName = !editName" >{{cardDetail.title}}</h1>
                    <input type="text" v-show="editName" v-model="cardDetail.title" v-on:blur="editCardTitle">
                    <p>created by</p>
                    <div class="row">
                        <img class="col-4" src="https://www.wretched.org/wp-content/uploads/2017/09/Anon-profile.png" alt="" >
                        <div class="col-8">
                            <p>{{parsedCreatedDate}}</p>
                            <p class="name">{{cardDetail.User.name}}</p>
                        </div>
                    </div>
                    <div class="due-date">
                        <p>Due date: </p>
                        <div>
                            <date-pick v-model="parsedDueDate"></date-pick>
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
                            <input type="date" class="form-control" id="add-kanban-due-date" placeholder="Due Date" v-model="newCard.due_date" >
                        </div>
                        <button type="button" class="bottom-icon addbtn"><img @click.prevent="addNewCard" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12817025351582004496-256.png" alt="" > </button>
                    </form>  
                </div>
        <div class="kanban-content" @click.prevent="resetAll">
            <div class="row" >
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
            editDesc: false,
            deleteConfirm: false
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
        },
        showSureDeleteBoard(){
            this.deleteConfirm = true
        },
        deleteBoard(){
            this.deleteConfirm = false
            this.$emit('deleteThisBoard')
        },
        resetAll(){
            this.deleteConfirm = false;
            this.showSetting('')
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
    },
    computed: {
        parsedCreatedDate(){
            const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            return new Date(this.cardDetail.createdAt).getUTCDate()
                + ' ' + months[new Date(this.cardDetail.createdAt).getUTCMonth()]
                + ' ' + new Date(this.cardDetail.createdAt).getUTCFullYear()
        },
        parsedDueDate: {
            get() {
                return new Date(this.cardDetail.due_date).getUTCFullYear()
                + '-' + (new Date(this.cardDetail.due_date).getUTCMonth() + 1)
                + '-' + new Date(this.cardDetail.due_date).getUTCDate() 
            },
            set(value){
                this.cardDetail.due_date = value
            }
        }
    }
}
</script>

<style>
.due-date {
    margin-bottom: 2vh
}
.btn-danger{
    margin-left: 2vw;
    padding: 2px;
    font-size: 10px
}
.kanban-content {
    cursor:default;
}
.addbtn:hover{
    transform: rotate(45deg)
}
.addbtn{
    transition: transform 0.4s ease;
}
.backbtn:hover{
    transform: skewX(15deg)
}
.backbtn{
    transition: transform 0.4s ease;
}
</style>