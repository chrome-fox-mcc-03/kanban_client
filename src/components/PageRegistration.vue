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
            </form>
        </div>
            <br>
            <p>- or -</p>
            <br>
            <p style="font-weight: bold;">Sign in with</p>
            <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                <a class="waves-effect waves-light btn-small"><img src="https://img.icons8.com/bubbles/30/000000/google-logo.png"/></a>
            </g-signin-button>
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
            },
            googleSignInParams: {
                client_id: '300212796737-706ht16fsvn19fsk18lieucrpmo9dni9.apps.googleusercontent.com'
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
        },
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            const profile = googleUser.getBasicProfile() // etc etc
            // console.log('profile :' , profile);
            const token = googleUser.getAuthResponse().id_token ;

            this.$emit('googleSignin', token)


        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        }


    }


}
</script>

<style>
    .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    /* background-color: #3c82f7; */
    color: #fff;
    /* box-shadow: 0 3px 0 #0f69ff; */
    }

</style>