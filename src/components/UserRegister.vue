<template>
    <div id="register-canvas" uk-offcanvas="flip: true; overlay: true">
        <div class="uk-offcanvas-bar register-page">

            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <fieldset class="uk-fieldset">
                <legend class="uk-legend">REGISTER</legend>
                <form id="register-form">

                    <div class="uk-margin">
                        <!-- Email -->
                        <div class="uk-form-controls uk-inline">
                            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: user"></span>
                            <input v-model="userEmail" class="uk-input uk-form-width-medium" id="register-email-input" type="text"
                                placeholder="Email">
                        </div>
                        <br>
                        <!-- Password -->
                        <div class="uk-form-controls uk-inline">
                            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                            <input v-model="userPassword" class="uk-input uk-form-width-medium" id="register-password-input" type="password"
                                placeholder="Password">
                        </div>
                        <br>
                        <!-- Full Name -->
                        <div class="uk-form-controls uk-inline">
                            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: users"></span>
                            <input v-model="userFullname" class="uk-input uk-form-width-medium" id="register-fullname-input" type="text"
                                placeholder="Full Name">
                        </div>
                        <br>
                        <button @click.prevent="register" class="uk-button">Register</button>
                </form>
            </fieldset>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserRegister",
        data() {
            return {
                userEmail: "",
                userPassword: "",
                userFullname: ""
            }
        },
        methods: {
            register() {
                let data = {
                    email: this.userEmail,
                    password: this.userPassword,
                    fullname: this.userFullname
                }
                this.$emit('register', data)
            }
        }
    }
</script>

<style scoped>

.uk-button:focus, .uk-button:hover {
    color: black !important;
}

</style>