<template>
<div>
    <navbar
        :page="page"
        @logout="logout"
        @loginPage="loginPage"
        @registerPage="registerPage"
    ></navbar>
    <loading
        v-if="loading || page === 'loading'"
    ></loading>
    <register-page
        v-if="!loading && !userlogin && page === 'register'"
        :message="message"
        @register="register"
    ></register-page>
    <login-page
        v-else-if="!loading && !userlogin && page === 'login'"
        :message="message"
        @login="login"
    ></login-page>
    <dashboard-container
        v-if="!loading && userlogin && page === 'dashboard'"
        :categories="categories"
        :prioritylist="prioritylist"
        :items="items"
        :storage="storage"
        @create="create"
        @fetchItems="fetchItems"
        @submitEdit="submitEdit"
        @deleteItem="deleteItem"
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
    computed: {
        items: function() {
            return this.fetchedItems
        }
    },
    data() {
        return {
            appName: "kanban-app",
            // serverUrl: "http://localhost:3000",
            serverUrl: "https://sleepy-cliffs-63071.herokuapp.com",
            page: "register",
            loading: false,
            userlogin: false,
            message: '',
            fetchedItems: [],
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
            this.loading = true;
            axios({
                url: `${this.serverUrl}/item`,
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
                url: `${this.serverUrl}/register`,
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
                this.page = 'dashboard'
            })
            .catch(err => {
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
                url: `${this.serverUrl}/login`,
                method: "POST",
                data: obj,
            })
            .then(result=> {
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
                    url: `${this.serverUrl}/cekLogin`,
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
                url: `${this.serverUrl}/item`,
                method: `GET`,
                headers: {
                    token: this.storage.access_token,
                }
            })
                .then(result => {
                    // console.log(result.data);
                    this.fetchedItems = result.data;
                })
                .catch(err => {
                    console.log(err.response);
                })
                .finally(_ => {
                    this.loading = false;
                    // console.log(this.items);
                });
        },
        submitEdit(editObj) {
            // console.log(editObj)
            const { id } = editObj;
            let body = {...editObj}
            delete body.id;
            this.loading = true;
            // console.log('edit', id, body)
            axios({
                url: `${this.serverUrl}/item/${id}`,
                method: 'PUT',
                headers: {
                    token: this.storage.access_token
                },
                data: {...body}
            })
                .then(_ => {
                    return axios({
                        url: `${this.serverUrl}/item`,
                        method: `GET`,
                        headers: {
                            token: this.storage.access_token,
                        }
                    })
                })
                .then(result => {
                    // console.log(result.data);
                    this.fetchedItems = result.data;
                })
                .catch(err => {
                    console.log(err.response)
                })
                .finally(_ => {
                    this.loading = false;
                })
        },
        deleteItem(id) {
            this.loading = true;
            axios({
                url: `${this.serverUrl}/item/${id}`,
                method: 'DELETE',
                headers: {
                    token: this.storage.access_token
                }
            })
                .then(_ => {
                    return axios({
                        url: `${this.serverUrl}/item`,
                        method: `GET`,
                        headers: {
                            token: this.storage.access_token,
                        }
                    })
                })
                .then(result => {
                    this.fetchedItems = result.data;
                    this.page = 'dashboard'
                })
                .catch(err => {
                    console.log(err.response);
                })
                .finally(_ => {
                    this.loading = false;
                })
        }
    },
    created() {
        this.cekLogin();
    }
}
</script>

<style>
    @import './assets/style.css'
</style>