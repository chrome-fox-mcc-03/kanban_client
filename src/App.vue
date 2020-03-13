<template>
    <div id="app">
        <MasterBoard v-if="logStatus" v-on:logging-out="logout" v-bind:user="user" v-bind:todos="todos"></MasterBoard>
        <LoginPage v-else v-on:get-login="login" v-on:post-register="register"></LoginPage>
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
                    status: 3,
                    editTitle: false,
                    editDesc: false
                },
                {
                    title: "Third Task",
                    description: "Second task is even more awesome.",
                    status: 4,
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
                console.log(response)
                this.todos = response
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
        },
        addTask: function() {
            this.todos.push({
                title: "New Task",
                description: "Add description here.",
                status: 1,
                editTitle: false,
                editDesc: false
            })
        }
    },
    created() {
        if(localStorage.getItem('accessToken')) {
            this.logStatus = true
        }
        console.log(this.logStatus)
    }
}
</script>

<style>

</style>