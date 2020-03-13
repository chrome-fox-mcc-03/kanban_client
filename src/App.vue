<template>

  <div>
      <div class="container-fluid bg-secondary" id="menu">
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
                            <button class="nav-link text-white btn bg-transparent mr-auto" v-on:click="changePage('create')">Create A Task</button>
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

      <CreateTask @clearData="clearData" @fetch="fetch" v-if="page === 'create'" @backToBoard="changePage"></CreateTask>
      <RegisterForm v-else-if="page === 'register'" @afterRegister="changePage" @loginStatus="changeLogin"></RegisterForm>
      <LoginForm v-else-if="page === 'login'" @afterLogin="changePage" @loginStatus="changeLogin"></LoginForm>
     <div class="container p-3" v-if="page === 'board'">
      <div class="row flex-row flex-sm-nowrap py-3">
      <KanbanBoard 
        @clearData="clearData" 
        class="col-sm-6 col-md-4 col-xl-3 scroll"
        v-for="(data, name) in kanban" :key="data.backlog" 
        @fetch="fetch" 
        @edit="edit"
        @move="move"
        :name="name" 
        :data="data" 
        @pageChanging="changePage" 
        @fromBoard="changePage" 
        @fromEdit="changePage" 
        :page="page">
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
                                <textarea v-model="description" rows="6" class="form-control mb-2"></textarea>
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
  </div>
</template>

<script>
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import CreateTask from './components/CreateTask'
import KanbanBoard from './components/KanbanBoard'
import axios from 'axios'

const baseUrl = `http://localhost:3000`
export default {
    name: "App",
    data() {
        return {
            id: "",
            description: "",
            CategoryId: "",
            page: "login",
            login: false,
            kanban: {
                backlog: [],
                progress: [],
                development: [],
                done: []
            }
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
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        });
      },
      changeLogin(status) {
          return (this.login = status)
      },
    fetch() {        
        axios({
            method: 'GET',
            url: `${baseUrl}/tasks/`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then(result => {                    
                result.data.data.forEach(el => {                                             
                    if(el.CategoryId === 1) {
                        this.kanban.backlog.push(el)
                    } else if(el.CategoryId === 2) {
                        this.kanban.progress.push(el)
                    } else if(el.CategoryId === 3) {
                        this.kanban.development.push(el)
                    } else if(el.CategoryId === 4) {
                        this.kanban.done.push(el)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        clearData () {
            this.kanban = {
                backlog: [],
                progress: [],
                development: [],
                done: []
            }
        },
         findOne(id) {
            axios({
                method: "GET",
                url: `${baseUrl}/tasks/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(result => {    
                    console.log(result)                
                    this.id = result.data.data.id
                    this.description = result.data.data.description
                    this.CategoryId = result.data.data.CategoryId
                })
                .catch(err => {

                })
        },
        edit(id) {
            this.findOne(id)
            console.log(id)
            this.page = 'edit'
        },
        editTask() {
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
                    this.clearData()
                    this.page = 'board'
                    this.fetch();
                })
                .catch(err => {

                })

        },
        move(id, description, CategoryId) {
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