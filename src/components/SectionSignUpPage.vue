<template>
    <section id="sign-up-page">
        <div class="sign-up-bg">
                <img src="../login-bg.png" alt="">
            </div>
            <div class="sign-up-container">
                <div class="sign-up-form">
                    <img @click.prevent="changePage('landing-page')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1959125971582004485-256.png" alt="">
                    <form @submit.prevent="signMeUp">
                        <h2 class="display-6">Sign Up</h2>
                        <div class="form-group">
                            <input v-model="userData.email" type="email" class="form-control" id="sign-up-email" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input v-model="userData.name" type="text" class="form-control" id="sign-up-name" placeholder="Full Name">
                            </div>
                            <div class="form-group">
                            <input v-model="userData.username" type="text" class="form-control" id="sign-up-username" placeholder="Username">
                            </div>
                        <div class="form-group">
                            <input v-model="userData.password" type="password" class="form-control" id="sign-up-password" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <input v-model="userData.passwordConfirm" type="password" class="form-control" id="sign-up-password-2" placeholder="Confirm Password">
                        </div>
                        <button type="submit" class="btn btn-primary">Sign Me Up Fam!</button>
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
                email: '',
                name: '',
                username: '',
                password: '',
                passwordConfirm: ''
            }
        }
    },
    methods: {
        resetPage(){
            for(const key in this.userData) this.userData[key] = ''
        },
        changePage(page){
            this.resetPage()
            this.$emit('page', page)
        },
        signMeUp(){
            this.$emit('signMeUp', this.userData)
        }
    }

}
</script>

<style>

</style>