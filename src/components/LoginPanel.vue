<template>
    <div
    @submit.prevent="login"
    >
        <div class="modal-dialog text-center">
            <div class="col-sm-20 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                        <img src="https://i.pinimg.com/originals/22/6d/5c/226d5cd7f24a676a8c1925bd061cd33d.gif" alt="" srcset="">
                    </div>
                    <div class="col-12 form-input">
                        <form >
                            <h1>LOGIN</h1>
                            <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" aria-describedby="emailHelp" v-model="emailLogin">
                            </div>
                            <div class="form-group">
                            <input type="password" class="form-control password" id="exampleInputPassword1" placeholder="Password" v-model="passwordLogin">
                            </div>
                            
                            <!-- <div class="d-flex justify-content-center"> -->
                                <a href="#" @click="registerPanel">Register</a>
                                <button type="submit" class="btn btn-success">Submit</button>
                            <!-- </div> -->
                            <center style= margin:20px;>
                                <div class="g-signin2" data-onsuccess="onSignIn"></div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axiosKanban from '../config/index'

export default {
    name: "LoginPanel",
    data() {
        return {
            emailLogin: '',
            passwordLogin: ''
        }
    },
    methods: {
        registerPanel(){
            this.$emit('changePage', 'register')
        },
        login() {
            let userLogin= {
                email: this.emailLogin,
                password: this.passwordLogin
            }

            axiosKanban({
                method: 'POST',
                url: '/login',
                data: userLogin
            })
                .then(({data}) => {
                    this.$emit('changePage', 'dashboard')
                    localStorage.setItem('access_token', data.access_token)
                })
                .catch(err => {
                    this.$vToastify.error(err.response.data.message);
                    console.log(err.response.data.message)
                })
        },
        onSignIn(googleUser){
            let token_google = googleUser.getAuthResponse().id_token
            let profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            axiosKanban({
                method: "POST",
                url: "http://localhost:3000/googleSignIn",
                headers: {
                    token_google : token_google
                }
            })
                .done(({ access_token}) => {
                    localStorage.setItem("access_token", access_token)
                    isLogin()
                })
                .fail( err => {
                    this.$vToastify.error(err.response.data.message)
                })
        }
    }
}
</script>

<style>

.password{

}

</style>