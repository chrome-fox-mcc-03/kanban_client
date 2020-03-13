<template>
<div class="app-navbar-div position-absolute container-fluid">
    <div class="row">
        <div class="col-3 left-corner-nav text-white">
            Thu, 20 Feb 2020
        </div>
        <div class="col-6 middle-middle-nav text-white textnav">
            <i class="fas fa-check"></i>
            &nbsp;
            The Boring Kanban
        </div>
        <div class="col-3 right-corner-nav text-white">
            <div v-if="!userlogin" class="dropdown-toggle is-my-link" data-toggle="dropdown" aria-haspopup="true" id="rightNavDropDown">
                &nbsp;
                Login
                &nbsp;
                <div class="dropdown-menu dropdown-menu-right rounded bg-app-nav" aria-labelledby="rightNavDropDown">
                    <div class="m-1 p-1 text-center">
                        <form id="login-form">
                            <div class="form-group">
                                <input v-model="logEmail" type="email" class="form-control" id="login-email">
                                <small class="form-text text-white">Email</small>
                            </div>
                            <div class="form-group">
                                <input v-model="logPass" type="password" class="form-control" id="login-password">
                                <small class="form-text text-white">Password</small>
                            </div>
                            <input @click.prevent="login" type="submit" class="btn status-green" value="Login">
                        </form>
                    </div>
                </div>
            </div>
            <div v-else class="dropdown">
                <div class="dropdown-toggle is-my-link" data-toggle="dropdown" aria-haspopup="true" id="rightNavDropDown">
                    &nbsp;
                    Profile
                    &nbsp;
                </div>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="rightNavDropDown">
                    <a @click="logout" class="dropdown-item text-center" href="#"><i class="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        userlogin: Boolean,
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
        login() {
            console.log('login');
            console.log(this.logEmail, this.logPass);
            this.$emit('login', {email: this.logEmail, password: this.logPass})
            this.logEmail = ''
            this.logPass = ''
        }
    },
}
</script>

<style>

</style>