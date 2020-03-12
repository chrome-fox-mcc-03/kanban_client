<template>
    <div class="navbar">
        <div></div>
        <div id="app-title">
            <img src="./kanban-logo-simple (1).png" alt="Kanban">
        </div>
        <div class="account">
            <div id="account-letter">
                E
            </div>
            <div @click="signOut" class="account-menu">
                <p>Sign Out</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    methods: {
        signOut() {
            localStorage.clear();
            this.$emit('changePage', 'landingPage')
        }
    }
}
</script>

<style>

</style>