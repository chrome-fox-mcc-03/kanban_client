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
                        </div>
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
const baseUrl = `http://localhost:3000`
export default {
    name: "LoginForm",
    data () {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login() {            
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
                    localStorage.setItem("token", result.data.token)
                    this.$emit("afterLogin", "board")
                    this.$emit("loginStatus", true)
                })
                .catch(err => {
                    console.log(err, "errorr");
                })
        }
    }

}
</script>

<style>

</style>