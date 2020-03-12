<template>
    <div>
        <!-- Navigation Bar -->
        <navigation-bar @changePage="changePage" @logout="logout" :isLogin="userData.isLogin" :avatar="userData.avatarUrl"></navigation-bar>

        <!-- Landing Page -->
        <landing-page v-if="!userData.isLogin && currentPage == 'landingPage'" ></landing-page>

        <!-- Registration Page -->
        <registration-page @register="register" v-if="!userData.isLogin && currentPage == 'regisPage'"></registration-page>

        <!-- Login Page -->
        <login-page @login="login" v-if="!userData.isLogin && currentPage == 'loginPage'" ></login-page>
        
        <!-- Main Page -->
        <div v-if="userData.isLogin" >
            <div class="row">
                <form @submit.prevent="createTask()" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">assignment</i>
                            <input v-model="newTaskTitle" id=task-title-create" type="text" class="validate">
                            <label for=task-title-create">New Task</label>
                        </div>
                        <button class="btn-floating btn-medium waves-effect waves-light red" type="submit" name="action">
                        <i class="material-icons">add</i>
                        </button>
                    </div>
                </form>
            </div>
            <div class="container">
                <task-list v-for="(taskCategory, index) in taskCategories" :key="index" :taskCategory="taskCategory" :tasks="tasks"></task-list>      
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavigationBar from './components/NavigationBar.vue'
import LandingPage from './components/LandingPage.vue'
import RegistrationPage from './components/RegistrationPage.vue'
import LoginPage from './components/LoginPage.vue'
import TaskList from './components/TaskList.vue'


export default {
    name : 'Kanban',
    data () {
        return {
            currentPage : 'landingPage',
            userData : {
                name : '',
                email : '',
                password : '',
                avatarUrl : '',
                isLogin : false
            },
            tasks : [],
            taskCategories : ['backlog', 'todo', 'done', 'completed'],
            newTaskTitle : ''
        }
    },
    components : {
        NavigationBar,
        LandingPage,
        RegistrationPage,
        LoginPage,
        TaskList
    },
    created(){
        const access_token = localStorage.getItem('access_token') ;
        if (access_token) {
            this.userData.isLogin = true
            this.fetchData()
            this.userData.avatarUrl = localStorage.getItem('avatar') ;
        }
    },
    methods : {
        changePage (page) {
            this.currentPage = page 
        },
        register (userData) {
            const name = userData.name;
            const email = userData.email;
            const password = userData.password;

            axios({
                method : 'post',
                url : 'http://localhost:3000/users/register',
                data : {
                    name,
                    email,
                    password
                }
            })
                .then(({data})=>{
                    const access_token = data.access_token ;
                    localStorage.setItem('access_token', access_token) ;
                    localStorage.setItem('avatar', data.access_avatarUrl ) ;
                    this.userData.avatarUrl = localStorage.getItem('avatar') ;
                    this.userData.isLogin = true ;
                    this.fetchData()

                })
                .catch((error)=>{
                    console.log(error.response.data.errorMessage);
                })
        },

        login(userData) {
            const email = userData.email;
            const password = userData.password;

            axios({
                method : 'post',
                url : 'http://localhost:3000/users/login',
                data : {
                    email,
                    password
                }
            })
                .then(({data})=>{
                    const access_token = data.access_token ; 
                    localStorage.setItem('access_token', access_token) ;
                    localStorage.setItem('avatar', data.access_avatarUrl ) ;
                    this.userData.avatarUrl = localStorage.getItem('avatar') ;
                    this.userData.isLogin = true ;
                    this.fetchData()
                })
                .catch((error)=>{
                    console.log(error.response.data.errorMessage);
                })
        },
        logout(){
            localStorage.clear() ;
            this.userData.isLogin = false ;
            this.changePage('landingPage') ;
        },

        fetchData () {
            axios({
                method : 'get',
                url : `http://localhost:3000/tasks/`,
                headers : {
                    access_token : localStorage.getItem('access_token')
                }
            })
                .then(({data})=>{
                    this.tasks = data.data
                })

                .catch ((error)=>{
                    console.log(error.response.data.errorMessage);
                })

        },
        createTask(){
            const title = this.newTaskTitle ; 

            axios({
                method : 'post',
                url : 'http://localhost:3000/tasks',
                data : {
                    title
                },
                headers : {
                    access_token : localStorage.getItem('access_token')
                }
            })
                .then(({data})=> {
                    this.fetchData()
                    this.newTaskTitle = ''

                })
                .catch((error)=>{
                    console.log(error.response.data.errorMessage);                    
                })

        }


    }
}
</script>

<style>

</style>