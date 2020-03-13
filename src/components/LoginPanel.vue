<template>
    <div
    
    >
        <div class="modal-dialog text-center">
            <div class="col-sm-20 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                        <img src="https://i.pinimg.com/originals/22/6d/5c/226d5cd7f24a676a8c1925bd061cd33d.gif" alt="" srcset="">
                    </div>
                    <div class="col-12 form-input">
                        <form @submit.prevent="login" >
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
                             <!-- <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin> -->
                            <!-- </div> -->
                        </form>
                        <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axiosKanban from '../config/index'

export default {
    name: "LoginPanel",
    data() {
        return {
            emailLogin: '',
            passwordLogin: '',
            params: {
                    client_id: "194565501537-qmb464ef83ic0suedoturuv0urp3s4jp.apps.googleusercontent.com"
                },
            renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
        }
    },
    components: {
        GoogleLogin
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
        onSuccess(googleUser){
            console.log('KE HOT NIHHHH')
            // this.$gAuth.signIn()
            //     .then(googleUser => {
            //         let access_token = googleUser.getAuthResponse().id_token
            //         return axiosKanban({
            //             url: `/googleSignIn`,
            //             method: `post`,
            //             headers: {
            //                 access_token : access_token
            //             }
            //         })
            //     })
            //     .then(({ data }) => {
            //         localStorage.setItem('access_token', data.access_token)
            //         this.$emit('changePage', 'dashboard')
            //     })
            //     .catch(error => {
            //         this.$vToastify.error(err.response.data.message);
            //     })
        }
    }
}
</script>

<style>
/* 
.password{

} */

</style>