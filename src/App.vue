<template>
    <div>
        <landing-page v-if="!isLogin" @login="login" @register="register" @onSignInSuccess="onSignInSuccess">
        </landing-page>
        <kanban v-else @logout="logout" :tasks="tasks" @addTask="addTask" @updateLeft="updateLeft"
            @updateRight="updateRight" @deleteTask="deleteTask" :userName="userName"></kanban>
        <div class="loading-container" v-if="isLoading">
            <div class="loading-screen">
                <lottie-player src="https://assets7.lottiefiles.com/datafiles/WKqC5QWz9GiZnlm/data.json"
                    background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay>
                </lottie-player>
            </div>
        </div>
    </div>
</template>
<script>
    import LandingPage from './views/LandingPage.vue'
    import Kanban from './views/Kanban.vue'
    import Axios from 'axios';

    export default {
        name: 'App',
        data() {
            return {
                isLogin: false,
                tasks: [],
                userName: '',
                isLoading: false
            }
        },
        components: {
            LandingPage,
            Kanban
        },
        methods: {
            login(data) {
                this.isLoading = true
                Axios({
                        method: 'POST',
                        url: 'https://kanban-hacktiv8.herokuapp.com//login',
                        data
                    })
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        this.userName = response.data.name
                        this.isLogin = true
                        this.$toasted.success(`Welcome Back, ${this.userName}`)
                        this.fetchTask()
                    })
                    .catch(err => {
                        this.$toasted.error(err.response.data.message, {
                            position: 'bottom-center'
                        })
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },

            register(data) {
                this.isLoading = true
                Axios({
                        method: 'POST',
                        url: 'https://kanban-hacktiv8.herokuapp.com//register',
                        data
                    })
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        this.userName = response.data.name
                        this.isLogin = true
                        this.$toasted.success(`Thanks for Register ${this.userName}!!!`)
                        this.fetchTask()

                    })
                    .catch(err => {
                        this.$toasted.error(err.response.data.message, {
                            position: 'bottom-center'
                        })
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },
            logout() {
                this.$toasted.success(`Thanks for Coming, ${this.userName} !!!`)
                localStorage.removeItem('token')
                localStorage.removeItem('name')
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });

                this.isLogin = false
                this.tasks = []
            },
            fetchTask() {
                this.isLoading = true
                Axios({
                        method: 'GET',
                        url: 'https://kanban-hacktiv8.herokuapp.com//tasks',
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(response => {
                        this.tasks = response.data
                    })
                    .catch(err => {
                        this.$toasted.error('Thanks for Coming!!!')
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },
            addTask(data) {
                this.isLoading = true
                Axios({
                        method: 'POST',
                        url: 'https://kanban-hacktiv8.herokuapp.com//tasks',
                        headers: {
                            token: localStorage.token
                        },
                        data
                    })
                    .then(response => {
                        this.tasks.push(response.data)
                        this.$toasted.success(`${response.data.title} has been Added!!!`, {
                            position: 'bottom-right'
                        })
                    })
                    .catch(err => {
                        this.$toasted.error(`${err.response.data.message}`, {
                            position: 'bottom-right'
                        })
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },
            updateLeft(data) {
                let category
                if (data.category === 'Product') category = 'Backlog'
                else if (data.category === 'Development') category = 'Product'
                else if (data.category === 'Done') category = 'Development'
                this.isLoading = true
                Axios({
                        method: 'PUT',
                        url: `https://kanban-hacktiv8.herokuapp.com//tasks/${data.id}`,
                        headers: {
                            token: localStorage.token
                        },
                        data: {
                            category
                        }
                    })
                    .then(response => {
                        this.fetchTask()
                    })
                    .catch(err => {
                        this.$toasted.error(`${err.response.data.message}`, {
                            position: 'bottom-left'
                        })
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },
            updateRight(data) {
                let category
                if (data.category === 'Backlog') category = 'Product'
                else if (data.category === 'Product') category = 'Development'
                else if (data.category === 'Development') category = 'Done'
                this.isLoading = true
                Axios({
                        method: 'PUT',
                        url: `https://kanban-hacktiv8.herokuapp.com//tasks/${data.id}`,
                        headers: {
                            token: localStorage.token
                        },
                        data: {
                            category
                        }
                    })
                    .then(response => {
                        this.fetchTask()
                    })
                    .catch(err => {
                        this.$toasted.error(`${err.response.data.message}`, {
                            position: 'bottom-left'
                        })
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },
            deleteTask(id) {
                this.isLoading = true
                Axios({
                        method: 'DELETE',
                        url: `https://kanban-hacktiv8.herokuapp.com//tasks/${id}`,
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(response => {
                        this.fetchTask()
                        this.$toasted.success(`Task Deleted`, {
                            position: 'bottom-right'
                        })
                    })
                    .catch(err => {
                        this.$toasted.error(`${err.response.data.message}`, {
                            position: 'bottom-right'
                        })
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },
            onSignInSuccess(id_token) {
                this.isLoading = true
                Axios({
                        method: 'POST',
                        url: 'https://kanban-hacktiv8.herokuapp.com//googleLogin',
                        data: {
                            token: id_token
                        }
                    })
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        this.userName = response.data.name
                        this.isLogin = true
                        this.$toasted.success(`Welcome Back, ${this.userName}`)
                        this.fetchTask()
                    })
                    .catch(err => {
                        this.$toasted.error(`${err.response.data.message}`, {
                            position: 'bottom-right'
                        })
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            }
        },
        created() {
            if (localStorage.token) {
                this.isLogin = true
                this.fetchTask()
                this.$toasted.success(`Welcome Back, ${this.userName}`)

            }
        }
    };
</script>

<style>
    .body {
        background-color: #3fc1c9;
    }

    .loading-screen {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        margin: auto;
        top: 35%;
        width: 300px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 300px;
    }

    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .loading-screen lottie-player {
        margin: auto;
    }
</style>