<template>
    <div>
        <landing-page v-show="!isLogin" @login="login" @register="register" style="z-index: 0"></landing-page>
        <kanban v-show="isLogin" @logout="logout" :tasks="tasks" @addTask="addTask" @updateLeft="updateLeft"
            @updateRight="updateRight" @deleteTask="deleteTask"></kanban>
        <vue-snotify style="z-index: 999;"></vue-snotify>
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
                tasks: []
            }
        },
        components: {
            LandingPage,
            Kanban
        },
        methods: {
            login(data) {
                Axios({
                        method: 'POST',
                        url: 'http://localhost:3000/login',
                        data
                    })
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        this.isLogin = true
                        this.$snotify.simple({
                            body: 'My Notification Body',
                            title: 'Notification Title',
                            config: {}
                        })
                    })
                    .catch(err => {
                        this.$snotify.simple({
                            body: 'My Notification Body',
                            title: 'Notification Title',
                            config: {}
                        })
                    })
                // .finally()
            },

            register(data) {
                Axios({
                        method: 'POST',
                        url: 'http://localhost:3000/register',
                        data
                    })
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        this.isLogin = true
                    })
                    .catch(err => {
                        console.log(err.response.data);
                    })
            },
            logout() {
                localStorage.removeItem('token')
                this.isLogin = false
            },
            fetchTask() {
                Axios({
                        method: 'GET',
                        url: 'http://localhost:3000/tasks',
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(response => {
                        this.tasks = response.data
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            addTask(data) {
                Axios({
                        method: 'POST',
                        url: 'http://localhost:3000/tasks',
                        headers: {
                            token: localStorage.token
                        },
                        data
                    })
                    .then(response => {
                        this.fetchTask()
                        this.$snotify.simple({
                            body: 'My Notification Body',
                            title: 'Notification Title',
                            config: {}
                        })
                    })
            },
            updateLeft(data) {
                let category
                if (data.category === 'Product') category = 'Backlog'
                else if (data.category === 'Development') category = 'Product'
                else if (data.category === 'Done') category = 'Development'
                Axios({
                        method: 'PUT',
                        url: `http://localhost:3000/tasks/${data.id}`,
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
                        console.log(err);
                    })
            },
            updateRight(data) {
                let category
                if (data.category === 'Backlog') category = 'Product'
                else if (data.category === 'Product') category = 'Development'
                else if (data.category === 'Development') category = 'Done'
                Axios({
                        method: 'PUT',
                        url: `http://localhost:3000/tasks/${data.id}`,
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
                        console.log(err);
                    })
            },
            deleteTask(id) {
                console.log('masoookkk');
                Axios({
                        method: 'DELETE',
                        url: `http://localhost:3000/tasks/${id}`,
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(response => {
                        this.fetchTask()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        created() {
            if (localStorage.token) {
                this.isLogin = true
                this.fetchTask()
            }
        }
    };
</script>

<style scoped>

</style>