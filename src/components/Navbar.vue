<template>
  <div id="navbar-container">
            <div class="navbar-div">
                <ul class="navbar-item up">
                    <li><i @click="changePage('loginDisplay')" class="icon fas fa-sign-in-alt"></i></li>
                    <li><i @click="changePage('homepageDisplay')" class="icon fas fa-home"></i></li>
                    <li><i  @click="changePage('addTaskDisplay')" class="icon fas fa-plus-square"></i></li>
                    <li><i @click="fetchCards()" class="icon far fa-list-alt"></i></li>
                    <li>#navbar4</li>
                    <li>#navbar5</li>
                </ul>
            </div>
            <div class="navbar-div">
                <ul class="navbar-item down">
                    <li><i @click="logout()" class="icon fas fa-sign-out-alt"></i></li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
    data: function () {
        return {
            currentPage: '',   
            isLogin: ''
        }
    },
    methods: {
        changePage(str) {
            console.log(str)
            this.currentPage = str
            this.$emit('curPage', this.currentPage)
        },
        logout() {
            this.$emit('logout')
        },
        fetchCards() {
            this.$emit('getCards')
        }
    }
}
</script>

<style>

</style>