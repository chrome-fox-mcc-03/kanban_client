<template>
  <div class="modal fade" id="RegisterModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="register">
                        Email:<br>
                        <input v-model="Email" type="email" ><br>
                        Password:<br>
                        <input v-model="Password" type="password"><br>
                        <br>
                        
                    <button type="button"  class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <input type="submit" class="btn btn-primary" value="Register"/>
                    </form>
                    </div>
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
        register () {
            let data = {
                Email : this.Email,
                Password : this.Password
            }
            this.Email = ''
            this.Password = ''
            this.$emit('register',data)
        }
    }
}
</script>

<style>

</style>