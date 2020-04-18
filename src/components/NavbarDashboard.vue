<template>
    <nav class="nav navbar-default navbar-fixed-top">
        <div class="container">
            <div class="col-md-12">
                <div class="navbar">
                    <a class="navbar-brand" href="https://github.com/MickeyStrike" target="_blank"> <img src="../../image/mickeystrike2.png" width="180" height="30"></a>
                    <ul class="navbar nav">
                        <li class="nav-item">
                            <a class="nav-link login" id="login" @click.prevent="logout()"> Logout </a>
                        </li>
                    </ul>
                </div>
                <div class="navbar-collapse collapse" id="navbarSupportedContent">
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods : {
        logout() {
            this.$emit('logout',{})
        }
    }
}
</script>

<style>

</style>