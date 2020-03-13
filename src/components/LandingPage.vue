<template>
    <div id="landing-page">
        <h1>Kan<img src="../assets/todo.png" alt="" style="height: 35px; width: 35px;">ban</h1>
        <div v-if="isLoading">
            <lottie-player
                src="https://assets10.lottiefiles.com/datafiles/eLLuC91O4gnnAij/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay >
            </lottie-player>
        </div>
        <div v-else>
            <h3 v-if="error" style="color:white">{{ error }}</h3>
        </div>
        <SignInForm 
        @stopLoading="changeLoading"
        @startLoading="changeLoading1"
        v-if="login" 
        @signUpPage="page" 
        @signIn="dataUser"
        @error="errorSign"
        >
        </SignInForm>
        <SignUpForm v-else 
        @signInPage="page" 
        @signUp="dataUser"
        @error="errorSign"
        >
        </SignUpForm> 
    </div>
</template>

<script>
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default {
    name: 'LandingPage',
    data () {
        return {
            user: {
                email: '',
                password: '',
            },
            login: true,
            error: '',
            isLoading: false
        }
    },
    components: {
        SignInForm,
        SignUpForm
    },
    methods: {
        changeLoading1 (data) {
            this.isLoading = data
        },
        changeLoading (data) {
            this.isLoading = data
        },
        errorSign(data) {
            this.error = data
        },
        page(data) {
            this.error = ''
            this.login = data
        },
        dataUser(data) {
            this.$emit('user', data)
        }
    }
}
</script>

<style>
#landing-page {
    background-image: url('../assets/Artboard 1.svg');
    height: 100vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    justify-self: center;
}

h1 {
	font-size: 45px;
	color: #fff;
	font-weight: 300;
	text-transform: uppercase;
	letter-spacing: 4px;
	text-align: center;
}

</style>