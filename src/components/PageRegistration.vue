<template>
    <section id="page-register">
        <h1>Registration Form</h1>
        <div class="row">
            <form @submit.prevent="register()" class="col s12">
                <div class="row">
                    <div class="input-field col s4">
                        <i class="material-icons prefix">account_circle</i>
                        <input v-model="userData.name" id="name-register" type="text" class="validate">
                        <label for="name-register">Name</label>
                    </div>
                    <div class="input-field col s4">
                        <i class="material-icons prefix">email</i>
                        <input v-model="userData.email" id="email-register" type="email" class="validate">
                        <label for="email-register">Email</label>
                    </div>
                    <div class="input-field col s4">
                        <i class="material-icons prefix">lock</i>
                        <input v-model="userData.password" id="password-register" type="password" class="validate">
                        <label for="password-register">Password</label>
                    </div>
                </div>
                <button class="btn waves-effect waves-light" type="submit" name="action">Register
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
    name : 'RegistrationPage',
    data () {
        return {
            userData : {
                name : '',
                email : '',
                password : '',
            }
        }

    },
    methods : {
        register(){
            const name = this.userData.name;
            const email = this.userData.email;
            const password = this.userData.password;

            const userData = {
                name,
                email,
                password
            }

            this.$emit('register', userData) ;
        }

    }


}
</script>

<style>

</style>