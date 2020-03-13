<template>
    <section id="form-register" v-if="currentPage == 'registerPage' && !token">
        <div class="container">
            <div class="row justify-content-md-center">
                <form-register @register="register"> </form-register>
            </div>
        </div>
    </section>
</template>

<script>
import FormRegister from './PageRegisterForm'
export default {
    name: 'PageRegister',
    props: ['currentPage'],
    data() {
        return {
            token: localStorage.getItem('token')
        }
    },
    methods: {
        register (payload) {
            this.$emit('register',payload)
        }
    },
    components: {
        FormRegister
    }
}
</script>

<style>

</style>