<template>
    <div> <!-- Emit biasanya berhubungan dengan method, Props biasanya berhubungan dengan data -->
        <navbar :currentPage="currentPage" @changePage="changePage"> </navbar>  <!-- Emmit & props -->
        <page-login :currentPage="currentPage" :token="token" @login="login"> </page-login> <!-- Emit -->
        <page-register :currentPage="currentPage" @register="register"> </page-register>
        <page-dashboard
            :currentPage="currentPage"
            @btnAdd="btnAdd" @logout="logout" :todos="todos" @deleteTodo="deleteTodo" @addLabel="addLabel" @deleteLabel="deleteLabel" @updateTodo="updateTodo"> </page-dashboard>
    </div>
</template>

<script>
import Navbar from './components/Navbar'
import PageLogin from './components/PageLogin'
import PageRegister from './components/PageRegister'
import PageDashboard from './components/PageDashboard'

export default {
    name:'App',
    data() {
        return {
            currentPage : 'registerPage',
            isLogin:false,
            userId:localStorage.getItem('userId'),
            email:'',
            password:'',
            todos: [],
            token: localStorage.getItem('token')
        }
    },
    components: {
        Navbar,
        PageLogin,
        PageRegister,
        PageDashboard
    },
    methods : {
        changePage (page) {
            this.currentPage = page
        },
        
        login (payload) {
            this.email = payload.email
            this.password = payload.password
            axios({
                url:'http://localhost:3000/login',
                method:'POST',
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then((result) => {
                console.log(result)
                this.isLogin = true
                this.email = result.data.email
                this.userId = result.data.id
                this.currentPage = 'dashboardPage'
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('email',result.data.email)
                localStorage.setItem('userId',result.data.id)
                this.getTodos()
                this.token = result.data.token
                this.email = '' // pindah di login
                this.userId = ''
                // this.getTodos()
            }).catch((err) => {
                console.log(err)
            });
        },

        register (payload) {
            this.email = payload.email
            this.password = payload.password
            axios({
                url:'http://localhost:3000/register',
                method:'POST',
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then((result) => {
                this.isLogin = true
                this.email = result.data.email
                this.userId = result.data.id
                this.currentPage = 'dashboardPage'
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('email',result.data.email)
                localStorage.setItem('userId',result.data.id)
                this.token = result.data.token
            }).catch((err) => {
                console.log(err)
            });
        },

        btnAdd(payload) {
            let {index,input} = payload
            let name_box = null
            let description = input

            if(index == 0) {
                name_box = 'Backlog'
            }else if(index == 1) {
                name_box = 'Development'
            }else if(index == 2) {
                name_box = 'Product'
            }else if(index == 3) {
                name_box = 'Done'
            }

            axios({
                method:'POST',
                url:'http://localhost:3000/todos',
                data: {
                    name_box,
                    description,
                    UserId:this.userId,
                    token:this.token
                }
            })
            .then((result) => {
                // this.todos[index] = [...this.todos[index],name_box,description]
                this.getTodos()
                console.log(this.todos)
            }).catch((err) => {
                console.log(err)
            });
        },

        logout(objKosong) {
            localStorage.clear()
            this.isLogin = false
            this.currentPage = 'loginPage'
            this.token = ''
        },

        getTodos() {
            let userId = this.userId
            let token = this.token
            axios({
                method:'GET',
                url:`http://localhost:3000/todos/${userId}`,
                headers: {
                    token
                }
            })
            .then((result) => {
                let filteredDevelopment = result.data.filter((el) => {return el.name_box == 'Development'})
                let filteredBackLog = result.data.filter((el) => {return el.name_box == 'Backlog'})
                let filteredProduct = result.data.filter((el) => {return el.name_box == 'Product'})
                let filteredDone = result.data.filter((el) => {return el.name_box == 'Done'})
                this.todos = [filteredBackLog,filteredDevelopment,filteredProduct,filteredDone]
            }).catch((err) => {
                console.log(err)
            });
        },

        deleteTodo(todoId) {
            console.log(todoId)
            let token = this.token
            axios({
                method:'DELETE',
                url:`http://localhost:3000/todos/${todoId}`,
                headers: {
                    token
                }
            })
            .then((result) => {
                this.getTodos()    
            }).catch((err) => {
                console.log(err)
            });
        },

        updateTodo(payload) {
            console.log(payload)
            let token = this.token
            let {todoId,description} = payload
            axios({
                method: 'PUT',
                url:`http://localhost:3000/todos/${todoId}`,
                headers: {
                    token
                },
                data: {
                    description
                }
            })
            .then((result) => {
                this.getTodos()   
            }).catch((err) => {
                console.log(err)
            });
        },

        addLabel(payload) {
            let token = this.token
            let {inputAddLabel,selectColorLabel,todoId} = payload
            axios({
                method: 'POST',
                url:`http://localhost:3000/label/${todoId}`,
                data: {
                    inputAddLabel,
                    selectColorLabel
                },
                headers: {
                    token
                }
            })
            .then((result) => {
                this.getTodos()    
            }).catch((err) => {
                console.log(err)
            });
        },

        deleteLabel(id) {
            let token = this.token
            axios({
                method: 'DELETE',
                url:`http://localhost:3000/label/${id}`,
                headers:{
                    token
                }
            })
            .then((result) => {
                this.getTodos()
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    created: function() {
        if(localStorage.getItem('token')) {
            this.getTodos()
            this.currentPage = 'dashboardPage'
        }
    },
    // beforeMount() {
    //     alert('test')
    // }
}
</script>

<style>

</style>