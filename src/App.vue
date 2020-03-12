<template>
    <div>
        <navbar @getCards="fetchCards()" @logout="logout" @curPage="changePage"></navbar>
        <div id="content-container">
            <cards-container @assignTaskDetail="assignTaskDetail" @getCards="fetchCards" :taskDetail="taskDetail" :categories="categories" :cards="cards"  v-if="currentPage == 'cardsDisplay'"></cards-container>
            <login-form @curPage="changePage" @loginObj="login" v-else-if="currentPage == 'loginDisplay'"></login-form>
            <register-form @register="register" v-else-if="currentPage == 'registerDisplay'"></register-form>
            <add-task-form @addTask="addTask" v-else-if="currentPage == 'addTaskDisplay'"></add-task-form>
            <homepage v-else></homepage>
            <modal></modal>
            
        </div>
    </div>
</template>

<script>
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
                role: ''
            },
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
            if (page === 'loginDisplay' || page === 'homepageDisplay') {
                this.currentPage = page
            } else {
                if (this.userData.isLogin) {
                    this.currentPage = page
                } else {
                    this.currentPage = this.currentPage
                }
            }
        },
        logout(){
            this.changePage('homepageDisplay')
            this.userData.isLogin = false
            localStorage.clear()
        },
        login(obj){
            this.userData.email = obj.email
            this.userData.password = obj.password
            const email = this.userData.email
            const password = this.userData.password
            axios({
                method: "POST",
                url: "http://localhost:3000/login",
                data: {
                    email,
                    password
                }
            })
                .then(response => {
                    const token = response.data.token
                    localStorage.setItem('token', token)
                    this.currentPage = 'homePageDisplay'
                    this.userData.isLogin = true
                    this.userData.email = ''
                    this.userData.password = ''
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        register(obj){
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
                .then(response => {
                    this.fetchCards()
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        fetchCards(){
            const token = localStorage.getItem('token')
            axios({
                method: "GET",
                url: "http://localhost:3000/tasks",
                headers: {
                    token
                }
            })
                .then(response => {
                    console.log(response.data)
                    let allCategories = response.data.map( el => {
                        return el.category
                    })
                    let uniqueCategories = allCategories.filter( (value, index, array) => {
                        return array.indexOf(value) === index
                    })
                    this.categories = uniqueCategories

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
                    console.log(allCategories);
                    console.log(this.categories)
                    this.currentPage = 'cardsDisplay'
                    // console.log(response.data)
                })
        },
        assignTaskDetail(data){
            console.log(data)
            this.taskDetail = data
        }
    }
}
</script>

<style>

</style>