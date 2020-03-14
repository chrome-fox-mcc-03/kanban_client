const server = axios.create({
    baseURL: 'http://localhost:3000/'
});

 
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    onOpen: (toast) => {
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

const app = new Vue({
    el: '#app',
    data: {
        isLogin: false,
        isLoading: false,
        backlogs: [],
        products: [],
        developments: [],
        dones: [],
        emailLogin: "",
        passwordLogin: "",
        emailRegister: "",
        passwordRegister: "",
        title: "",
        description: ""
    },
    methods: {
        register() {
            this.isLoading = true;
            server({
                url: "/register",
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

                    $('#login').modal('hide');
                    $('#register').modal('hide');
                    this.fetchData();
                }).catch((err) => {
                    console.log(err.response.data.message);
                    let title = err.response.data.message;
                    Toast.fire({
                        icon: 'error',
                        title
                    })
                }).finally(final => {
                    this.setLoading(false);
                })
        },
        login() {
            this.isLoading = true;
            server({
                url: "/login",
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

                    $('#login').modal('hide');
                    $('#register').modal('hide');
                    this.fetchData();
                }).catch((err) => {
                    console.log(err.response.data.message);
                    let title = err.response.data.message;
                    Toast.fire({
                        icon: 'error',
                        title
                    })
                }).finally(final => {
                    this.setLoading(false);
                })
        },
        onSignIn(googleUser) {
            const profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());q
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            const id_token = googleUser.getAuthResponse().id_token;
        },
        logout() {
            localStorage.clear();
            // const auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut().then(function () {
            //     console.log('User signed out.');
            // });
            this.isLogin = false;
        },
        fetchData() {
            this.isLoading = true;
            this.backlogs = [];
            this.products = [];
            this.developments = [];
            this.dones = [];
            server({
                url: "/tasks",
                method : 'get',
                headers: {
                    token: getToken()
                }
            })
                .then((result) => {
                    result.data.data.forEach(el => {
                        if (el.category == "backlog") {
                            this.backlogs.push(el);
                        } else if (el.category == "product") {
                            this.products.push(el);
                        } else if (el.category == "development") {
                            this.developments.push(el);
                        } else if (el.category == "done") {
                            this.dones.push(el);
                        }
                    })
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
        addCard() {
            this.isLoading = true;
            server({
                url: "/tasks",
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

                    $('#register').modal('hide');
                    this.fetchData();
                }).catch((err) => {
                    console.log(err.response.data.message);
                    let title = err.response.data.message;
                    Toast.fire({
                        icon: 'error',
                        title
                    })
                }).finally(final => {
                    this.setLoading(false);
                })
        },
        update(id, statement) {
            this.isLoading = true;
            server({
                url: "/tasks/" + id,
                method : 'put',
                headers: {
                    token: getToken()
                },
                data: {
                    category: statement
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
        deleteData(id) {
            this.isLoading = true;
            server({
                url: "/tasks/" + id,
                method : 'delete',
                headers: {
                    token: getToken()
                }
            })
                .then((result) => {
                    this.fetchData();
                    // this.isLoading = false;
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
        setLoading(status) {
            if(!status) {
                $('.modal-backdrop').remove();
            } 
            this.isLoading = status;
        }
    },
    created: function () {
        if(getToken()){
            this.isLogin = true;
            this.fetchData();
        }
    }
})