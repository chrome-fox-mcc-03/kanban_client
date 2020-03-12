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
            </ul>
            <ul class="nav2">
                <li v-if="isLogin" id="Logout">
                    <button type="button" @click="logout" class="btn btn-primary" >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
</template>

<script>
export default {
    props: ["isLogin"],
    data() {
        return {
            
        }
    },
    methods : {
        logout() {
            this.$emit('logout')
        }
    }


}
</script>

<style>

</style>