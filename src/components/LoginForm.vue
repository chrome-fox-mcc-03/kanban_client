<template>
   <div class="container">
            <div class="row mt-5">
                <div class="col-md-4">
                </div>
                <div class="col-md-4">
                    <h3>Login</h3>
                    <form @submit.prevent="login()">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
                          <p class="text-danger font-weight-light" v-if="error">{{ error }}</p>
                        </div>
                        <button type="submit" class="btn btn-secondary">Submit</button>
                      </form>
                    <button type="button" @click.prevent="onSignIn" class="btn btn-outline-success mt-2">Google login</button>
                </div>
                <div class="col-md-4">
                    
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
const baseUrl = `https://shielded-cove-72197.herokuapp.com`
export default {
    name: "LoginForm",
    data () {
        return {
            email: "",
            password: "",
            error: ""
        }
    },
    methods: {
        login() {    
            this.$emit('changeLoading')        
            let data = {
                email: this.email,
                password: this.password
            }            
            axios({
                method: "POST",
                url: `${baseUrl}/login`,
                data: data
            })
                .then(result => {  
                    this.$emit('changeLoading')            
                    localStorage.setItem("token", result.data.token)
                    this.$emit("changePage", "board")
                    this.$emit("changeLogin", true)
                    this.$emit("fetch")
                })
                .catch(err => {
                    this.error = ""
                    this.$emit('changeLoading')
                    this.error = err.response.data.error
                })
        },
        onSignIn() {
            this.$emit('changeLoading')
            this.$gAuth
                .signIn()
                .then(googleUser => {
                    const token = googleUser.getAuthResponse().id_token;
                    return axios({
                        method : 'POST',
                        url: `${baseUrl}/signInGoogle`,
                        headers: {
                            token: token
                        }
                    })
                })
                .then(result => {  
                    this.$emit('changeLoading')                  
                    localStorage.setItem("token", result.data.token)
                    this.$emit('changePage', 'board')
                    this.$emit("changeLogin", true)
                    this.$emit("fetch")

                })
                .catch(err => {
                    this.$emit('changeLoading')
                    this.error = err.response.data.error
                })
        },
        signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        }
    }

}
</script>

<style>

</style>