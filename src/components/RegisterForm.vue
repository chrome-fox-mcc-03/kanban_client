<template>
    <section class="register-section">
        <div class=" form-reglog form-group border border-secondary shadow shadow-large">
            <form @submit.prevent="register">
                <div style="margin-bottom: 10px;">
                    <h4>Register Form</h4>
                </div>
                <div style="margin-bottom: 10px;">
                    <label class="label-form" for="name">Name :</label>
                    <input v-model="registerInput.name" class="input-form" type="text" id="name" placeholder="Your name..."><br>
                    <label class="label-form" for="email">Email :</label>
                    <input v-model="registerInput.email" class="input-form" type="text" id="email" placeholder="email..."><br>
                    <label class="label-form" for="password">Password :</label>
                    <input v-model="registerInput.password" class="input-form" type="password" id="password" placeholder="password..."><br>
                </div>
                <div style="margin-bottom: 10px;">
                    <button type="submit">Register</button>
                </div>
            </form>
            <div style="margin-bottom: 10px;">
                <p>already have an account? <a class="paper-btn btn-small" v-on:click="$emit('changePage', 'login')">Login</a></p>
            </div>
            </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'RegisterSection',
    data() {
        return {
            registerInput : {
                name : '',
                email : '',
                password : ''
            },
            successInfo : false
        }
    },
    methods : {
        register : function(){
            const name = this.registerInput.name
            const email = this.registerInput.email
            const password = this.registerInput.password

            axios({
                method : 'POST',
                url : 'http://localhost:3000/register',
                data : {
                    name,
                    email,
                    password
                }
            })
                .then((response) => {
                    this.$emit('showAlert', 'success')
                    this.$emit('changePage', 'login')
                }).catch((err) => {
                    console.log(err);
                });

        },
        
    }

}
</script>

<style>


.form-group {
    width: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;;
}
</style>