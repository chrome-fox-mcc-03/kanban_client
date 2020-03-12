<template>
    <div  id="login-container" >
        <h1 class="login title">Login</h1>
        <form @submit.prevent="login()" id="login-form">
            <label class="email-label login" for="email">Email:</label><br>
            <input v-model="email" class="email-input login" type="text" id="email-login" name="email" ><br>
            <label class="password-label login" for="password">Password:</label><br>
            <input v-model="password" class="password-input login" type="password" id="password-login" name="password"><br><br>
            <input class="submit" type="submit" value="Login">
            <a id="register-word" @click="changePage('registerDisplay')">Doesn't have an account yet? Register here</a>
        </form>
        <div id="google-signin-btn"></div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            email: '',
            password: '',
            currentPage: '',
            
            googleButton: '<div id="googleSignIn" class="g-signin2" data-onsuccess="onSignIn"></div>'
        }
    },
    methods: {
        login: function () {
            let obj = {
                email: this.email,
                password: this.password
            }
            this.$emit('loginObj', obj)
        },
        changePage: function (inputPage) {
            this.currentPage = inputPage
            this.$emit('curPage', this.currentPage)
        },
        onSignIn: function(googleUser) {
            const profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            console.log('id_token: ' +id_token)
            axios({
                method: 'POST',
                url: "http://localhost:3000/loginGoogle",
                data: {
                    id_token
                } 
            })
                .then(response => {
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    this.$emit('loginGoogleSuccess')
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    mounted() {
    gapi.signin2.render('google-signin-btn', { // this is the button "id"
      onsuccess: this.onSignIn // note, no "()" here
    })
  }
}
</script>

<style>

</style>