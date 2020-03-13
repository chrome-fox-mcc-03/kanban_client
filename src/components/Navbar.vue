<template>
    <div class="bg" v-show="currentPage == 'registerPage' && !token|| currentPage == 'loginPage' && !token">
        <div class="bg-2">
            <nav class="nav navbar-default navbar-fixed-top">
                <div class="container">
                    <div class="col-md-12">
                        <div class="navbar">
                            <a class="navbar-brand" href="https://github.com/MickeyStrike" target="_blank"> <img src="../../image/mickeystrike2.png" width="180" height="30"></a>
                            <ul class="navbar nav">
                                <li class="nav-item">
                                    <a @click="changePage('loginPage')" class="nav-link login" id="login"> Login </a>
                                </li>
                                <li class="nav-item">
                                    <a @click="changePage('registerPage')" class="nav-link register" id="register"> Register </a>
                                </li>
                            </ul>
                        </div>
                        <div class="navbar-collapse collapse" id="navbarSupportedContent">
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: localStorage.getItem('token')
        }
    },
    props : ['currentPage'],
    methods: {
        changePage (page) {
            this.$emit('changePage',page)
        },
    }
}
</script>

<style>

</style>