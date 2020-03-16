<template>
    <nav>
        <div class="nav-wrapper">
            <a v-on:click="changePage('landingPage')" href="#" id="logo" class="brand-logo"><img src="../assets/images/logo.png"></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li v-if="!isLogin" v-on:click="changePage('regisPage')" ><a id="btn-register" href="#">Register</a></li>
                <li v-if="!isLogin" v-on:click="changePage('loginPage')" ><a id="btn-login" href="#">Login</a></li>
                <li v-if="isLogin" v-on:click="logout()"><a id="btn-logout" href="#">Logout</a></li>
                <li v-if="isLogin"><img id="avatar" :src="avatar"></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name : 'NavigationBar',
    props: ['isLogin' , 'avatar'],
    data () {
        return {
        }
    },
    methods : {
        changePage(page) {
            this.$emit('changePage', page)
        },
        logout() {
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style> 