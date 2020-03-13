<template>
    <div>
        <LandingPage 
            v-if="currentPage === 'landingPage'"
            @changePage="changePage">
        </LandingPage>
        <MainPage
            v-if="currentPage === 'mainPage'"
            @changePage="changePage">
        </MainPage>
        <notifications group="foo" />
    </div>
</template>

<script>
import LandingPage from './views/LandingPage';
import MainPage from './views/MainPage';
export default {
    name: 'App',
    data: function() {
        return {
            message: 'Test',
            currentPage: 'landingPage'
        }
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        }
    },
    components: {
        LandingPage,
        MainPage
    },
    created () {
        if (localStorage.getItem('access_token')) {
            this.currentPage = 'mainPage'
        }
    },
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