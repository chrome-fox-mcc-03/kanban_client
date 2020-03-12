<template>
    <div>
        <!-- Navigation Bar -->
        <navigation-bar @changePage="changePage" @logout="logout" :isLogin="userData.isLogin" :avatar="userData.avatarUrl"></navigation-bar>

        <!-- Landing Page -->
        <landing-page v-if="!userData.isLogin && currentPage == 'landingPage'" ></landing-page>

        <!-- Registration Page -->
        <registration-page @register="register" v-if="!userData.isLogin && currentPage == 'regisPage'"></registration-page>

        <div>
            <h1 v-if="userData.isLogin" >haiiii</h1>
        </div>

        <!-- Login Page -->
        <login-page @login="login" v-if="!userData.isLogin && currentPage == 'loginPage'" ></login-page>

        <!-- <section v-if="!userData.isLogin && currentPage == 'loginPage'" id="page-login">
            <h1>Login Form</h1>
            <div class="row">
                <form @submit.prevent="login()" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">email</i>
                            <input v-model="userData.email" id="email-login" type="email" class="validate">
                            <label for="email-login">Email</label>
                        </div>
                        <div class="input-field col s6">
                            <i class="material-icons prefix">lock</i>
                            <input v-model="userData.password" id="password-login" type="password" class="validate">
                            <label for="password-login">Password</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action">Login
                        <i class="material-icons right">send</i>
                    </button>
                    <br>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                </form>
            </div>
        </section> -->

    </div>
</template>

<script>
import axios from 'axios'
import NavigationBar from './components/NavigationBar.vue'
import LandingPage from './components/LandingPage.vue'
import RegistrationPage from './components/RegistrationPage.vue'
import LoginPage from './components/LoginPage.vue'
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
            task : []
        }
    },
    components : {
        NavigationBar,
        LandingPage,
        RegistrationPage,
        LoginPage
    },
    created(){
        const access_token = localStorage.getItem('access_token') ;
        if (access_token) {
            this.userData.isLogin = true
            this.userData.avatarUrl = localStorage.getItem('avatar') ;
        }
    },
    methods : {
        changePage (page) {
            this.currentPage = page 
        },
        register (userData) {
            const name = userData.name;
            const email = userData.email;
            const password = userData.password;

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

                })
                .catch((error)=>{
                    console.log(error.response.data.errorMessage);
                })
        },

        login(userData) {
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
                })
                .catch((error)=>{
                    console.log(error.response.data.errorMessage);
                })
        },
        logout(){
            localStorage.clear() ;
            this.userData.isLogin = false ;
            changePage('landingPage')
        }
    }
}
</script>

<style>

</style>