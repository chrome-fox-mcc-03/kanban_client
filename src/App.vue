<template>

    <section>
        <div v-if="isLoading" style="display:flex;justify-content: center;align-items: center;">
            <div class="loading-screen">
                <lottie-player src="https://assets6.lottiefiles.com/datafiles/V6a7qEnbQRmA83z/data.json" speed="1"
                    style="width: 100%; height: 100%;" background="transparent" loop autoplay>
                </lottie-player>
            </div>
        </div>

        <web-header @logout="logout" :isLogin="isLogin"></web-header>
        <web-landing v-if="!isLogin" @login="login" @register="register" @onSignInSuccess="onSignInSuccess">
        </web-landing>
        <web-main @updateCategory="updateCategory" :categories="categories" @addCard="addCard" @deleteTask="deleteTask"
            @updateTask="updateTask" v-else v-bind:tasks="tasks">
        </web-main>
    </section>

</template>

<script>
    import WebHeader from './components/WebHeader';
    import WebLanding from './components/WebLanding';
    import WebMain from './components/WebMain';

    import axios from 'axios'

    export default {
        name: 'App',
        data() {
            return {
                isLogin: false,
                isLoading: false,
                tasks: [],
                categories: [{
                        name: "Back-Log",
                        tasks: [],
                        catId: 0
                    },
                    {
                        name: "To-Do",
                        tasks: [],
                        catId: 1
                    },
                    {
                        name: "On Going",
                        tasks: [],
                        catId: 2
                    },
                    {
                        name: "Finished",
                        tasks: [],
                        catId: 3
                    }
                ]
            }
        },
        methods: {
            login(data) {
                this.isLoading = true;
                axios.post('https://kanbanize.herokuapp.com/login', data)
                    .then(response => {
                        const token = response.data.token
                        const fullname = response.data.fullname
                        localStorage.setItem('fullname', fullname)
                        localStorage.setItem('token', token)
                        this.isLogin = true
                        this.getCard()
                        UIkit.notification({
                            message: `Welcome Back ${localStorage.getItem('fullname')} !`,
                            status: 'primary',
                            pos: 'top-right',
                            timeout: 2500
                        });
                    })

                    .catch(err => {
                        UIkit.notification({
                            message: "Email / Password is invalid",
                            status: 'danger',
                            pos: 'top-right',
                            timeout: 500
                        });
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },

            onSignInSuccess(id_token) {
                this.isLoading = true
                axios({
                        method: "POST",
                        url: 'https://kanbanize.herokuapp.com/googleLogin',
                        data: {
                            id_token
                        }
                    })
                    .then(response => {
                        const token = response.data.token
                        const fullname = response.data.fullname
                        localStorage.setItem('fullname', fullname)
                        localStorage.setItem('token', token)
                        this.isLogin = true
                        this.getCard()
                        UIkit.notification({
                            message: `Welcome Back ${localStorage.getItem('fullname')} !`,
                            status: 'primary',
                            pos: 'top-right',
                            timeout: 2500
                        });
                    })
                    .catch(err => {
                        UIkit.notification({
                            message: "Email / Password is invalid",
                            status: 'danger',
                            pos: 'top-right',
                            timeout: 500
                        });
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })

            },

            register(data) {
                this.isLoading = true;
                axios.post('https://kanbanize.herokuapp.com/register', data)
                    .then(response => {
                        const token = response.data.token
                        localStorage.setItem('token', token)
                        this.isLogin = true
                        UIkit.notification({
                            message: `Hi there! It's nice to meet you`,
                            status: 'primary',
                            pos: 'top-right',
                            timeout: 2500
                        });
                    })
                    .catch(err => {
                        err.response.data.message.map(el => {
                            UIkit.notification({
                                message: `${el}`,
                                status: 'danger',
                                pos: 'top-right',
                                timeout: 2500
                            });
                        })

                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },

            logout() {
                localStorage.removeItem('token')
                localStorage.removeItem('fullname')
                this.isLogin = false
                this.resetCategories()

                let auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });
            },

            addCard(data) {
                this.isLoading = true;
                axios({
                        method: "POST",
                        url: "https://kanbanize.herokuapp.com/task",
                        data: {
                            title: data.title,
                            category: data.catId
                        },
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(response => {
                        let newTask = response.data.response
                        this.categories[newTask.category].tasks.push(newTask)

                    })
                    .catch(err => {
                        UIkit.notification({
                            message: `${err.response.data.message}`,
                            status: 'danger',
                            pos: 'top-right',
                            timeout: 500
                        });
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })

            },

            getCard() {
                this.isLoading = true;
                axios({
                        method: "GET",
                        url: "https://kanbanize.herokuapp.com/task",
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(({
                        data
                    }) => {
                        this.resetCategories()
                        for (let i = 0; i < data.response.length; i++) {
                            if (data.response[i].category === 0) {
                                this.categories[0].tasks.push(data.response[i])
                            } else if (data.response[i].category === 1) {
                                this.categories[1].tasks.push(data.response[i])
                            } else if (data.response[i].category === 2) {
                                this.categories[2].tasks.push(data.response[i])
                            } else if (data.response[i].category === 3) {
                                this.categories[3].tasks.push(data.response[i])
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },

            deleteTask(id) {
                this.isLoading = true;
                axios({
                        method: "DELETE",
                        url: `https://kanbanize.herokuapp.com/task/${id}`,
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(response => {
                        this.getCard()
                        UIkit.notification({
                            message: "Task deleted",
                            status: 'danger',
                            pos: 'top-right',
                            timeout: 500
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })

            },

            resetCategories() {
                this.categories = [{
                        name: "Back-Log",
                        tasks: [],
                        catId: 0
                    },
                    {
                        name: "To-Do",
                        tasks: [],
                        catId: 1
                    },
                    {
                        name: "On Going",
                        tasks: [],
                        catId: 2
                    },
                    {
                        name: "Finished",
                        tasks: [],
                        catId: 3
                    }
                ]

            },

            updateCategory(obj) {
                this.isLoading = true;
                axios({
                        method: "PUT",
                        url: `https://kanbanize.herokuapp.com/task/${obj.id}`,
                        data: {
                            category: obj.category
                        },
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(response => {
                        this.getCard()
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            },

            updateTask(obj) {
                this.isLoading = true;
                axios({
                        method: "PUT",
                        url: `https://kanbanize.herokuapp.com/task/${obj.id}`,
                        data: {
                            title: obj.title,
                            desc: obj.desc,
                            category: obj.category,
                            badge: obj.badge
                        },
                        headers: {
                            token: localStorage.token
                        }
                    })
                    .then(response => {
                        this.getCard()
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(_ => {
                        this.isLoading = false
                    })
            }

        },
        components: {
            WebHeader,
            WebLanding,
            WebMain
        },
        created() {
            if (localStorage.token) {
                this.isLogin = true
                this.getCard()
            }
        }
    }
</script>

<style>
    .uk-notification-message {
        border-radius: 10px;
        background-color: #eeeeee;
        box-shadow:
            0 1px 1px rgba(0, 0, 0, 0.12),
            0 2px 2px rgba(0, 0, 0, 0.12),
            0 4px 4px rgba(0, 0, 0, 0.12),
            0 8px 8px rgba(0, 0, 0, 0.12),
            0 16px 16px rgba(0, 0, 0, 0.12);

    }

    .uk-modal-close {
        background-color: red;
    }

    .uk-modal-close:hover {
        background-color: red
    }

    .loading-screen {

        border-radius: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        margin: auto;
        top: 100px;
        width: 500px;
    }

    .loading-screen lottie-player {
        margin: auto;
    }
</style>