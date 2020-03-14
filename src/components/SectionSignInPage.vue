<template>
    <section id="login-page">
        <div class="login-bg">
            <img src="../login-bg.png" alt="">
        </div>
        <div class="login-container">
            <div class="login-form">
                <img @click.prevent="changePage('landing-page')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1959125971582004485-256.png" alt="">
                <form @submit.prevent="logMeIn">
                    <h2 class="display-6">Sign In</h2>
                    <div class="form-group">
                        <input v-model="userDataLogIn.email" type="text" class="form-control" id="signin-email" placeholder="Email/Username">
                    </div>
                    <div class="form-group">
                        <input v-model="userDataLogIn.password" type="password" class="form-control" id="signin-password" placeholder="Password">
                    </div>
                    <input type="submit" class="btn btn-primary signin-btn" value="Sign In">
            </form>
                <g-signin-button
                    :params="googleSignInParams"
                    @success="onSignInSuccess">
                    Sign in with Google
                </g-signin-button>
                <a href="" @click.prevent="changePage('sign-up-page')">Don't have an account? Sign up here.</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data: () => {
        return {
            userDataLogIn: {
                email: '',
                password: ''
            },
            googleSignInParams: {
                client_id: '253949783670-08doajfatkaqci890m9utmpdstevcb9g.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        resetPage(){
            for(const key in this.userDataLogIn) this.userDataLogIn[key] = ''
        },
        changePage(page){
            this.resetPage()
            this.$emit('page', page)
        },
        logMeIn: function(){
            this.$emit('logMeIn', this.userDataLogIn)
        },
        onSignInSuccess(googleUser){
            this.$emit('onSignIn', googleUser)
        }
    }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  margin-top: 0;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  cursor: pointer;
  width: 72%;
  transition: background-color 0.5s ease;
}
.g-signin-button:hover {
  background-color: #abc3ec;
}

.signin-btn:hover {
    color: rgb(255,255,255, 0.3);    
}
.signin-btn {
    transition: color 0.5s ease;
}

</style>