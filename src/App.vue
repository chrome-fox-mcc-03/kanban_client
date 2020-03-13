<template>
	<div>
		<navbar :isLogin="isLogin" @logout="logout" @showAddCard="showAddCard"></navbar>
		<!-- <loading :isLoading="isLoading"></loading> -->
		<div 
			v-if="!isLoading" 
			class="container-fluid">
			<div v-if="isLogin" class="flex-container row">
				<task-list 
					v-for="(task, i) in taskList" 
					:key="i" 
					:index="i"
					:taskList="taskList"
					:cards="cards"
					@editCard="update"
					@deleteCard="deleteCard">
				</task-list>

				
			</div>
			<div v-else class="landing-page">
				<landing-page @changeStatus="changeStatus"></landing-page>
				<!--------------------------- MODAL ------------------------------>
				<b-modal id="login" title="Login" hide-footer>
    				<form @submit.prevent="login">
						<div class="form-group">
							<label for="login-email">Email address</label>
							<input v-model="emailLogin" type="email" class="form-control" id="login-email">
						</div>
						<div class="form-group">
							<label for="login-password">Password</label>
							<input v-model="passwordLogin" type="password" class="form-control" id="login-password">
						</div>
						<button type="submit" class="btn btn-primary">Login</button>
						<a href="#" @click="$bvModal.show('register'); $bvModal.hide('login')"> Don't have
							an account?</a>
					</form>
                    <!-- <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                    </g-signin-button> -->
                    <br>
                    <div id="my-signin2" data-width="300" data-height="200" data-longtitle="true">
  				</b-modal>

				<b-modal id="register" title="Register" hide-footer>
    				<form @submit.prevent="register">
						<div class="form-group">
							<label for="register-email">Email address</label>
							<input v-model="emailRegister" type="email" class="form-control" id="register-email">
						</div>
						<div class="form-group">
							<label for="register-password">Password</label>
							<input v-model="passwordRegister" type="password" class="form-control" id="register-password">
						</div>
						<button type="submit" class="btn btn-primary">register</button>
					</form>
  				</b-modal>
			</div>
		</div>
		<div v-else id="loading">
            <img id="loading-img" src="./img/loading.gif" alt="loading">
        </div>
        <b-modal ref="add-card" title="Add a card" hide-footer>
    		<form @submit.prevent="addCard">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input v-model="title" type="text" class="form-control" id="title">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input v-model="description" type="text" class="form-control" id="description">
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
  		</b-modal>
	</div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import LandingPage from './components/LandingPage.vue';
import TaskList from './components/Tasks.vue';
import axios from 'axios';
import Swal from 'sweetalert2'

