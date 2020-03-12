<template>
    <div>
        <landing-page v-if="!status.args" v-show="status.loggedOut.onPage === 'landing-page'" @page="changePage"></landing-page>
        <sign-in-page v-if="!status.args" v-show="status.loggedOut.onPage === 'login-page'"  @page="changePage" @logMeIn="logMeIn"></sign-in-page>
        <sign-up-page v-if="!status.args" v-show="status.loggedOut.onPage === 'sign-up-page'"  @page="changePage" @signMeUp="signMeUp"></sign-up-page>
        <google-sign-up-page v-if="!status.args" v-show="status.loggedOut.onPage === 'sign-up-google-page'" @page="changePage" @signMeUp="signMeUpGoogle"></google-sign-up-page>
        <!-- <dashboard-home-page v-if="status.args" v-show="status.loggedIn.onPage === 'dashboard-home'"></dashboard-home-page>
        <kanban-board-page v-if="status.args" v-show="status.loggedIn.onPage === 'kanban-board'"
        v-bind:style="{'background-image':'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3) ), url(' + boardParams.bgUrl + ')'}"></kanban-board-page> -->
    </div>
</template>

<script>
import LandingPage from './components/SectionLandingPage.vue'
import SignInPage from './components/SectionSignInPage.vue'
import SignUpPage from './components/SectionSignUpPage.vue'
import GoogleSignUpPage from './components/SectionGoogleSignUpPage.vue'
// import DashboardHomePage from './components/SectionDashboardHomePage.vue'
// import KanbanBoardPage from './components/SectionKanbanBoardPage.vue'
export default {
    name: 'App',
    data: () => {
        return {
            status: {
                args: false, 
                loggedIn: {
                    onPage: 'dashboard-home',
                    show: ''
                },
                loggedOut: {
                    onPage: 'sign-up-google-page'
                }
            },
        }
    },
    methods: {
        changePage: function(pageToShow){
            if (!this.status.args) this.status.loggedOut.onPage = pageToShow
            else if(this.status.args) {
                this.status.loggedIn.onPage = pageToShow
                if(pageToShow === 'dashboard-home') {
                    // this.fetchSharedBoard()
                    // this.fetchYourBoard()
                }else if(pageToShow === 'kanban-board'){
                    // this.fetchCards()
                }
            }
        },
        logMeIn: function(userData){
            console.log(userData.email)
            console.log(userData.password)
        },
        signMeUp: function(userData){
            console.log(userData)
        },
        signMeUpGoogle: function(userData){
            console.log(userData)
        }
    },
    components: {
        LandingPage,       
        SignInPage,       
        SignUpPage,       
        GoogleSignUpPage,  
        // DashboardHomePage, 
        // KanbanBoardPage 
    }

}
</script>

<style>

</style>