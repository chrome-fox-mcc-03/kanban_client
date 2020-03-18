<template>
    <div id="app">
        <MasterBoard v-if="logStatus" v-on:logging-out="logout" v-bind:user="user" v-bind:todos="todos" v-on:update-task="updateData()" v-on:app-add-task="addTask()" v-on:delete-task="deleteTask()"></MasterBoard>
        <LoginPage v-else v-on:get-login="login" v-on:post-register="register" v-on:google-sign="googleLogin"></LoginPage>
    </div>
</template>

<script>
import MasterBoard from "./components/MasterBoard.vue"
import LoginPage from "./components/LoginPage.vue"
import axios from 'axios'

export default {
    name: "App",
    data() {
        return {
            user: {
                email: ''
            },
            localhost: `http://localhost:3000`,
            logStatus: false,
            todos: [
                {
                    title: "First Task",
                    description: "This is your first awesome task. You go girl!",
                    status: 1,
                    editTitle: false,
                    editDesc: false
                },
                {
                    title: "Second Task",
                    description: "Second task is even more awesome.",
                    status: 2,
                    editTitle: false,
                    editDesc: false
                },
                {
                    title: "Third Task",
                    description: "Second task is even more awesome.",
                    status: 3,
                    editTitle: false,
                    editDesc: false
                },
                {
                    title: "Fourth Task",
                    description: "Second task is even more awesome.",
                    status: 4,
                    editTitle: false,
                    editDesc: false
                }

            ]
        }
    },
    components: {
        MasterBoard: MasterBoard,
        LoginPage: LoginPage
    },
    methods: {
        fetchData: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/todo/read',
                headers: {
                    token: localStorage.getItem('accessToken')
                }
            }).then(response => {
                if(response.data.length > 0) {
                    this.todos = response.data
                    this.todos.forEach(el => {
                        el.editTitle = false,
                        el.editDesc = false
                    });
                }
            })
            .catch(err => {
                alert(err)
            })
        },
        register: function(userData) {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: {
                    email: userData.email,
                    password: userData.password
                }
            }).then(response => {
                localStorage.setItem('accessToken', response.data.accessToken)
                if(localStorage.getItem('accessToken')) {
                    this.logStatus = true
                    this.fetchData()
                }
            })
            .catch(err => {
                alert(err)
            })
        },
        login: function (userData) {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: {
                    email: userData.email,
                    password: userData.password
                }
            }).then(response => {
                console.log(response)
                localStorage.setItem('accessToken', response.data.accessToken)
                if(localStorage.getItem('accessToken')) {
                    this.logStatus = true
                    this.fetchData()
                }
            })
            .catch(err => {
                alert(err)
            })
        },
        logout: function() {
            localStorage.clear()
            this.logStatus = false
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        },
        addTask: function(todoData) {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/todo/create',
                headers: {
                    token: localStorage.getItem('accessToken')
                },
                data: {
                    title: todoData.title,
                    description: todoData.description,
                    status: todoData.status
                }
            }).then(response => {
                this.fetchData()
            })
            .catch(err => alert(err))
        },
        deleteTask: function(todoData) {
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/todo/delete/${todoData.id}`,
                headers: {
                    token: localStorage.getItem('accessToken')
                }
            }).then(response => {
                this.fetchData()
            })
            .catch(err => alert(err))
        },
        updateTask: function(todoData) {
            axios({
                method: 'PUT',
                url: `http://localhost:3000/todo/update/${todoData.id}`,
                headers: {
                    token: localStorage.getItem('accessToken')
                },
                data: {
                    title: todoData.title,
                    description: todoData.description,
                    status: todoData.status
                }
            }).then(response => {
                this.fetchData()
            })
            .catch(err => alert(err))
        },
        googleLogin: function(loginData) {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/googleSignIn',
                headers: {
                    token: loginData.token
                }
            }).then(response => {
                console.log(response)
                localStorage.setItem('accessToken', response.data.accessToken)
                if(localStorage.getItem('accessToken')) {
                    this.logStatus = true
                    this.fetchData()
                }
            })
            .catch(err => {
                alert(err)
            })
        }
    },
    created() {
        if(localStorage.getItem('accessToken')) {
            this.logStatus = true
            this.fetchData()
        }
        console.log(this.logStatus)
    }
}
</script>

<style>

</style>