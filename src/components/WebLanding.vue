<template>

    <section class="landing-page">
        <!-- Kanban Intro -->
        <div class="kanban-introduction">
            <h2><b>Kanban</b></h2>
            <p style="text-align: center;" >
                <b>kan·ban</b>
                <br>
                /ˈkänbän/
                <br><br>
            </p>
            <p>
                &emsp; &emsp; <b>Kanban</b> is a visual signal that's used to trigger an action. The word <b>kanban</b> is Japanese and roughly translated means “card you can see.” Toyota introduced and refined the use of kanban in a relay system to standardize the flow of parts in their just-in-time (JIT) production lines in the 1950s. 
                <br>
                <i>WhatIs.com</i>
            </p>
        </div>

        <!-- Button -->
        <!-- <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #login-canvas">Login</button>
        <button class="uk-button uk-button-default" type="button" uk-toggle="target: #register-canvas">Register</button> -->
        <!-- LOGIN CANVAS -->
        <user-login @login="login" @onSignInSuccess="onSignInSuccess"></user-login>

        <!-- REGISTER CANVAS -->
        <user-register @register="register"></user-register>


    
    </section>

</template>

<script>
import UserLogin from './UserLogin'
import UserRegister from './UserRegister'

export default {
    name: 'WebLanding',
    components: {
        UserLogin,
        UserRegister

    },
    methods: {
        login(data) {
            this.$emit('login', data)
        },
        register(data) {
            this.$emit('register', data)
        },
        onSignInSuccess(id_token) {
            this.$emit('onSignInSuccess', id_token)
        }
    }
}
</script>

<style scoped>



</style>