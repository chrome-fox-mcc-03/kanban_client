<template>
    <div id="app">
        <MasterBoard v-if="logStatus" v-on:logging-out="logout" v-bind:user="user" v-bind:todos="todos"></MasterBoard>
        <LoginPage v-else v-on:get-login="login"></LoginPage>
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
        login: function (userData) {
            if(userData.password == 'secret') {
                this.user.email = userData.email
                this.logStatus = true
            }
            else {
                alert('password wrong')
            }
        },
        logout: function() {
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
        console.log(this.logStatus)
    }
}
</script>

<style>

</style>