<template>
  <section id="sign-up-google-page">
      <div class="sign-up-google-bg">
                <img src="../login-bg.png" alt="">
            </div>
            <div class="sign-up-google-container">
                <div class="sign-up-google-form">
                    <img @click.prevent="changePage('landing-page')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1959125971582004485-256.png" alt="">
                    <form @submit.prevent="signMeUp">
                        <h2 class="display-6">Sign Up</h2>
                        <h3 class="display-6">You are almost done!</h3>
                        <div class="form-group">
                            <input v-model="userData.name" type="text" class="form-control" id="sign-up-google-name" placeholder="Full Name">
                            </div>
                            <div class="form-group">
                            <input v-model="userData.username" type="text" class="form-control" id="sign-up-google-username" placeholder="Username">
                            </div>
                        <div class="form-group">
                            <input v-model="userData.password" type="password" class="form-control" id="sign-up-google-password" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <input v-model="userData.passwordConfirm" type="password" class="form-control" id="sign-up-google-password-2" placeholder="Confirm Password">
                        </div>
                        <button type="submit" class="btn btn-primary">Set Me Up Fam!</button>
                    </form>
                </div>
        </div>
  </section>
</template>

<script>
export default {
    data: () => {
        return {
            userData: {
                name: '',
                username: '',
                password: '',
                passwordConfirm: ''
            },
        }
    },
    methods: {
        signMeUp(){
            this.$emit('signMeUp', this.userData)
        },
        resetPage(){
            for(const key in this.userData) this.userData[key] = ''
        },
        changePage(page){
            this.resetPage()
            this.$emit('page', page)
        }
    }

}
</script>

<style>

</style>