const URL = "http://localhost:3000";
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    // onOpen: (toast) => {
    //     toast.addEventListener('mouseenter', Swal.stopTimer)
    //     toast.addEventListener('mouseleave', Swal.resumeTimer)
    // }
    onOpen: function(toast) {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function getToken() {
    return localStorage.getItem("token");
}

function setToken(token) {
    localStorage.setItem("token", token)
}

export default {
	name: "App",
    data() {
    	return {
			isLogin: false,
			isGLogin: false,
            isLoading: false,
            isInModalLogin: false,
			taskList: [ "Backlog", "Product", "Development", "Done" ],
			cards: [],
			backlogs: [],
			products: [],
			developments: [],
			dones: [],
			emailLogin: "",
			passwordLogin: "",
			emailRegister: "",
			passwordRegister: "",
			title: "",
            description: "",
            googleSignInParams: {
                client_id: '233221709617-5orgico3dm566bs8r9lufv5e0urh7sps.apps.googleusercontent.com'
            }
            // 233221709617-5orgico3dm566bs8r9lufv5e0urh7sps.apps.googleusercontent.com
		};
	},
	methods: {
        register() {
            axios({
                url: URL + "/register",
                method : 'post',
                data: {
                    email: this.emailRegister,
                    password: this.passwordRegister
                }
            })
                .then((result) => {
                    setToken(result.data.token);
                    this.isLogin = true;
                    this.emailRegister = "";
                    this.passwordRegister = "";
                    this.fetchData();
                }).catch((err) => {
                    console.log(err.response.data.message);
                    let title = err.response.data.message;
                    Toast.fire({
                        icon: 'error',
                        title
                    })
                }).finally(final => {
                    
                })
        },
		login() {
			// this.isLoading = true;
			axios({
				url: URL + "/login",
				method : 'post',
				data: {
					email: this.emailLogin,
					password: this.passwordLogin
				}
			})
				.then((result) => {
					setToken(result.data.token);
					this.isLogin = true;
					this.emailLogin = "";
					this.passwordLogin = "";
					this.fetchData();
				}).catch((err) => {
					console.log(err.response.data.message);
					let title = err.response.data.message;
					Toast.fire({
						icon: 'error',
						title
					})
				}).finally(final => {
					// this.setLoading(false);
					// this.isLoading = false;
				})
		},
		logout() {
            localStorage.clear();
            this.isGLogin = false;
            this.isLogin = false;
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut()
                .then(result => {
                    console.log('User signed out.');
                    localStorage.clear();
                    this.isGLogin = false;
                    this.isLogin = false;
                });
        },
		fetchData() {
            // this.isLoading = true;
            this.cards = [];
            axios({
                url: URL + "/tasks",
                method : 'get',
                headers: {
                    token: getToken()
                }
            })
                .then((result) => {
                    this.cards = result.data.data;
                }).catch((err) => {
                    console.log(err.response.data.message);
                    let title = err.response.data.message;
                    // Toast.fire({
                    //     icon: 'error',
                    //     title
                    // })
                }).finally(final => {
                    this.isLoading = false;
                })
        },
        addCard() {
            // this.isLoading = true;
            axios({
                url: URL + "/tasks",
                method : 'post',
                headers: {
                    token: getToken()
                },
                data: {
                    title: this.title,
                    description: this.description
                }
            })
                .then(({data}) => {
                    this.fetchData();
					this.title = "";
                    this.description = "";
                    this.hideModal();
                }).catch((err) => {
                    console.log(err.response.data.message);
                    let title = err.response.data.message;
                    Toast.fire({
                        icon: 'error',
                        title
                    })
                }).finally(final => {
                    // this.isLoading = false;
                })
		},
        update(obj) {
            // this.isLoading = true;
            axios({
                url: URL + "/tasks/" + obj.id,
                method : 'put',
                headers: {
                    token: getToken()
                },
                data: {
                    category: obj.statement
                }
            })
                .then((result) => {
					this.fetchData();
                }).catch((err) => {
                    console.log(err.response.data.message);
                    let title = err.response.data.message;
                    Toast.fire({
                        icon: 'error',
                        title
                    })
                }).finally(final => {
                    this.isLoading = false;
                })
        },
        deleteCard(id) {
            this.isLoading = true;
            axios({
                url: URL + "/tasks/" + id,
                method : 'delete',
                headers: {
                    token: getToken()
                }
            })
                .then((result) => {
                    setTimeout(result => {
                        this.isLoading = false;
                        this.fetchData();
                    }, 2000);
                }).catch((err) => {
                    console.log(err.response.data.message);
                    let title = err.response.data.message;
                    Toast.fire({
                        icon: 'error',
                        title
                    })
                }).finally(final => {
                    // setTimeout(result => {
                    //     this.isLoading = false;
                    // }, 5000);
                })
        },
		showAddCard() {
            console.log(this.$refs['add-card']);
			this.$refs['add-card'].show()
        },
        glogin(id_token) {
            this.isGLogin = true;
            axios({
                url: URL + "/loginGoogle",
                method : 'post',
                headers: {
                    token: id_token
                }
            })
                .then((result) => {
					setToken(result.data.token);
					this.isLogin = true;
					this.emailLogin = "";
					this.passwordLogin = "";
					this.fetchData();
				}).catch((err) => {
					console.log(err.response.data.message);
					let title = err.response.data.message;
					// Toast.fire({
					// 	icon: 'error',
					// 	title
					// })
				}).finally(final => {
					this.isLoading = false;
				})
        },
        hideModal() {
            this.$refs['add-card'].hide()
        },
        onSignIn(googleUser) {
            // do stuff, for example
            let id_token = googleUser.getAuthResponse().id_token;
            this.glogin(id_token);
        },
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            let id_token = googleUser.getAuthResponse().id_token;
            this.glogin(id_token);
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        },
        changeStatus: function() {
            this.isInModalLogin = true;
            this.$bvModal.show('login')
            setTimeout(() => {
                gapi.signin2.render('my-signin2', { // this is the button "id"
                    // onsuccess: this.onSignIn // note, no "()" here
                    'scope': 'profile email',
                    'width': 240,
                    'height': 50,
                    'longtitle': true,
                    'theme': 'dark',
                    'onsuccess': this.onSignIn,
                    'onfailure': ""
                });
            })
        }
	},
	components: {
		Navbar,
		LandingPage,
		TaskList
	},
    created: function () {
        if(getToken()){
            this.isLogin = true;
            this.fetchData();
        }
    }
};
</script>

<style>
    /* .g-signin-button { */
        /* This is where you control how the button looks. Be creative! */
        /* display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    } */
</style> 