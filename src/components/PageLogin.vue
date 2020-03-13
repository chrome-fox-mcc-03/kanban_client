<template>
    <section id="form-login" v-if="currentPage == 'loginPage' && !token">    
        <div class="container">
            <div class="row justify-content-md-center">
                <form-login @login="login"> </form-login>
            </div>
        </div>
    </section>
</template>

<script>
import FormLogin from './PageLoginForm'
export default {
    name: 'PageLogin',
    props: ['currentPage','token'],
    data() {
        return {
            // currentPage : 'loginPage',
            // token: localStorage.getItem('token')
        }
    },
    methods: {
        login (payload) {
            this.$emit('login',payload)
        }
    },
    components: {
        FormLogin
    }
}
</script>

<style>

</style>