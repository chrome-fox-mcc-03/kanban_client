<template>
    <div 
    class="modal-dialog text-center"
    @submit.prevent="register"
    >
        <div class="col-sm-20 main-section">
            <div class="modal-content">
                <div class="col-12 user-img">
                    <img src="https://i.pinimg.com/originals/6d/b9/88/6db988869c105086253a0c388796e1ea.gif" alt="" srcset="">
                </div>
                <div class="col-12 form-input">
                    <form >
                        <h1>REGISTER</h1>
                        <div class="form-group">
                          <input type="email" class="form-control" placeholder="Email" aria-describedby="emailHelp" v-model="emailRegister">
                        </div>
                        <div class="form-group">
                          <input type="password" class="form-control" placeholder="Password" v-model="passwordRegister">
                        </div>
                        
                        <a @click="login" href="#">Login</a>
                        <button type="submit" class="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosKanban from '../config'
export default {
    name: 'RegisterPanel',
    data() {
        return {
            emailRegister: "",
            passwordRegister: ""
        }
    },
    methods: {
        login(){
            this.$emit('changePage', 'login')
        },
        register(){
            let userRegister = {
                email : this.emailRegister,
                password : this.passwordRegister
            }
            console.log('masuk register');
            

            axiosKanban({
                method: 'POST',
                url: '/register',
                data: userRegister
            })
                .then(user => {
                    this.$emit('changePage', 'login')
                })
                .catch(err => {
                    console.log('masuk errorrr')
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>