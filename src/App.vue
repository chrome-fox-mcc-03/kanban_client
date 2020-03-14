<template>
    <div>
        <landing-page v-if="!status.args" v-show="status.loggedOut.onPage === 'landing-page'" @page="changePage"></landing-page>
        <sign-in-page v-if="!status.args" v-show="status.loggedOut.onPage === 'login-page'"  @page="changePage" @logMeIn="logMeIn" @onSignIn="onSignIn"></sign-in-page>
        <sign-up-page v-if="!status.args" v-show="status.loggedOut.onPage === 'sign-up-page'"  @page="changePage" @signMeUp="signMeUp" ></sign-up-page>
        <google-sign-up-page v-if="!status.args" v-show="status.loggedOut.onPage === 'sign-up-google-page'" @page="changePage" @signMeUpGoogle="signMeUpGoogle"></google-sign-up-page>
        <dashboard-home-page v-if="status.args" v-show="status.loggedIn.onPage === 'dashboard-home'" :yourBoards="yourBoards" :sharedBoards="sharedBoards"
        @logMeOut="logMeOut" @showBoard="showKanbanBoard" @addBoard="addBoard" @searchUser="searchUser" :membersId="members" :memberNames="memberNames"
        @removeNames="removeNames"></dashboard-home-page>
        <kanban-board-page v-if="status.args" v-show="status.loggedIn.onPage === 'kanban-board'"
        @page="changePage"
        :style="{'background-image':'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3) ), url(' + boardParams.bgUrl + ')'}"
        :title="boardParams.title" :tasks="cards" @addNewCard="addNewCard" @editDescription="editDesc" @editName="editName" @editDueDate="editDueDate"
        @moveLeft="moveLeft" @moveRight="moveRight" @deleteCard="deleteCard" @deleteThisBoard="deleteBoard"
        ></kanban-board-page>
        <section class="loading" v-if="isLoading">
            <lottie-player
                src="https://assets8.lottiefiles.com/datafiles/vyN1DtB7MeUAD1R/data.json"  background="transparent"  speed="1.2"  loop autoplay >
            </lottie-player>
        </section>
        
    </div>
</template>

