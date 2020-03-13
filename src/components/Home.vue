<template>
    <section class="home-section">
        <top-navbar></top-navbar>
        
        <div v-if="successInfo" class="alert alert-success successInfo" role="alert">
           <p class="msg">Your account has been successfully created! please login...</p> 
        </div>

        <login-section v-if="currentForm === 'login'" @changePage="changePage" @fetchTodo="fetchTodo"></login-section>
        <register-section  v-else-if="currentForm === 'register'" @changePage="changePage" @showAlert="showAlert"></register-section>
        <footer-section></footer-section>
    </section>
</template>

<script>
import LoginSection from './LoginForm'
import TopNavbar from './TopNavbar'
import FooterSection from './Footer'
import RegisterSection from './RegisterForm'

export default {
    name : "HomeSection",
    components : {
        LoginSection,
        TopNavbar,
        FooterSection,
        RegisterSection
    },
    data () {
        return {
            currentForm : 'login',
            successInfo : false
        }
    },
    methods : {
        changePage : function(whereTo){
            console.log(whereTo);
            if(whereTo === 'content-section'){
                this.$emit('changePage', 'content-section')
            }else if(whereTo === 'register'){
                this.currentForm = whereTo
            }else if(whereTo === 'login'){
                this.currentForm = whereTo
            }
        },
        
        fetchTodo : function(){
            this.$emit('fetchTodo')
        },

        showAlert : function(info) {
            if(info === 'success'){
                this.successInfo = true
            }
        }
    },
}
</script>

<style scoped>

.home-section {
    /* display: none; */
    /* background-color: khaki; */
    width: 100vw;
    height: 90vh;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.successInfo {
    height: 2vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30vw;
}

.msg {
    height: 1vh;
}

</style>