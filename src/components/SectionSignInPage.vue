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
                            <input v-model="userDataLogIn.email" type="email" class="form-control" id="signin-email" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input v-model="userDataLogIn.password" type="password" class="form-control" id="signin-password" placeholder="Password">
                        </div>
                        <input type="submit" class="btn btn-primary" value="Sign In">
                </form>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
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
    }
}
</script>

<style>

</style>