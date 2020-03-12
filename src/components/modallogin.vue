<template>
  <div class="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="login">
                        Email:<br>
                        <input type="email" v-model="Email"><br>
                        Password:<br>
                        <input type="password" v-model="Password"><br>
                        <br>
                        Or<br>
                        <div class="g-signin2"  data-onsuccess="onSignIn"></div><br><br>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <input type="submit" class="btn btn-primary" value="Login"/>
                    </form>
            </div>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            Email: '',
            Password: '', //Login
        }
    },
    methods: {
        login() {
            let data = {
                Email: this.Email,
                Password: this.Password
            }
            this.Email = ''
            this.Password = ''
            this.$emit('login', data)
        }
    }
}
</script>

<style>

</style>