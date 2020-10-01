<template>

  <div>
    <div class="container-fluid bg-secondary">
        <div class="container">
        <div class="row">
            <div class="col-md-12">
                <nav class="navbar navbar-expand-lg navbar-light bg-transparent px-0">
                    <button class="navbar-brand text-white bg-transparent btn font-weight-light" id="home">Kanban</button>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav mr-auto"></ul>
                        <ul class="navbar-nav">
                            <li v-if="login === false" class="nav-item">
                                <button class="nav-link text-white btn bg-transparent mr-auto" v-on:click="changePage('register')">Sign Up</button>
                            </li>
                            <li v-if="login === false" class="nav-item">
                                <button class="nav-link text-white btn bg-transparent mr-auto" v-on:click="changePage('login')">Log In</button>
                            </li>
                            <li v-if="login === true" class="nav-item">
                                <button class="nav-link text-white btn bg-transparent mr-auto" v-on:click="changePage('create')">Create a task</button>
                            </li>
                            <li v-if="login === true" class="nav-item">
                                <button class="nav-link text-white btn bg-transparent mr-auto" v-on:click="changePage('board')">Kanban Board</button>
                            </li>
                            <li v-if="login" class="nav-item">
                                <button class="nav-link text-white btn bg-transparent mr-auto" v-on:click="logout()">Log Out</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        </div>
    </div>

      <CreateTask @clearData="clearData" @fetch="fetch" v-if="page === 'create'" @changePage="changePage" @changeLoading="changeLoading"></CreateTask>
      <RegisterForm v-else-if="page === 'register'" @changePage="changePage" @changeLogin="changeLogin" @changeLoading="changeLoading"></RegisterForm>
      <LoginForm v-else-if="page === 'login'" @changePage="changePage" @changeLogin="changeLogin" @fetch="fetch" @changeLoading="changeLoading"></LoginForm>

     <div class="container p-3" v-if="page === 'board'">
      <div class="row flex-row flex-sm-nowrap py-3">
          
      <KanbanBoard 
        @clearData="clearData" 
        class="col-sm-6 col-md-4 col-xl-3 scroll"
        v-for="data in kanban" :key="data.id" 
        @fetch="fetch" 
        @edit="edit"
        @move="move"
        :name="data.name" 
        :tasks="data.tasks"
        :kanban="kanban">
    </KanbanBoard>
      </div>
     </div>

      <div class="container" v-if="page === 'edit'">
        <div class="row mt-5">
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
                <h3 class="font-weight-light text-dark">Edit Task</h3>
                <form @submit.prevent="editTask">
                    <div class="form-group">
                        <div class="card mb-3 bg-light">
                            <div class="card-body p-3">
                                <textarea v-model="description" rows="6" class="form-control mb-2" required></textarea>
                                <button type="submit" class="btn btn-secondary float-left">Edit Task</button>
                                <button type="click" class="btn btn-secondary float-right" @click="changePage('board')">Back To Backlog</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                
            </div>
        </div>
    </div>


    <div class="container" v-if="isLoading">
        <div class="row">
            <div class="col-md-12 text-center">
                <lottie-player
                    src="https://assets6.lottiefiles.com/datafiles/17CHBxWA6xYyj94/data.json"  background="transparent"  speed="1" class="mx-auto"  style="width: 280px; height: 150px;"  loop  autoplay >
                </lottie-player>
                <h3 class="text-info font-weight-light">Loading...</h3>
            </div>
        </div>
    </div>
  </div>


</template>

<script>
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import CreateTask from './components/CreateTask'
import KanbanBoard from './components/KanbanBoard'
import axios from 'axios'

const baseUrl = `https://shielded-cove-72197.herokuapp.com`
export default {
    name: "App",
    data() {
        return {
            id: "",
            description: "",
            CategoryId: "",
            page: "login",
            login: false,
            kanban: [
                {
                    name: "backlog",
                    tasks: []
                },
                {
                    name: "progress",
                    tasks: []
                },
                {
                    name: "development",
                    tasks: []
                },
                {
                    name: "done",
                    tasks: []
                }
            ],
            isLoading: false
        }
    },
    components: {
        LoginForm,
        RegisterForm,
        CreateTask,
        KanbanBoard
    },
    methods: {
        changePage(page) {
            this.page = page
        },
        logout() {
            localStorage.clear()
            this.page = 'login'
            this.login = false
            this.clearData()
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            });
        },
        changeLogin(status) {
            this.login = status
        },
        changeLoading() {
            this.isLoading = !this.isLoading
        },
        fetch() {   
            this.changeLoading()     
            axios({
                method: 'GET',
                url: `${baseUrl}/tasks/`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(result => {  
                    this.changeLoading()                  
                    result.data.data.forEach(el => {                                             
                        if(el.CategoryId === 1) {
                            this.kanban[0].tasks.push(el)
                        } else if(el.CategoryId === 2) {
                            this.kanban[1].tasks.push(el)
                        } else if(el.CategoryId === 3) {
                            this.kanban[2].tasks.push(el)
                        } else if(el.CategoryId === 4) {
                            this.kanban[3].tasks.push(el)
                        }
                    })
                })
                .catch(err => {
                })
            },
        clearData () {
            this.kanban = [
                {
                    name: "backlog",
                    tasks: []
                },
                {
                    name: "progress",
                    tasks: []
                },
                {
                    name: "development",
                    tasks: []
                },
                {
                    name: "done",
                    tasks: []
                }
            ]
        },
         findOne(id) {
            this.changeLoading()
            axios({
                method: "GET",
                url: `${baseUrl}/tasks/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(result => {    
                    this.changeLoading()               
                    this.id = result.data.data.id
                    this.description = result.data.data.description
                    this.CategoryId = result.data.data.CategoryId
                })
                .catch(err => {

                })
        },
        edit(id) {
            this.findOne(id)
            this.page = 'edit'
        },
        editTask() {
            this.changeLoading()
            axios({
                method: "PUT",
                url: `${baseUrl}/tasks/${this.id}`,
                data: {
                    description: this.description,
                    CategoryId: this.CategoryId
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })
                .then(result => {
                    this.changeLoading()
                    this.clearData()
                    this.page = 'board'
                    this.fetch();
                })
                .catch(err => {

                })

        },
        move(id, description, CategoryId) {
            this.changeLoading()
            axios({
                method: "PUT",
                url: `${baseUrl}/tasks/${id}`,
                data: {
                    description,
                    CategoryId
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })
                .then(result => {
                    this.changeLoading()
                    this.clearData()
                    this.fetch();
                })
                .catch(err => {

                })
        },
    },
    created(){
        if(localStorage.token){
            this.login = true
            this.page = "board"
            this.fetch()
        } else {
            this.page = "login"
        }
    }
}
</script>

<style>

</style>