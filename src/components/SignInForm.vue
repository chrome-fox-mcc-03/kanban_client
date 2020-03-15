<template>
  <div class="w3layouts-main"> 
        <div class="bg-layer">
            <h1>Sign In</h1>
            <div class="header-main">
                <div class="header-left-bottom">
                    <form action="#" @submit.prevent="signIn()" method="post">
                        <div class="icon1">
                            <input type="email" v-model="user.email" placeholder="Email Address" required=""/>
                        </div>
                        <div class="icon1">
                            <input type="password" v-model="user.password" placeholder="Password" required=""/>
                        </div>
                        <div class="bottom">
                            <button class="btn">Sign In</button>
                        </div>
                        <div>
                            <p><a href="#" @click="changeForm()" style="text-decoration: none;">New User? SignUp</a></p>
                        </div>
                    </form>	
                </div>
                <div class="social">
                    <ul>
                        <li>or login using : </li>
                        <g-signin-button
                            :params="googleSignInParams"
                            @success="onSignInSuccess"
                            @error="onSignInError">
                            <li><a
                            href="#" id="customBtn" class="google"><img src="../assets/iconGoogle.png" style="height: 35px; width: 35px;"></a></li>
                        </g-signin-button>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Axios from 'axios'

export default {
    name: "SignInForm",
    data () {
        return {
            user: {
                email: '',
                password: ''
            },
            googleSignInParams: {
                client_id: '771779679497-cbg5keq3ms128bdtgds6j6mreia3qe4h.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        onSignInSuccess (googleUser) {
            this.$emit('startLoading', true)
            const id_token = googleUser.getAuthResponse() // etc etc
            axios({
                method: 'post',
                url: 'https://serene-waters-25786.herokuapp.com/signinGoogle',
                data: {
                    id_token
                }
            })
                .then(user => {
                    localStorage.token = user.data.access_token
                    this.$emit('stopLoading', false)   
                    this.$emit('signIn', 'homePage')
                })
                .catch(err => {
                    this.user.email = ''
                    this.user.password = ''
                    this.$emit('stopLoading', false)
                    this.$emit('error', err.response.data.error)
                })
        },
        onSignInError (error) {
            console.log('OH NOES', error)
        },
        changeForm() {
            this.$emit('signUpPage', false)
        },
        signIn() {
            this.$emit('startLoading', true)
            axios.post('https://serene-waters-25786.herokuapp.com/signIn', this.user)
                    .then(user => {
                        localStorage.token = user.data.access_token
                        this.$emit('stopLoading', false)   
                        this.$emit('signIn', 'homePage')
                    })
                    .catch(err => {
                        this.user.email = ''
                        this.user.password = ''
                        this.$emit('stopLoading', false)
                        this.$emit('error', err.response.data.error)
                    })
        }
    }
}
</script>
<style>
h1 {
	font-size: 45px;
	color: #fff;
	font-weight: 300;
	text-transform: uppercase;
	letter-spacing: 4px;
	text-align: center;
}

@keyframes slideleft {
    from {
        background-position: 0%;
    }
    to {
        background-position: 90000%;
    }
}

@-webkit-keyframes slideleft {
    from {
        background-position: 0%;
    }
    to {
        background-position: 90000%;
    }
}

.w3layouts-main{
    position: relative;
}

.bg-layer {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 30px;
}

.w3ls-header {
    padding: 0em 0 0;
}
.icon1 {
	margin: 0 0 1em;
	padding: .8em 1em;
	background: rgba(255, 255, 255, 0.94);
}
.icon1 span.fa {
    color: #222;
    width: 22px;
}
.main-icon {
    text-align: center;
}
.main-icon span.fa{
    font-size: 50px;
    color: #fff;
    margin-bottom: 1em;
}
.wthree li {
    display: inline-block;
}
a {
    color: #585858;
    margin: 0em;
}
.bottom {
    margin: 1em 0 0;
}
.header-main {
	max-width: 310px;
	margin: 0 auto;
	position: relative;
	z-index: 999;
	padding: 2em 2em;
	background: rgba(255, 255, 255, 0.04);
	-webkit-box-shadow: -1px 4px 28px 0px rgba(0,0,0,0.75);
	-moz-box-shadow: -1px 4px 28px 0px rgba(0,0,0,0.75);
    box-shadow: -1px 4px 28px 0px rgba(0,0,0,0.75);
    border-radius: 0 0 30px 30px;
}

.sign-up {
    margin: 2em 0;
}
.header-left {
  background: #fff;
  padding: 0px;
}
.header-left-bottom input[type="email"] {
    outline: none;
    font-size: 15px;
    color: #222;
	border:none;
    width: 90%;
    display: inline-block;
    background: transparent;
    letter-spacing: 1px;
}
.header-left-bottom input[type="password"]{
	outline: none;
	font-size: 15px;
    color: #222;
	border:none;
    width: 90%;
	display: inline-block;
	background: transparent;
    letter-spacing: 1px;
}
.header-left-bottom button.btn {
    background: #007cc0;
    color: #fff;
    font-size: 15px;
    text-transform: uppercase;
    padding: .8em 2em;
    letter-spacing: 1px;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: none;
	width: 100%;
}

.header-left-bottom p {
    font-size: 17px;
    color: #000;
    display: inline-block;
    width: 100%;
    margin: 10px 0 0;
    letter-spacing: 1px;
}

.header-left-bottom p.right {
	text-align: right;
}
.header-left-bottom p a {
	font-size: 11px;
	color: #e2e2e2;
	text-transform: uppercase;
}

.heading h5 {
    color: #c5c5c5;
    color: #000000;
    margin-top: 8px;
    font-size: 20px;
}
.social span.fa {
	color: #fff;
	font-size: 12px;
	line-height: 35px;
	margin: 0 5px;
	transition: 0.5s all;
}
.social ul li {
    display: inline-block;
    margin: 0 5px;
    font-size: 15px;
    color: #fff;
    letter-spacing: 1px;
    text-transform: capitalize;
}
.social a.google {
    background: #ffffff;
}
.social ul li a {
	background: rgba(255, 255, 255, 0.22);
	width: 35px;
	height: 35px;
	line-height: 35px;
	display: block;
	text-align: center;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	-ms-border-radius: 50%;
	-o-border-radius: 50%;
}
</style>