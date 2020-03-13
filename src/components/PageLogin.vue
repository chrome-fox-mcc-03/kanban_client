<template>
    <section id="page-login">
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

    </section>
</template>

<script>
export default {
    name : 'LoginPage',
    data () {
        return {
            userData : {
                email : '',
                password : '',
            }
        }
    },
    methods : {
        login(){
            const email = this.userData.email;
            const password = this.userData.password;

            const userData = {
                email,
                password
            }

            this.$emit('login', userData) ;
        }
    }

}
</script>

<style>

</style>