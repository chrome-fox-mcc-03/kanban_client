<template>
<div>
    <navbar
        :userlogin="userlogin"
        @login="login"
        @logout="logout"
    ></navbar>
    <loading
        v-if="loading"
    ></loading>
    <register-page
        v-else-if="!loading && !userlogin"
        @register="register"
    ></register-page>
    <dashboard-container
        v-else-if="!loading && userlogin"
        :categories="categories"
        :prioritylist="prioritylist"
        :items="items"
        @create="create"
    ></dashboard-container>
</div>
</template>

<script>
import axios from 'axios';
import RegisterPage from './components/register-page';
import Navbar from './components/navbar';
import Loading from './components/loading';
import Card from './components/card';
import Dashboard from './components/dashboard-container';

export default {
    data() {
        return {
            appName: "kanban-app",
            loading: false,
            userlogin: false,
            token: '',
            items: [],
            categories: ['Backlog', 'Product', 'Development', 'Done'],
            prioritylist: ["Task", "Important", "Urgent", "Done"],
        }
    },
    components: {
        'register-page': RegisterPage,
        'navbar': Navbar,
        'loading': Loading,
        'dashboard-container': Dashboard,
    },
    methods: {
        create(obj) {
            // console.log(obj, 'app create');
            this.loading = true;
            // console.log(this.token);
            axios({
                url: "",
                method: "POST",
                data: obj,
                headers: {
                    token: this.token,
                }
            })
            .then()
            .catch()
            .finally(_ => {
                this.loading = false;
                this.loadDB();
            })
        },
        register(obj) {
            console.log('register', obj);
            this.loading = true;
            axios({
                url: "http://localhost:3000/register",
                method: "POST",
                data: obj
            })
            .then(result => {
                console.log(result.data);
                localStorage.setItem(this.appName, result.data.token);
                this.userlogin = true;
                this.token = token;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(_ => {
                this.loading = false;
                this.loadPage();
            })
        },
        login(obj) {
            console.log('login', obj)
            this.loading = true;
            axios({
                url: 'http://localhost:3000/login',
                method: "POST",
                data: obj,
            })
            .then(result=> {
                localStorage.setItem(this.appName, result.data.token);
                this.userlogin = true;
                this.token = token;
            })
            .catch(err => {
                console.log(err.response);
            })
            .finally(_ => {
                this.loading = false;
            })
        },
        logout() {
            this.token = ''
            localStorage.clear();
            this.userlogin = false;
            this.cekToken()
            this.loadPage()
        },
        loadPage() {
            if (this.userlogin) {
                this.loadDB()
            } else {
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            }
        },
        loadDB() {
            this.loading = true;
            axios({
                url: "http://localhost:3000/item",
                method: "GET",
                // headers: {},
            })
            .then(result => {
                console.log(result.data);
                this.items = result.data;
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            })
            .finally(_ => {
                this.loading = false;
            });
        },
        cekToken() {
            let token = localStorage.getItem(this.appName);
            console.log(token);
            this.loading = true;
            axios({
                url: 'http://localhost:3000/cekLogin',
                method: "GET",
                headers: {
                    token
                },
            })
            .then(result => {
                console.log(result.data);
                this.userlogin = true;
                this.token = token;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(_ => {
                this.loadPage()
            })
        }
    },
    created() {
        this.cekToken()
        this.loadPage()
    }
}
</script>

<style>
    @import './assets/style.css'
</style>