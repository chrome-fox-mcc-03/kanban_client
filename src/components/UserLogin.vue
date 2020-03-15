<template>

    <div id="login-canvas" uk-offcanvas>

        <div class="uk-offcanvas-bar login-page">
            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <fieldset class="uk-fieldset">
                <legend class="uk-legend">LOGIN</legend>
                <form id="login-form">

                    <div class="uk-margin">
                        <!-- Email -->
                        <div class="uk-form-controls uk-inline">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input v-model="userEmail" class="uk-input uk-form-width-medium" id="login-email-input"
                                type="text" placeholder="E-mail">
                        </div>
                        <br>
                        <!-- Password -->
                        <div class="uk-form-controls uk-inline">
                            <span class="uk-form-icon uk-form-icon" uk-icon="icon: lock"></span>
                            <input v-model="userPassword" class="uk-input uk-form-width-medium"
                                id="login-password-input" type="password" placeholder="Password">
                        </div>
                        <br>
                        <button @click.prevent="login" class="uk-button">Login</button>
                        <div style="margin-top: 25%;">
                            <p>OR</p>
                        </div>
                        <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
                            Sign in with Google
                        </g-signin-button>
                        <br>
                </form>
            </fieldset>
        </div>

    </div>

</template>

<script>
    import GSignInButton from 'vue-google-signin-button'

    export default {

        name: "UserLogin",
        data() {
            return {
                userEmail: "",
                userPassword: "",
                googleSignInParams: {
                    client_id: '787046307084-ghs8jhgtoebd8t66fbl2ql17tq6f30ck.apps.googleusercontent.com'
                }
            }
        },
        methods: {
            login() {
                let data = {
                    email: this.userEmail,
                    password: this.userPassword
                }
                this.$emit('login', data)
            },
            onSignInSuccess(googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const id_token = googleUser.getAuthResponse().id_token;
                this.$emit('onSignInSuccess', id_token )
            },
            onSignInError(error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            }
        }
    }
</script>

<style scoped>
    .uk-card-text:hover {
        color: black;
    }
    .g-signin-button {
        /* This is where you control how the button looks. Be creative! */
        cursor: pointer;
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }
</style>