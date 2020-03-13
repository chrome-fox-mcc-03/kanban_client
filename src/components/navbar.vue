<template>
  <div class="nav1">
            <ul class="nav2" style="margin: 0%;">
                <li id="Home">
                    <button type="button" class="btn btn-primary" >
                        Home
                    </button>
                </li>
                <li v-if="!isLogin" id="Register">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#RegisterModal">
                        Register
                    </button>
                </li>
                <li v-if="!isLogin" id="Login">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#LoginModal">
                        Login
                    </button>
                </li>
                <li>
                   <g-signin-button v-if="!isLogin"
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                    </g-signin-button>
                </li>
            </ul>
            <ul class="nav2">
                <li v-if="isLogin" id="Logout">
                    <button type="button" @click="logout() + signOut()" class="btn btn-primary" >
                        Logout
                    </button>
                </li>
                <li>
                 
                </li>
            </ul>
        </div>
</template>

<script>
    import googlelogin from './googlesignin.vue'
export default {
    props: ["isLogin"],
    data() {
        return {
            /**
             * The Auth2 parameters, as seen on
             * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
             * As the very least, a valid client_id must present.
             * @type {Object} 
             */
            googleSignInParams: {
                client_id: '1025007694828-ihmb2m11jrfubgbkp40n244kldd1ul8u.apps.googleusercontent.com'
            }
        }
    },
    methods : {
        logout() {
            this.$emit('logout')
        },
        onSignInSuccess (googleUser) {
            console.log(googleUser)
            this.$emit('onSignInSuccess', googleUser)
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            this.$emit("onSignInError", error)
        },
        signOut() {
            this.$emit('signOut')
        }
  },
    
    components : {
        googlelogin
    }


}
</script>

<style>

</style>