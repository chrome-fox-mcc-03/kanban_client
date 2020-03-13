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
                        <button type="submit" class="btn btn-secondary">Submit</button>
                        <p class="text-danger" v-if="error"> error nih</p>
                      </form>
                </div>
                <div class="col-md-4">
                    
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
const baseUrl = `http://localhost:3000`
export default {
    name: "RegisterForm",
     data () {
        return {
            email: "",
            password: "",
            error: false
        }
    },
    methods: {
        register() {            
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
                  localStorage.setItem("token", result.data.token)
                  this.$emit("afterRegister", "board")
                  this.$emit("loginStatus", true)
                })
                .catch(err => {
                  this.error = true
                  console.log(err.response, "ini errorr");
                })
        }
    }
}
</script>

<style>

</style>