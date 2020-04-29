<template>
    <div class="navbar">
        <div></div>
        <img src="./Kanbanium-White.svg" alt="Kanban">
        
        <div class="account">
            <div id="account-letter">
                {{ currentUser[0] }}
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
    data: function() {
        return {
            currentUser: localStorage.getItem('current_user')
        }
    },
    methods: {
        signOut() {
            localStorage.clear();
            this.$emit('changePage', 'landingPage')
        }
    }
}
</script>

<style scoped>
</style>