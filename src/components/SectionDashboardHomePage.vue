<template>
  <section id="dashboard-home">
       <div class="profile-option shadow" v-show="this.show === 'profile-option'">
                <img  @click.prevent="showSetting('')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12355707351582004488-256.png" alt="">
                <h2 class="display-6 menu">Help</h2>
                <h2  @click.prevent="logMeOut" class="display-6 menu">Sign Out</h2>
            </div>
            <div class="nav-container shadow">
                <ul class="nav justify-content-between align-items-center" id="nav-landing">
                    <li class="nav-item">
                        <h2 class="display-6">K a n b a n K u y</h2>
                    </li>
                    <li class="nav-item">
                        <img class="prof-pic" @click.prevent="showSetting('profile-option')" src="https://www.wretched.org/wp-content/uploads/2017/09/Anon-profile.png" alt="">
                    </li>
                </ul>
            </div>
            <div class="dashboard-container"  @click.prevent="showSetting('')">
                <div class="dashboard-navigator">
                    <form class="form-inline">
                        <input class="form-control" type="search" placeholder="Search Board">
                        <button class="btn" type="submit"><img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/2072119491582004497-256.png" alt=""></button>
                    </form>
                    <p @click.prevent="showAddBoard">New Board</p>
                    <transition name="fade">
                        <form class="add-board" v-show="showAdd === true" >
                            <input type="text" placeholder="title" v-model="newBoard.title">
                            <input type="number" placeholder="choose background" min="0" max="7" v-model="newBoard.BG">
                            <h2 class="members" v-for="(member, i) in memberNames" :key="i">{{member}}</h2>
                            <input type="text" placeholder="+member" v-model="currentMember"  @keydown.enter.prevent="addMember">
                            <input type="submit" value="Add" class="btnsbmt" @click.prevent="addBoard">
                            <button type="button" @click.prevent="hideAdd" @keydown.enter.prevent>Cancel</button>
                        </form>
                    </transition>                    
                </div>
                <div class="dashboard-content">
                    <div class="your-kanban-board">
                        <h2 class="display-6">Your Kanban Board</h2>
                        <div class="your-kanban-board-container row" >
                            <kanban-thumbnail class="kanban-thumbnail"  v-for="board in yourBoards" :key="board.id" :boardId="board.id" :title="board.title" :bgUrl="board.background_id" @showBoard="showBoard"></kanban-thumbnail>
                            <h3 class="display-2" v-if="!yourBoards[0]" style="font-size: 16px; color: gray; margin-left:4vw;">Your board is empty. Create new board now!</h3>
                        </div>
                    </div>
                    <div class="your-kanban-board shared-kanban">
                        <h2 class="display-6">Shared Kanban Board</h2>
                        <div class="your-kanban-board-container row">
                            <kanban-thumbnail class="kanban-thumbnail" v-for="board in sharedBoards" :key="board.id" :boardId="board.id" :title="board.title" :bgUrl="board.background_id" @showBoard="showBoard"></kanban-thumbnail>
                            <h3 class="display-2" v-if="!sharedBoards[0]" style="font-size: 16px; color: gray; margin-left:4vw;">Shared board is empty.</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p>Adam Primarizki. Hacktiv8 2020.</p>
        </div>
  </section>
</template>

<script>
import KanbanThumbnail from './KanbanThumbnail.vue'
export default {
    data: () => {
        return {
            show: '',
            showAdd: false,
            newBoard: {
                title: '',
                BG: '',
                membersId: [],
            },
            currentMember: ''
        }
    },
    props:{
        yourBoards: Array,
        sharedBoards: Array,
        membersId: Array,
        memberNames: Array
    },
    components: {
        KanbanThumbnail
    },
    methods: {
        logMeOut(){
            this.$emit('logMeOut')
        },
        showSetting(show){
            this.show = show
        },
        showBoard(data){
            this.$emit('showBoard', data)
        },
        hideAdd(){
            this.showAdd = false
            this.newBoard.title = ''
            this.newBoard.members = []
            this.newBoard.BG = ''
            this.$emit('removeNames')
        },
        showAddBoard(){
            this.showAdd = true
        },
        addBoard(){
            this.newBoard.membersId = this.membersId
            console.log(this.newBoard)
            this.$emit('addBoard', this.newBoard)
            this.newBoard.title = ''
            this.newBoard.BG = ''
            this.newBoard.members = []
            this.newBoard.membersId = []
            this.showAdd = false
        },
        addMember(){
            this.$emit('searchUser', this.currentMember)
            this.currentMember = ''
        }
    }
}
</script>

<style>
form {
    width: 16vw
}

.members {
    margin: 4px 0;
    padding: 0;
    font-size: 16px !important;

}

.add-board{
    display: flex;
    flex-direction: column;
}
input {
    padding: 5px;
    outline: 0;
    border: 0;
    border-bottom: 1px solid rgb(226, 226, 226);
    margin: 5px 0
}

button {
    border-radius: 20px;
}
.btnsbmt{
    border-radius: 20px;
    border: 1px solid rgb(226, 226, 226);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.prof-pic{
    transition: filter 0.5s ease;
}
.prof-pic:hover {
    filter: brightness(80%)
}

.menu{
    border-bottom: 1px solid white;
}

.menu:hover{
    border-bottom: 1px solid rgb(168, 167, 167, 0.5);
}

.kanban-thumbnail{
    transition: padding 0.5s ease;
}
.kanban-thumbnail:hover {
    padding: 5px !important;
}
</style>