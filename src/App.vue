<template>
    <div>
        <!-- Navigation Bar -->
        <navigation-bar @changePage="changePage" @logout="logout" :isLogin="userData.isLogin" :avatar="userData.avatarUrl"></navigation-bar>

        <!-- Message -->
        <message-error v-if="this.errorMessage.isError" :messages="this.errorMessage.messages"></message-error>

        <!-- Loading -->
        <div v-if="isLoading" class="loading-animation">
            <lottie-player
                src="https://assets6.lottiefiles.com/datafiles/J16FZ2Py2rUM9uV/data.json"
                background="transparent" 
                speed="1"  
                style="width: 100px; height: 100px;"  
                loop  
                autoplay
            ></lottie-player>
        </div>

        <!-- Landing Page -->
        <page-landing v-if="!userData.isLogin && currentPage == 'landingPage'" ></page-landing>

        <!-- Registration Page -->
        <page-registration @googleSignin="googleSignin" @register="register" v-if="!userData.isLogin && currentPage == 'regisPage'"></page-registration>

        <!-- Login Page -->
        <page-login @googleSignin="googleSignin" @login="login" v-if="!userData.isLogin && currentPage == 'loginPage'" ></page-login>

        <!-- Main Page -->
        <div v-if="userData.isLogin" >
            <div class="row">
                <form @submit.prevent="createTask()" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">assignment</i>
                            <input v-model="newTaskTitle" id="task-title-create" type="text" class="validate">
                            <label for="task-title-create">New Task</label>
                        </div>
                        <button class="btn-floating btn-medium waves-effect waves-light red" type="submit" name="action">
                        <i class="material-icons">add</i>
                        </button>
                    </div>
                </form>
            </div>
            <div class="container">
                <task-list
                    @getMessages="getMessages"
                    @deleteTask="deleteTask"
                    @fetchData="fetchData"
                    v-for="(taskCategory, index) in taskCategories"
                    :key="index"
                    :taskCategory="taskCategory"
                    :tasks="tasks"></task-list>      
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavigationBar from './components/NavigationBar.vue'
import PageLanding from './components/PageLanding.vue'
import PageRegistration from './components/PageRegistration.vue'
import PageLogin from './components/PageLogin.vue'
import TaskList from './components/TaskList.vue'
import MessageError from './components/MessageError.vue'


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
            newTaskTitle : '' ,
            errorMessage : {
                isError : false,
                messages : []
            },
            isLoading : false
        }
    },
    components : {
        NavigationBar,
        PageLanding,
        PageRegistration,
        PageLogin,
        TaskList,
        MessageError
    },
    created(){
        const access_token = localStorage.getItem('access_token') ;
        if (access_token) {
            this.userData.isLogin = true ;
            this.fetchData() ;
            this.userData.avatarUrl = localStorage.getItem('avatar') ;
        }
    },
    methods : {
        changePage (page) {
            this.errorMessage.isError = false ;
            this.errorMessage.messages = [] ;
            this.currentPage = page 
        },
        register (userData) {
            this.errorMessage.isError = false ;
            this.errorMessage.messages = [] ;
            const name = userData.name;
            const email = userData.email;
            const password = userData.password;
            this.isLoading = true ;

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
                    this.errorMessage.isError = false ;
                    this.fetchData() ;

                })
                .catch((error)=>{
                    let newMessage = '' ;
                    this.errorMessage.isError = true ;
                    for (let i = 0 ; i < error.response.data.message.length ; i++){
                        newMessage = error.response.data.message[i] ;
                        this.errorMessage.messages.push(newMessage) ;
                    }
                })
                .finally(()=>{
                    this.isLoading = false
                })
        },
        login(userData) {
            this.errorMessage.isError = false ;
            this.errorMessage.messages = [] ;
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
                    this.fetchData() ;
                })
                .catch((error)=>{
                    let newMessage = '' ;
                    this.errorMessage.isError = true ;
                    for (let i = 0 ; i < error.response.data.message.length ; i++){
                        newMessage = error.response.data.message[i] ;
                        this.errorMessage.messages.push(newMessage) ;
                    }
                })
        },
        logout(){
            localStorage.clear() ;
            this.userData.isLogin = false ;
            this.changePage('landingPage') ;
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });

        },
        fetchData () {
            this.isLoading = true ;
            this.errorMessage.isError = false ;
            this.errorMessage.messages = [] ;
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
                    let newMessage = '' ;
                    this.errorMessage.isError = true ;
                    for (let i = 0 ; i < error.response.data.message.length ; i++){
                        newMessage = error.response.data.message[i] ;
                        this.errorMessage.messages.push(newMessage) ;
                    }
                })
                .finally(()=>{
                    this.isLoading = false
                })

        },
        createTask(){
            this.isLoading = true ;
            this.errorMessage.isError = false ;
            this.errorMessage.messages = [] ;

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
                    let newMessage = '' ;
                    this.errorMessage.isError = true ;
                    for (let i = 0 ; i < error.response.data.message.length ; i++){
                        newMessage = error.response.data.message[i] ;
                        this.errorMessage.messages.push(newMessage) ;
                    }            
                })
                .finally(()=>{
                    this.isLoading = false
                })

        },
        deleteTask(id){
            this.errorMessage.isError = false ;
            this.errorMessage.messages = [] ;
            axios({
                method : 'delete',
                url : `http://localhost:3000/tasks/${id}`,
                headers : {
                    access_token : localStorage.getItem('access_token')
                }
            })
                .then(({data})=> {
                    console.log('deleted');
                    this.fetchData()

                })
                .catch((error)=>{
                    let newMessage = '' ;
                    this.errorMessage.isError = true ;
                    for (let i = 0 ; i < error.response.data.message.length ; i++){
                        newMessage = error.response.data.message[i] ;
                        this.errorMessage.messages.push(newMessage) ;
                    }      
                })
        },
        googleSignin(token){
            axios({
                method : 'post' ,
                url : 'http://localhost:3000/users/googleSignin',
                headers : {
                    access_token : token
                }
            })
                .then(({data})=>{
                    const access_token = data.access_token ; 
                    console.log(access_token);
                    localStorage.setItem('access_token', access_token) ;
                    localStorage.setItem('avatar', data.access_avatarUrl ) ;
                    this.userData.avatarUrl = localStorage.getItem('avatar') ;
                    this.userData.isLogin = true ;
                    this.fetchData() ;

                })
                .catch((error)=>{
                    this.errorMessage.isError = true ;
                    this.errorMessage.messages = ['Failed to sign in via Google'] ;
                })
        },
        getMessages(data){
            let newMessage = '' ;
            this.errorMessage.isError = true ;
            for (let i = 0 ; i < data.length ; i++){
                newMessage = data[i] ;
                this.errorMessage.messages.push(newMessage) ;
            }
        }
    }
}
</script>

<style>

.loading-animation {
    text-align: center;
}

</style>