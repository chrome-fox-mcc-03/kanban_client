<template>
    <div>
        <LandingPage 
            @changePage="changePage2"
            :message="message"
            :currentPage="currentPage">
            </LandingPage>
        <MainPage></MainPage>
        <EditPage></EditPage>
    </div>
</template>

<script>
import LandingPage from './views/LandingPage';
import MainPage from './views/MainPage';
import EditPage from './views/EditPage';
export default {
    data: function() {
        return {
            message: 'Test',
            currentPage: 'landingPage'
        }
    },
    methods: {
        changePage2(page) {
            this.currentPage = page
        } 
    },
    components: {
        LandingPage,
        MainPage,
        EditPage
    },
    // created () {
    //     if (localStorage.getItem('access_token')) {
    //         this.currentPage = 'home'
    //     }
    // },
    mounted () {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }
}
</script>

<style scoped>

</style>