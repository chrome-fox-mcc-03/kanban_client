<template>
  <section>
      <div class="nav-container">
                <img @click.prevent="changePage('dashboard-home')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1588978741582004484-256.png" alt="">
                <div class="container">
                    <div class="row">
                            <h2 class="display-6 col col-10">{{boardParams.title}}</h2>
                    </div>
                </div> 
                <img @click.prevent="showSetting('kanban-new')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12817025351582004496-256.png" alt="">
            </div>

            <div class="kanban-content">
                <div class="row">
                    <div class="col kanban-card">
                        <div class="kanban-title">
                            <h1>Backlog</h1>
                        </div>
                        <div class="kanban-content overflow-auto">
                            <div class="kanban-content-card" 
                            v-for="card in cards.backlogs" :key="card.id"
                            @click="showCard(card.title, card.description, card.due_date)">
                                <div class="row row-cols-2">
                                    <div class="col-2">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/16882276531582004488-256.png" alt="">
                                    </div>
                                    <div class="col-10">
                                        <p>{{card.due_date}}</p>
                                    </div>
                                    
                                </div>
                                <div class="row cols-1">
                                    <p class="kanban-card-title">{{card.title}}</p>
                                </div>
                                <div class="row cols-1">
                                    <p class="kanban-card-desc">{{card.description}} </p>
                                </div>
                                <div class="row justify-content-center icon-div">
                                    
                                    
                                    <div class="col col-4">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/4609047631582004492-256.png" alt="" class="bottom-icon">
                                    </div>
                                    </div>
                            </div>                                
                        </div>
                    </div>
                    <div class="col kanban-card">
                        <div class="kanban-title">
                            <h1>To Do</h1>
                        </div>
                        <div class="kanban-content overflow-auto">
                            <div class="kanban-content-card"
                            v-for="card in cards.todos" :key="card.id"
                            @click="showCard(card.title, card.description, card.due_date)">
                                <div class="row row-cols-2">
                                    <div class="col-2">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/16882276531582004488-256.png" alt="">
                                    </div>
                                    <div class="col-10">
                                        <p>{{card.due_date}}</p>
                                    </div>
                                    
                                </div>
                                <div class="row cols-1">
                                    <p class="kanban-card-title">{{card.title}}</p>
                                </div>
                                <div class="row cols-1">
                                    <p class="kanban-card-desc">{{card.description}}</p>
                                </div>
                                <div class="row justify-content-center icon-div">
                                    
                                    <div class="col col-4">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1959125971582004485-256.png" alt="" class="bottom-icon">
                                    </div>
                                    <div class="col col-4">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/4609047631582004492-256.png" alt="" class="bottom-icon">
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="col kanban-card">
                        <div class="kanban-title">
                            <h1>On Going</h1>
                        </div>
                        <div class="kanban-content">
                            <div class="kanban-content-card"
                            v-for="card in cards.ongoings" :key="card.id"
                            @click="showCard(card.title, card.description, card.due_date)">
                                <div class="row row-cols-2">
                                    <div class="col-2">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/16882276531582004488-256.png" alt="">
                                    </div>
                                    <div class="col-10">
                                        <p>{{card.due_date}}</p>
                                    </div>
                                    
                                </div>
                                <div class="row cols-1">
                                    <p class="kanban-card-title">{{card.title}}</p>
                                </div>
                                <div class="row cols-1">
                                    <p class="kanban-card-desc">{{card.description}}</p>
                                </div>
                                <div class="row justify-content-center icon-div">
                                    
                                    <div class="col col-4">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1959125971582004485-256.png" alt="" class="bottom-icon">
                                    </div>
                                    <div class="col col-4">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/4609047631582004492-256.png" alt="" class="bottom-icon">
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="col kanban-card">
                        <div class="kanban-title">
                            <h1>Done</h1>
                        </div>
                        <div class="kanban-content overflow-auto">
                            <div class="kanban-content-card"
                            v-for="card in cards.dones" :key="card.id"
                            @click="showCard(card.title, card.description, card.due_date)">
                                <div class="row row-cols-2">
                                    <div class="col-2">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/16882276531582004488-256.png" alt="">
                                    </div>
                                    <div class="col-10">
                                        <p>{{card.due_date}}</p>
                                    </div>
                                    
                                </div>
                                <div class="row cols-1">
                                    <p class="kanban-card-title">{{card.title}}</p>
                                </div>
                                <div class="row cols-1">
                                    <p class="kanban-card-desc">{{card.description}}</p>
                                </div>
                                <div class="row justify-content-center icon-div">
                                    
                                    <div class="col col-4">
                                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1959125971582004485-256.png" alt="" class="bottom-icon">
                                    </div>
                                    
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kanban-detail" v-show="status.loggedIn.show === 'kanban-detail'">
                    <img  @click.prevent="showSetting('')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12355707351582004488-256.png" alt="" class="close">
                    <h1 v-show="!cardParams.editName" @click.prevent="cardParams.editName = !cardParams.editName">{{cardParams.title}}</h1>
                    <input type="text" v-show="cardParams.editName" v-model="cardParams.title" v-on:blur="cardParams.editName = !cardParams.editName">
                    <p>created by</p>
                    <div class="row">
                        <img class="col-4" src="https://www.wretched.org/wp-content/uploads/2017/09/Anon-profile.png" alt="" >
                        <div class="col-8">
                            <p>22 November 2020</p>
                            <p class="name">Adam Primarizki</p>
                        </div>
                    </div>
                    <div class="row due-date">
                        <p class="col-4">Due date: </p>
                        <div class="col-8">
                            <p>{{cardParams.due_date}}</p>
                        </div>
                    </div>
                    <p>Desc</p>
                    <p class="detail-desc" v-show="!cardParams.editDesc" @click.prevent="cardParams.editDesc = !cardParams.editDesc">{{cardParams.description}}</p>
                    <textarea rows="60" cols="25" v-show="cardParams.editDesc" v-model="cardParams.description" v-on:blur="cardParams.editDesc = !cardParams.editDesc"></textarea>
                    <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/14458160321582004493-256.png" class="bottom-icon" alt="">
                </div>
                <div class="kanban-new" v-show="status.loggedIn.show === 'kanban-new'">
                    <img @click.prevent="showSetting('')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12355707351582004488-256.png" alt="" class="close">
                    <h1>New Card</h1>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" id="add-kanban-name" placeholder="Title">
                            </div>
                            <div class="form-group">
                            <textarea id="add-kanban-desc" placeholder="Description">
                            </textarea>
                            </div>
                        <div class="form-group">
                            <p>Select due date</p>
                            <input type="date" class="form-control" id="add-kanban-due-date" placeholder="Due Date">
                        </div>
                        <button type="submit" class="bottom-icon"><img @click.prevent="showSetting('kanban-new')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12817025351582004496-256.png" alt="" > </button>
                    </form>  
                </div>
        </div>
  </section>

</template>

<script>
export default {
    name: 'KanbanBoardPage'

}
</script>

<style>

</style>