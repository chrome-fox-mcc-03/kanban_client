<template>
    <div>
        <LandingPage 
        v-if="page == 'landingPage'"
        @user="getData"
        ></LandingPage>
        <HomePage 
        v-else-if="page == 'homePage'" 
        @logout="clearUser"
        @goToTask="changePage"
        ></HomePage>
        <TaskPage
        v-else
        @logout="clearUser"
        @goToHome="changePage"
        ><TaskPage>
    </div>
</template>

<script>
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage'
import TaskPage from './components/TaskPage'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'App',
    data () {
        return {
            page: 'landingPage',
            user: {
                email: '',
                password: ''
            }
        }
    },
    components: {
        LandingPage,
        HomePage,
        TaskPage
    },
    methods: {
        getData(data) {
            this.page = data
        },
        clearUser(page) {
            this.page = page
        },
        changePage(data) {
            this.page = data
        }   
    },
    created() {
        if(localStorage.token) {
            this.page = 'homePage'
        }
    }
}
</script>

<style>

</style>