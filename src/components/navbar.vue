<template>
<div class="app-navbar-div position-absolute container-fluid">
    <div class="row">
        <div class="col-3 left-corner-nav text-white">
            
        </div>
        <div class="col-6 middle-middle-nav text-white textnav">
            <i class="fas fa-check"></i>
            &nbsp;
            The Boring Kanban
        </div>
        <div class="col-3 right-corner-nav text-white">
            <div v-if="page==='dashboard'" class="dropdown">
                <div class="dropdown-toggle is-my-link" data-toggle="dropdown" aria-haspopup="true" id="rightNavDropDown">
                    &nbsp;
                    Profile
                    &nbsp;
                </div>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="rightNavDropDown">
                    <a @click="logout" class="dropdown-item text-center" href="#"><i class="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
                </div>
            </div>
            <div v-else-if="!userlogin && page==='register'">
                <input @click.prevent="loginPage" type="submit" class="btn status-yellow" value="Login">
            </div>
            <div v-else-if="!userlogin && page==='login'">
                <input @click.prevent="registerPage" type="submit" class="btn status-yellow" value="Register">
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        userlogin: Boolean,
        page: String,
    },
    data() {
        return {
            logEmail: '',
            logPass: '',
        }
    },
    name: "navbar",
    methods: {
        logout() {
            this.$emit('logout');
        },
        loginPage() {
            this.$emit('loginPage');
        },
        registerPage() {
            this.$emit('registerPage');
        },
    },
}
</script>

<style>

</style>