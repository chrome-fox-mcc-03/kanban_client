<template>
    <section class="form-section">
        <lottie-player
            v-if="loading" 
            src="https://assets9.lottiefiles.com/datafiles/cb81834f3b75c3d2aba9d8a58ad1f408/AE_JSON/loader1.json"  
            background="transparent"  
            speed="1"
            style="width: 300px; height: 300px;"  
            loop  
            autoplay >
        </lottie-player>
        <!--Login Form Section-->
        <section class="login-section">
            <div class="form-reglog form-group border border-secondary shadow shadow-large">
                <div style="margin-bottom: 10px;">
                    <h4>Login Form</h4>
                </div>
                <form class="login-form" @submit.prevent="login">
                    <div style="margin-bottom: 10px;">
                        <label class="label-form" for="email">Email :</label>
                        <input v-model="loginInput.email" class="input-form" type="text" id="email" placeholder="email..."><br>
                        <label class="label-form" for="password">Password :</label>
                        <input v-model="loginInput.password" class="input-form" type="password" id="password" placeholder="password..."><br>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div style="margin-bottom: 10px;">
                    <p>or login with:</p>
                    <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                    </g-signin-button>
                </div>
                <div style="margin-bottom: 10px;">
                    <p>don't have an account? <a class="paper-btn btn-small" v-on:click="$emit('changePage', 'register')">Register</a></p>
                </div>
            </div>
        </section>
        
    </section>
</template>

<script>

import axios from 'axios'

export default {
    name: "LoginSection",
    data(){
        return {
            loginInput : {
                email : '',
                password : ''
            },
            loading : false,
            googleSignInParams: {
                client_id: '575714057742-qgvh86s8dbqs57nc91ef9leb55r8egaj.apps.googleusercontent.com'
            }
        }
    },
    methods : {
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            const profile = googleUser.getBasicProfile() // etc etc
            const g_idToken = googleUser.getAuthResponse().id_token;
            console.log(profile);
            axios({
                method: 'POST',
                url: 'https://thawing-hollows-08155.herokuapp.com/loginGoogle',
                headers: {
                        'token': g_idToken
                    }
            }).then((response) => {
                localStorage.setItem('access_token',response.data.access_token)
                this.$emit('changePage', 'content-section')
                this.$emit('fetchTodo')
            }).catch((err) => {
                console.log(err);
            })            
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)

        },
        login : function(){
            // console.log(this.loginInput.email, this.loginInput.password);
            const email = this.loginInput.email
            const password = this.loginInput.password
            
            this.loading = true
            axios({
                method: 'POST',
                url: 'https://thawing-hollows-08155.herokuapp.com/login',
                data : {
                    email,
                    password
                }
            }).then((response) => {
                localStorage.setItem('access_token',response.data.access_token)
                this.$emit('changePage', 'content-section')
                this.$emit('fetchTodo')
            }).catch((err) => {
                console.log(err);
            }).finally(_ => {
                this.loading = false
            })
            
        },
       
    }

}
</script>

<style scoped>

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

.form-reglog {
    background-color: ivory;
}

.form-section {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-group {
    width: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;;
}

.login-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>