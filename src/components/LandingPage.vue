<template>
    <div>
        <div class="jumbotron">
            <h1 class="display-4">Welcome to Kanban</h1>
            <p class="lead">This app will help you!</p>
            <hr class="my-4">
            <a class="btn btn-primary" href="#" role="button" @click="$bvModal.show('register')">Register</a>
            <!-- <span style="cursor: pointer;" data-toggle="modal" data-target="#login">Already have account? Login
                here</span> -->
            <span style="cursor: pointer;" data-toggle="modal" data-target="#login" @click="changeStatus">Already have account? Login
                here</span>
            <br><br>
            <!-- <div id="google-signin-btn"></div> -->
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        changeStatus() {
            this.$emit("changeStatus");
        }
    }
    // mounted() {
    //     gapi.signin2.render('google-signin-btn', { // this is the button "id"
    //         onsuccess: this.onSignIn // note, no "()" here
    //     })
    // }
}
</script>

<style>

</style>