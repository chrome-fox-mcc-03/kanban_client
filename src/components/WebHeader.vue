<template>

    <section class="header" uk-sticky style="display:;">
        <button v-if="isLogin" style="background-color:#393e46;border: none"></button>
        <button v-if="!isLogin" class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #login-canvas">Login</button>
        <p>Kanban</p>
        <button v-if="isLogin" @click.prevent="logout" class="uk-button uk-button-danger">LOGOUT</button>
        <button v-if="!isLogin" class="uk-button uk-button-default" type="button" uk-toggle="target: #register-canvas">Register</button>
    </section>

</template>

<script>
export default {
    name : 'WebHeader',
    data() {
        return {

        }
    },
    methods: {
        logout() {
            this.$emit("logout")
        }
    },
    props: [ 'isLogin' ]
}
</script>

<style>

</style>