<template>
   <div class="container">
            <div class="row mt-5">
                <div class="col-md-4">
                </div>
                <div class="col-md-4">
                    <h3>Register</h3>
                    <form @submit.prevent="register()">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
                        </div>
                          <p class="text-danger font-weight-light" v-for="data in error" :key="data">{{ String(data)  }}</p>
                        <button type="submit" class="btn btn-secondary">Submit</button>
                      </form>
                </div>
                <div class="col-md-4">
                    
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
const baseUrl = `https://shielded-cove-72197.herokuapp.com`
// const baseUrl = `http://localhost:3000`
export default {
    name: "RegisterForm",
     data () {
        return {
            email: "",
            password: "",
            error: []
        }
    },
    methods: {
        register() {     
            this.$emit('changeLoading')       
            let data = {
                email: this.email,
                password: this.password
            }            
            axios({
                method: "POST",
                url: `${baseUrl}/register`,
                data: data
            })
                .then(result => {   
                  this.$emit('changeLoading')
                  localStorage.setItem("token", result.data.token)
                  this.$emit("changePage", "board")
                  this.$emit("changeLogin", true)
                })
                .catch(err => {        
                  this.error = []                       
                  this.$emit('changeLoading')
                  if(typeof err.response.data.error === Array) {
                      this.error = err.response.data.error
                    } else {
                      this.error.push(err.response.data.error)
                  }
                })
        }
    }
}
</script>

<style>

</style>