<script>
import Axios from 'axios'
import LandingPage from './components/SectionLandingPage.vue'
import SignInPage from './components/SectionSignInPage.vue'
import SignUpPage from './components/SectionSignUpPage.vue'
import GoogleSignUpPage from './components/SectionGoogleSignUpPage.vue'
import DashboardHomePage from './components/SectionDashboardHomePage.vue'
import KanbanBoardPage from './components/SectionKanbanBoardPage.vue'
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
                    onPage: 'landing-page'
                }
            },
            yourBoards: [],
            sharedBoards: [],
            boardParams: {
                bgUrl: '',
                title: '',
                id: null
            },
            members: [],
            memberNames: [],
            cards: {
                backlog: [],
                todo: [],
                ongoing: [],
                done: []
            },
            gmail: '',
            isLoading: false
        }
    },
    methods: {
        changePage: function(pageToShow){
            
            if (!this.status.args) this.status.loggedOut.onPage = pageToShow
            else if(this.status.args) {
                this.status.loggedIn.onPage = pageToShow
                this.cards = {
                    backlog: [],
                    todo: [],
                    ongoing: [],
                    done: []
                }
            }
        },
        logMeIn: function(userData){
            const data = userData
            this.isLoading = true
            return Axios({
                url: 'https://limitless-atoll-40245.herokuapp.com/signin',
                method: 'POST',
                data
            })
            .then(result => {
                this.$vToastify.success('Welcome!')
                this.status.args = true
                localStorage.setItem('token', result.data.token)
                this.fetchYourBoard()
                this.fetchSharedBoard()

            })
            .catch(err => {
                if(err.response.data.errors) {
                    this.$vToastify.error(err.response.data.errors[0].message)
                }
                else if(err.response.data.msg){
                    this.$vToastify.error(err.response.data.msg)
                }
                
            })
            .finally(_ => {
                this.isLoading = false
            })
        },
        signMeUp: function(userData){
            this.isLoading = true
            const data = userData
            return Axios({
                url: 'https://limitless-atoll-40245.herokuapp.com/signup',
                method: 'POST',
                data
            })
            .then(result => {
                const dataToLogin = {
                    email: result.data.data.email,
                    password: result.data.data.password
                }
                this.logMeIn(dataToLogin)
            })
            .catch(err => {
                if(err.response.data.errors) {
                    this.$vToastify.error(err.response.data.errors[0].message)
                }
                else {
                    this.$vToastify.error(err.response.data.msg)
                }
                
            })
            .finally(_ => {
                this.isLoading = false
            })
        },
        signMeUpGoogle(userData){
            console.log(this.gmail)
            const data = {
                name: userData.name,
                username: userData.username,
                password: userData.password,
                passwordConfirm: userData.passwordConfirm,
                email: this.gmail
            }
            this.isLoading = true
            return Axios({
                url: 'https://limitless-atoll-40245.herokuapp.com/oauthSignUp',
                method: 'POST',
                data
            })
            .then(result => {
                const dataToLogin = {
                    email: result.data.data.email,
                    password: result.data.data.password
                }
                this.logMeIn(dataToLogin)
            })
            .catch(err => {
                if(err.response.data.errors) {
                    this.$vToastify.error(err.response.data.errors[0].message)
                }
                else {
                    this.$vToastify.error(err.response.data.msg)
                }
            })
            .finally(_ => {
                this.isLoading = false
            })
        },
        fetchYourBoard(){
            this.isLoading = true
            return Axios({
                url: 'https://limitless-atoll-40245.herokuapp.com/board',
                method: 'GET',
                headers: {
                    user_token: localStorage.getItem('token')
                }
            })
            .then(result => {
                if(result.data.boards){
                result.data.boards.forEach(board => {
                    this.yourBoards.push(board)
                    })
                }
            })
            .catch(err => {
                this.$vToastify.error(err)
            })
        },
        fetchSharedBoard(){
            this.isLoading = true

            return Axios({
                url: 'https://limitless-atoll-40245.herokuapp.com/board/shared',
                method: 'GET',
                headers: {
                    user_token: localStorage.getItem('token')
                }
            })
            .then(result => {
                if(result.data.boards){
                    result.data.boards.forEach(board => {
                    this.sharedBoards.push(board)
                    })
                }
            })
            .catch(err => {
                this.$vToastify.error(err)
            })
            .finally(_ => {
                this.isLoading = false
            })
        },
        logMeOut(){
            localStorage.clear()
            this.signOut()
            this.status.args = false
            this.changePage('landing-page')
            this.yourBoards = []
            this.sharedBoards = []
        },
        showKanbanBoard(data){
            this.boardParams.bgUrl = data.bgUrl
            this.boardParams.title = data.title
            this.boardParams.id = data.id
            this.fetchCards()
            this.changePage('kanban-board')
        },
        addBoard(newBoard){
            this.isLoading = true

            return Axios({
                url: 'https://limitless-atoll-40245.herokuapp.com/board',
                method: 'POST',
                headers: {
                    user_token: localStorage.getItem('token')
                },
                data: {
                    title: newBoard.title,
                    background_id: newBoard.BG,
                    sharedUserId: newBoard.membersId
                }
            })
            .then(result => {
                this.yourBoards.push(result.data.newBoard)
                this.memberNames = []
                this.$vToastify.success('Board added!')
            })
            .catch(err => {
                this.$vToastify.error(err.response.data.errors[0].message)
                }
            )
            .finally(_ => {
                this.isLoading = false
            })
        },
        searchUser(user){
            this.isLoading = true

            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/findUser/${user}`,
                method: 'GET',
                headers: {
                    user_token: localStorage.getItem('token')
                }
            })
            .then(result => {
                if(!result.data.msg) {
                    this.members.push(result.data.id)
                    this.memberNames.push(result.data.name)
                }else{
                    this.$vToastify.error(result.data.msg)
                }
            })
            .catch(err => {
                this.$vToastify.error(result.data.msg)
                }
            )
            .finally(_ => {
                this.isLoading = false
            })
        },
        removeNames(){
            this.memberNames = []
        },
        fetchCards(){
            this.isLoading = true
            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/task/${this.boardParams.id}`,
                method: 'GET',
                headers: {
                    user_token: localStorage.getItem('token')
                }
            })
            .then(results => {
                this.cards = {
                    backlog: [],
                    todo: [],
                    ongoing: [],
                    done: []
                }
                if(results.data.tasks){
                    results.data.tasks.forEach(task => {
                        this.cards[task.category].push(task)
                    })
                }
                else{
                    this.$vToastify.info('Welcome to your kanban. Start creating new card!')
                }
            })
            .catch(err => {
                if(err.response.data) this.$vToastify.error(err.response.data.msg)
                else this.$vToastify.error(err.response.data.errors[0].message)
            })
            .finally(_ => {
                this.isLoading = false
            })

        },
        addNewCard(newCard){
            this.isLoading = true
            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/task/${this.boardParams.id}`,
                method: 'POST',
                headers: {
                    user_token: localStorage.getItem('token')
                },
                data: {
                    title: newCard.title,
                    desc: newCard.description,
                    due_date: newCard.due_date,
                    color: newCard.color
                }
            })
            .then(result => {
                this.cards = {
                    backlog: [],
                    todo: [],
                    ongoing: [],
                    done: []
                },
                this.fetchCards()
                this.$vToastify.success('Card added!')
                this.emitNewCard()
            })
            .catch(err => {
                if(err.response.data.msg)  this.$vToastify.error(err.response.data.msg)
                else this.$vToastify.error(err.response.data.errors[0].message)
                }
            )
            .finally(_ => {
                this.isLoading = false
            })
        },
        editDesc(value){
            this.isLoading = true

            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/task/${value.id}`,
                method: 'PUT',
                headers: {
                    user_token: localStorage.getItem('token')
                },
                data: {
                    desc: value.description
                }
            })
            .then(_ => this.emitNewCard())
            .catch(err => {
                this.$vToastify.error(err.response.data.errors[0].message)
                }
            )
            .finally(_ => {
                this.isLoading = false
            })
        },
        editName(value){
            this.isLoading = true

            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/task/${value.id}`,
                method: 'PUT',
                headers: {
                    user_token: localStorage.getItem('token')
                },
                data: {
                    title: value.title
                }
            })
            .then(_ => this.emitNewCard())
            .catch(err => {
                this.$vToastify.error(err.response.data.errors[0].message)
                }
            )
            .finally(_ => {
                this.isLoading = false
            })
        },
        editDueDate(value){
            this.isLoading = true

            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/task/${value.id}`,
                method: 'PUT',
                headers: {
                    user_token: localStorage.getItem('token')
                },
                data: {
                    due_date: new Date(value.due_date)
                }
            })
            .then(_ => this.emitNewCard())
            .catch(err => {
                this.$vToastify.error(err.response.data.errors[0].message)
                }
            )
            .finally(_ => {
                this.isLoading = false
            }) 
        },
        moveLeft(value){
            this.isLoading = true

            const currentCategory = value.category
            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/task/status/${value.id}`,
                method: 'PUT',
                headers: {
                    user_token: localStorage.getItem('token')
                },
                data: {
                    currentCategory: value.category,
                    updateCategory: -1
                }
            })
            .then(res => {
                this.cards = {
                    backlog: [],
                    todo: [],
                    ongoing: [],
                    done: []
                },
                this.fetchCards()
                this.emitNewCard()
            })
            .catch(err => {
                this.$vToastify.error(err.response.data.errors[0].message)
                }
            )
            .finally(_ => {
                this.isLoading = false
            })
        },
        moveRight(value){
            this.isLoading = true

            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/task/status/${value.id}`,
                method: 'PUT',
                headers: {
                    user_token: localStorage.getItem('token')
                },
                data: {
                    currentCategory: value.category,
                    updateCategory: 1
                }
            })
            .then(res => {
                this.emitNewCard()
            })
            .catch(err => {
                this.$vToastify.error(err.response.data.errors[0].message)
                }
            )
            .finally(_ => {
                this.isLoading = false
            })
        },
        deleteCard(id){
            this.isLoading = true

            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/task/${id}`,
                method: 'DELETE',
                headers: {
                    user_token: localStorage.getItem('token')
                }
            })
            .then(res => {
                this.cards = {
                    backlog: [],
                    todo: [],
                    ongoing: [],
                    done: []
                },
                this.fetchCards()
                this.emitNewCard()
                this.$vToastify.success('Card deleted!')
            })
            .catch(err => {
                if(err.response.data.msg)  this.$vToastify.error(err.response.data.msg)
                else this.$vToastify.error(err.response.data.errors[0].message)
                }
            )
            .finally(_ => {
                this.isLoading = false
            })
        },
        onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token
            this.isLoading = true

            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/oauth`,
                method: 'POST',
                headers: {
                    user_token: id_token
                }
            })
            .then(result => {
                if(result.data.token){
                    this.$vToastify.success('Welcome!')
                    this.status.args = true
                    localStorage.setItem('token', result.data.token)
                    this.fetchYourBoard()
                    this.fetchSharedBoard()
                }else {
                    this.gmail = result.data.email
                    this.changePage('sign-up-google-page')
                }
            })
            .catch(err => {
                console.log({err})
                if(err.response.data.errors) {
                    this.$vToastify.error(err.response.data.errors[0].message)
                }
                else {
                    this.$vToastify.error(err.response.data.msg)
                }
            })
            .finally(_ => {
                this.isLoading = false
            })

            
        },
        signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        },
        deleteBoard(){
            this.isLoading = true

            Axios({
                url: `https://limitless-atoll-40245.herokuapp.com/board/${this.boardParams.id}`,
                method: 'DELETE',
                headers: {
                    user_token: localStorage.getItem('token')
                },
            })
            .then(result => {
                this.changePage('dashboard-home')
                this.yourBoards = []
                this.fetchYourBoard()
                this.$vToastify.success('Board deleted.')
            })
            .catch(err => {
                this.$vToastify.error(err.response.data.msg)
            })
            .finally(_ => {
                this.isLoading = false
            })
        },
        emitNewCard(){
            this.$socket.emit('new_task')
        }
    },
    components: {
        LandingPage,       
        SignInPage,       
        SignUpPage,       
        GoogleSignUpPage,  
        DashboardHomePage, 
        KanbanBoardPage 
    },
    created() {
        if(localStorage.getItem('token')){
            this.status.args = true
            this.fetchYourBoard()
            this.fetchSharedBoard()
        }
    },
    sockets: {
        new_card_arrived(){
            this.fetchCards()
        }
    }

}
</script>

<style>
.loading {
    width: 100vw; 
    height: 100vh; 
    position:fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    background-color: rgb(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center
}
</style>