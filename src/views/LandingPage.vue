<template>
    <div id="login-page">
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <form class="log-form" @submit.prevent="createNewUser()">
                    <h1>Create Account</h1>
                    <input v-model="userData.regName" type="text" placeholder="Name" />
                    <input v-model="userData.regEmail" type="email" placeholder="Email" />
                    <input v-model="userData.regPassword" type="password" placeholder="Password" />
                    <!-- <button @click="authenticate()">Sign Up</button> -->
                    <input class="sign-button" type="submit" value="Sign Up">
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form class="log-form" @submit.prevent="signIn()">
                    <h1>Sign in</h1>
                    <div class="social-container">
                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>
                    <span>or use your account</span>
                    <input v-model="userData.logEmail" type="email" placeholder="Email" />
                    <input v-model="userData.logPassword" type="password" placeholder="Password" />
                    <input class="sign-button" type="submit" value="Sign In">
                    <!-- <div class="signin-buttons">
                        <button @click="authenticate()">Sign In</button>
                    </div> -->
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button class="ghost" id="signIn">Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Get Started!</h1>
                        <p>Start journey with us and level up your way of organizing tasks</p>
                        <button class="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LandingPage',
    data: function() {
        return {
            userData: {
                regName: '',
                regEmail: '',
                regPassword: '',
                logEmail: '',
                logPassword: ''
            }
        }
    },
    props: [
        'message',
        'currentPage'
    ],
    methods: {
        createNewUser: function() {
            const name = this.userData.regName;
            const email = this.userData.regEmail;
            const password = this.userData.regPassword;

            axios.post('http://localhost:3000/signup', {
                name,
                email,
                password
            })
                    .then(access_token => {
                        console.log('successfully sign up', access_token.data.access_token);
                        localStorage.setItem('access_token', access_token.data.access_token);
                        this.$emit('changePage', 'mainPage')
                    })
                    .catch(err => {
                        console.log(err);
                    })
        },
        signIn: function() {
            const email = this.userData.logEmail;
            const password = this.userData.logPassword;

            axios.post('http://localhost:3000/signin', {
                email,
                password
            })
                    .then(access_token => {
                        console.log('successfully sign in', access_token.data.access_token);
                        localStorage.setItem('access_token', access_token.data.access_token);
                        this.$emit('changePage', 'mainPage')
                    })
                    .catch(err => {
                        console.log(err);
                    })
        }
    },
    mounted() {
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

<style>

</style>