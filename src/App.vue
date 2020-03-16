<template>
<div>
    <navbar
        :page="page"
        @logout="logout"
        @loginPage="loginPage"
        @registerPage="registerPage"
    ></navbar>
    <loading
        v-if="loading"
    ></loading>
    <register-page
        v-if="!loading && !userlogin && page==='register'"
        :message="message"
        @register="register"
    ></register-page>
    <login-page
        v-else-if="!loading && !userlogin && page==='login'"
        :message="message"
        @login="login"
    ></login-page>
    <dashboard-container
        v-if="!loading && userlogin && page==='dashboard'"
        :categories="categories"
        :prioritylist="prioritylist"
        :items="items"
        :storage="storage"
        @create="create"
        @fetchItems="fetchItems"
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
import LoginPage from './components/login-page';

export default {
    data() {
        return {
            appName: "kanban-app",
            page: "register",
            loading: false,
            userlogin: false,
            message: '',
            items: [],
            storage: {},
            categories: ['Backlog', 'Product', 'Development', 'Done'],
            prioritylist: ["Task", "Important", "Urgent", "Done"],
        }
    },
    components: {
        'register-page': RegisterPage,
        'navbar': Navbar,
        'loading': Loading,
        'dashboard-container': Dashboard,
        LoginPage,
    },
    methods: {
        create(obj) {
            console.log(obj);
            // date: "2021-12-31"
            // description: "testing 02"
            // priority: "Urgent"
            this.loading = true;
            axios({
                url: `http://localhost:3000/item`,
                method: `POST`,
                data: {
                    description: obj.description,
                    date: obj.date,
                    priority: obj.priority,
                },
                headers: {
                    token: this.storage.access_token,
                }
            })
            .then(result => {
                console.log(result.data);
                this.fetchItems();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(_ => {
                this.loading = false;
            })
        },
        register(obj) {
            // console.log('register', obj);
            this.loading = true;
            this.message = '';
            axios({
                url: "http://localhost:3000/register",
                method: "POST",
                data: obj
            })
            .then(result => {
                this.storage.access_token = result.data.token;
                this.storage.name = result.data.name;
                this.storage.avaurl = result.data.avaurl;
                this.storage.email = result.data.email;
                localStorage.setItem(this.appName, JSON.stringify(this.storage));
                this.userlogin = true;
            })
            .catch(err => {
                console.log(err);
                this.page = 'register';
            })
            .finally(_ => {
                this.loading = false;
            })
        },
        login(obj) {
            this.loading = true;
            this.message = '';
            axios({
                url: 'http://localhost:3000/login',
                method: "POST",
                data: obj,
            })
            .then(result=> {
                // token: ""
                // name: "test01"
                // avaurl: "https://api.adorable.io/avatars/40/test01@mail.com.png"
                // email: "test01@mail.com"
                this.storage.access_token = result.data.token;
                this.storage.name = result.data.name;
                this.storage.avaurl = result.data.avaurl;
                this.storage.email = result.data.email;
                localStorage.setItem(this.appName, JSON.stringify(this.storage));
                this.userlogin = true;
                this.fetchItems();
                this.page = 'dashboard';
            })
            .catch(err => {
                // console.log(err.response);
                this.page = 'login';
            })
            .finally(_ => {
                this.loading = false;
            });
        },
        cekLogin() {
            this.loading = true;
            let storage = JSON.parse(localStorage.getItem(this.appName));
            let token = '';

            if (storage) {
                token = storage.access_token;
                axios({
                    url: `http://localhost:3000/cekLogin`,
                    method: `GET`,
                    headers: {
                        token,
                    }
                })
                .then(result => {
                    this.storage.access_token = result.data.token;
                    this.storage.name = result.data.name;
                    this.storage.avaurl = result.data.avaurl;
                    this.storage.email = result.data.email;
                    localStorage.setItem(this.appName, JSON.stringify(this.storage));
                    this.userlogin = true;
                    this.fetchItems();
                    this.page = 'dashboard';
                })
                .catch(err => {
                    console.log('err');
                    this.page = 'register';
                })
                .finally(_ => {
                    this.loading = false;
                });
            } else {
                this.loading = false;
            }
        },
        logout() {
            localStorage.clear();
            this.userlogin = false;
            this.storage = {};
            this.page = 'login';
        },
        loginPage() {
            this.page = 'login';
        },
        registerPage() {
            this.page = 'register';
        },
        fetchItems() {
            this.loading = true;
            axios({
                url: `http://localhost:3000/item`,
                method: `GET`,
                headers: {
                    token: this.storage.access_token,
                }
            })
            .then(result => {
                console.log(result.data);
                this.items = result.data;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(_ => {
                this.loading = false;
                console.log(this.items);
            });
        },
    },
    created() {
        this.cekLogin();
    }
}
</script>

<style>
    @import './assets/style.css'
</style>