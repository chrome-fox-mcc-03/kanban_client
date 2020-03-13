<template>
    <div>
        <navbar @getCards="fetchCards()" @logout="logout" @curPage="changePage"></navbar>
        <div id="content-container">
            <cards-container :first_name="userData.first_name" :last_name="userData.last_name" @deleteTask="deleteTask" @update="update"  @assignTaskDetail="assignTaskDetail" @getCards="fetchCards" :categories="categories" :cards="cards"  v-if="currentPage == 'cardsDisplay'"></cards-container>
            <login-form @onSignIn="onSignIn" @curPage="changePage" @loginObj="login" v-else-if="currentPage == 'loginDisplay'"></login-form>
            <register-form @register="register" v-else-if="currentPage == 'registerDisplay'"></register-form>
            <add-task-form :categories="categories" @addTask="addTask" v-else-if="currentPage == 'addTaskDisplay'"></add-task-form>
            <homepage v-else></homepage>
            <modal @deleteTask="deleteTask" @update="update" :taskDetail="taskDetail"></modal>
            <div v-if="isLoading" id="loading-animation">
                <lottie-player 
                    src="https://assets6.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay >
                </lottie-player>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})



import Navbar from './components/Navbar.vue'
import Homepage from './components/Homepage.vue'
import CardsContainer from './components/CardsContainer.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import Modal from './components/Modal.vue'
export default {
    name: 'App',
    data: function () {
        return {
            userData: {
                email: '',
                password: '',
                isLogin: false,
                first_name: '',
                last_name: '',
                role: '',
                disableLogin: false
            },
            isLoading: false,
            categories: ['Backlog', 'Product', 'Development', 'Done'],
            currentPage : '',
            cards: [],
            taskDetail: '',
            taskData: {
                title: '',
                category: '',
                description: ''
            }
        }
    },
    created(){
        const token = localStorage.getItem('token')
        if (token) {
            this.userData.isLogin = true
        } else {
            this.userData.isLogin = false
        }
    }
    ,
    components: {
        Navbar,
        Homepage,
        CardsContainer,
        LoginForm,
        RegisterForm,
        Modal,
        AddTaskForm
    },
    methods: {
        changePage(page) {
            if (page === 'loginDisplay' || page === 'homepageDisplay' || page === 'registerDisplay') {
                this.currentPage = page
            } else {
                if (this.userData.isLogin) {
                    this.currentPage = page
                } else {
                    const message = "You Are Not Authenticated!"
                    this.currentPage = this.currentPage
                    Toast.fire({
                        icon: 'error',
                        title: message
                    })
                }
            }
        },
        logout(){
            this.isLoading = true
            setTimeout(_ => {
                if (!this.userData.isLogin) {
                    this.isLoading = false
                    return
                } else {
                    this.userData.isLogin = false
                    Toast.fire({
                        icon: 'success',
                        title: 'Logout success'
                    })
                    localStorage.clear()
                    this.isLoading = false
                    this.changePage('homepageDisplay')
                    this.signOut()
                }
            }, 2000)
        },
        signOut() {
            console.log(gapi)
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        },
        login(obj){
            this.userData.email = obj.email
            this.userData.password = obj.password
            const email = this.userData.email
            const password = this.userData.password
            this.isLoading = true
                axios({
                    method: "POST",
                    url: "http://localhost:3000/login",
                    data: {
                        email,
                        password
                    }
                })
                    .finally(_ => {
                        this.isLoading = false
                    })
                    .then(response => {
                        const token = response.data.token
                        localStorage.setItem('token', token)
                        this.currentPage = 'homePageDisplay'
                        this.userData.isLogin = true
                        console.log(response)
                        Toast.fire({
                            icon: 'success',
                            title: 'Login succesfully'
                        })
                        this.userData.email = ''
                        this.userData.password = ''
                    })
                    
                    .catch(err => {
                        Toast.fire({
                            icon: 'error',
                            title: err.response.data.error
                        })
                        console.log(err.response.data)
                    })

                    
        },
        getUserByEmail(email){
            const token = localStorage.getItem('token')
            axios({
                method: "GET",
                url: `http://localhost:3000/${email}/user`,
                headers: {
                    token
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.userData.first_name = response.data.first_name
                    this.userData.last_name = response.data.last_name
                    console.log(this.userData.first_name)
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        },
        register(obj){
            this.userData.first_name = ''
            this.userData.last_name = ''
            this.userData.first_name = obj.first_name
            this.userData.last_name = obj.last_name,
            this.userData.email = obj.email
            this.userData.password = obj.password
            this.userData.role = obj.role
            const email = this.userData.email
            const password = this.userData.password
            const first_name = this.userData.first_name
            const last_name = this.userData.last_name
            const role = this.userData.role
            this.isLoading = true
            axios({
                method: "POST",
                url: "http://localhost:3000/users",
                data: {
                    email,
                    password,
                    first_name,
                    last_name,
                    role
                }
            })
                .finally(_ => {
                    this.isLoading = false
                })
                .then(response => {
                    this.currentPage = 'loginDisplay'
                    this.userData.email = ''
                    this.userData.password = ''
                    this.userData.first_name = ''
                    this.userData.last_name = ''
                    this.userData.role = ''
                    console.log(response)
                })
                .catch(err => {
                    Toast.fire({
                        icon: 'error',
                        title: err.response.data.error
                    })
                    console.log(err)
                })
        },
        addTask(obj){
            this.taskData.title = obj.title
            this.taskData.category = obj.category
            this.taskData.description = obj.description
            const title = this.taskData.title
            const category = this.taskData.category
            const description = this.taskData.description
            const token = localStorage.getItem('token')
            this.isLoading = true
            axios({
                method: "POST",
                url: "http://localhost:3000/tasks",
                data: {
                    title,
                    category,
                    description
                },
                headers: {
                    token
                }
            })
                .finally( _ => {
                    this.isLoading = false
                })
                .then(response => {
                    this.fetchCards()
                    console.log(response.data)
                })
                .catch(err => {
                    Toast.fire({
                        icon: 'error',
                        title: err.response.data.error
                    })
                    console.log(err.response)
                })
        },
        fetchCards(){
            const token = localStorage.getItem('token')
            this.isLoading = true
            axios({
                method: "GET",
                url: "http://localhost:3000/tasks",
                headers: {
                    token
                }
            })
                .finally( _=> {
                    this.isLoading = false
                })
                .then(response => {
                    console.log(response.data.length)
                    if (response.data.length > 0) {
                        const email = response.data[0].User.email
                        console.log('>>>>',response.data)
                        console.log(email)
                        this.getUserByEmail(email)
                        // let allCategories = response.data.map( el => {
                        //     return el.category
                        // })
                        // let uniqueCategories = allCategories.filter( (value, index, array) => {
                        //     return array.indexOf(value) === index
                        // })
                        // this.categories = uniqueCategories
    
                        response.data.forEach(el => {
                            let currentIndex = this.categories.indexOf(el.category)
                            if (currentIndex === 0) {
                                el.firstIndex = true
                                el.lastIndex = false
                            } else if(currentIndex === this.categories.length - 1){
                                el.lastIndex = true
                                el.firstIndex = false
                            } else {
                                el.lastIndex = true
                                el.firstIndex = true
                            }
                        })
                        this.cards = response.data
                        console.log(this.categories)
                        this.currentPage = 'cardsDisplay'
                    } else {
                        this.cards = response.data
                        this.currentPage = 'cardsDisplay'
                    }
                })
                .catch(err => {
                    Toast.fire({
                        icon: 'error',
                        title: err.response.data.error
                    })
                    console.log(err.response.data)
                })
        },
        assignTaskDetail(data){
            console.log(data)
            this.taskDetail = data
        },
        updateArrow(el, increment){
            const numberIncrement = Number(increment)
            const categories = this.categories
            const token = localStorage.getItem('token')
            const currentIndex = categories.indexOf(el.category)
            console.log(numberIncrement)
            const newCategory = categories[currentIndex + numberIncrement]
            console.log(numberIncrement + currentIndex)
            console.log(newCategory)
            const description = el.description
            const title = el.title
            const id = el.id
            // console.log(title)
            axios({
                method: "PUT",
                url: `http://localhost:3000/tasks/${id}`,
                headers: {
                    token
                },
                data: {
                    title,
                    category: newCategory,
                    description
                }
            })
                .then(response => {
                    console.log(response.data)
                    this.fetchCards()
                })
                .catch(err => {
                    Toast.fire({
                        icon: 'error',
                        title: err.response.data.error
                    })
                    console.log(err.response)
                })

        },
        update(obj){
            let index = obj.index
            let task = obj.task
            this.updateArrow(task,index)
        },      
        deleteTask(el){
            const id = el.id
            console.log(id)
            const token = localStorage.getItem('token')
            this.isLoading = true
            axios({
                method: "DELETE",
                url: `http://localhost:3000/tasks/${id}`,
                headers: {
                    token
                }
            })
                .finally( _=> {
                    this.isLoading = false
                })
                .then(response => {
                    this.fetchCards()
                        this.currentPage = 'homepageDisplay'
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err.response)
                    this.currentPage = 'homePageDisplay'
                    Toast.fire({
                        icon: 'error',
                        title: err.response.data.error
                    })

                })
        },
        onSignIn: function(googleUser) {
            if (localStorage.getItem('token')) {
                const profile = googleUser.getBasicProfile();
                const id_token = googleUser.getAuthResponse().id_token            
                return
            } else {
                const profile = googleUser.getBasicProfile();
                const id_token = googleUser.getAuthResponse().id_token
                console.log('ID: ' + profile.getId()); 
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail()); 
                console.log('id_token: ' +id_token)
                this.isLoading = true
                axios({
                    method: 'POST',
                    url: "http://localhost:3000/loginGoogle",
                    data: {
                        id_token
                    } 
                })
                    .finally( _=> {
                        this.isLoading = false
                    })
                    .then(response => {
                        const token = response.data.token
                        localStorage.setItem('token', token)
                        console.log(token)
                        this.userData.isLogin = true
                        this.userData.disableLogin = true
                        this.currentPage = 'homeDisplay'
                        console.log(response)
                        Toast.fire({
                            icon: 'success',
                            title: 'Login succesfully'
                        })
                    })
                    .catch(err => {
                        Toast.fire({
                            icon: 'error',
                            title: err.response.data.error
                        })
                        console.log(err)
                    })
            }
        }
    }
}
</script>

<style>

</style>
