<template>
    <div>
        <navbar 
            :currentPage="currentPage"
            @changePage="changePage">
        </navbar>

        <div v-if="loading">
            <lottie-player
                src="https://assets9.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json" background="transparent" speed="1" style="width: 100%; height: 100%; position: fixed; top:0; left:0" loop autoplay >
            </lottie-player>
        </div>

        <page-login 
            :currentPage="currentPage" 
            :token="token" @login="login"
            @loginGoogle="loginGoogle"> 
        </page-login>
        
        <page-register 
            :currentPage="currentPage" 
            @register="register"> 
        </page-register>

        <page-dashboard
            :currentPage="currentPage"
            :todos="todos" 
            @btnAdd="btnAdd" 
            @logout="logout" 
            @deleteTodo="deleteTodo" 
            @addLabel="addLabel" 
            @deleteLabel="deleteLabel" 
            @updateTodo="updateTodo"> 
        </page-dashboard>

        <notifications group="foo"> </notifications>
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
            loading:false,
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
            this.loading = true
            this.email = payload.email
            this.password = payload.password
            axios({
                url:'https://cryptic-retreat-74489.herokuapp.com/login',
                method:'POST',
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then((result) => {
                this.$notify({
                    group: 'foo',
                    title: 'Login Success',
                    text: 'success login'
                });
                this.isLogin = true
                this.email = result.data.email
                this.userId = result.data.id
                this.currentPage = 'dashboardPage'
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('email',result.data.email)
                localStorage.setItem('userId',result.data.id)
                this.token = result.data.token
                this.email = ''
                this.userId = ''
                this.getTodos()
            })
            .catch((err) => {
                console.log(err.response)
                console.log(err)
                this.$notify({
                    group: 'foo',
                    title: 'Login Failed',
                    type:'warn',
                    text: err.response.data.message
                });
            })
            .finally(() => {
                this.loading = false
            })
        },

        register (payload) {
            this.email = payload.email
            this.password = payload.password
            axios({
                url:'https://cryptic-retreat-74489.herokuapp.com/register',
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
                this.$notify({
                    group: 'foo',
                    title: 'Failed register todo',
                    type:'warn',
                    text: err.response.data.message
                });
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
                url:'https://cryptic-retreat-74489.herokuapp.com/todos',
                data: {
                    name_box,
                    description,
                    UserId:this.userId
                },
                headers: {
                    token:this.token
                }
            })
            .then((result) => {
                this.getTodos()
            }).catch((err) => {
                this.$notify({
                    group: 'foo',
                    title: 'Failed add todo',
                    type:'warn',
                    text: err.response.data.message
                });
            });
        },

        logout(objKosong) {
            this.$notify({
                group: 'foo',
                title: 'Success Logout'
            });
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
                url:`https://cryptic-retreat-74489.herokuapp.com/todos/${userId}`,
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
                this.$notify({
                    group: 'foo',
                    title: 'Failed get todo',
                    type:'warn',
                    text: err.response.data.message
                });
            });
        },

        deleteTodo(todoId) {
            console.log(todoId)
            let token = this.token
            axios({
                method:'DELETE',
                url:`https://cryptic-retreat-74489.herokuapp.com/todos/${todoId}`,
                headers: {
                    token
                }
            })
            .then((result) => {
                this.getTodos()    
            }).catch((err) => {
                this.$notify({
                    group: 'foo',
                    title: 'Failed delete todo',
                    type:'warn',
                    text: err.response.data.message
                });
            });
        },

        updateTodo(payload) {
            console.log(payload)
            let token = this.token
            let {todoId,description} = payload
            axios({
                method: 'PUT',
                url:`https://cryptic-retreat-74489.herokuapp.com/todos/${todoId}`,
                headers: {
                    token
                },
                data: {
                    description
                }
            })
            .then((result) => {
                this.getTodos()   
                this.$notify({
                    group: 'foo',
                    title: 'Success update todo'
                });
            }).catch((err) => {
                this.$notify({
                    group: 'foo',
                    title: 'Failed update todo',
                    type:'warn',
                    text: err.response.data.message
                });
            });
        },

        addLabel(payload) {
            let token = this.token
            let {inputAddLabel,selectColorLabel,todoId} = payload
            axios({
                method: 'POST',
                url:`https://cryptic-retreat-74489.herokuapp.com/label/${todoId}`,
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
                this.$notify({
                    group: 'foo',
                    title: 'Failed add label',
                    type:'warn',
                    text: err.response.data.message
                });
            });
        },

        deleteLabel(id) {
            let token = this.token
            axios({
                method: 'DELETE',
                url:`https://cryptic-retreat-74489.herokuapp.com/label/${id}`,
                headers:{
                    token
                }
            })
            .then((result) => {
                this.getTodos()
            }).catch((err) => {
                this.$notify({
                    group: 'foo',
                    title: 'Failed delete todo',
                    type:'warn',
                    text: err.response.data.message
                });
            });
        },

        loginGoogle(id_token) {
            this.loading = true
            axios({
                url:'https://cryptic-retreat-74489.herokuapp.com/loginGoogle',
                method:'POST',
                data:{
                    id_token,
                    password:'defaultpassword'
                }
            })
            .then((result) => {
                this.$notify({
                    group: 'foo',
                    title: 'Login Success',
                    text: 'success login'
                });
                this.isLogin = true
                this.email = result.data.email
                this.userId = result.data.id
                this.currentPage = 'dashboardPage'
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('email',result.data.email)
                localStorage.setItem('userId',result.data.id)
                this.getTodos()
                this.token = result.data.token
                this.email = ''
                this.userId = ''
            })
            .catch((err) => {
                this.$notify({
                    group: 'foo',
                    title: 'Login Failed',
                    type:'warn',
                    text: err.response.data.message
                });
            })
            .finally(() => {
                this.loading = false
            })
        }

    },
    created: function() {
        if(localStorage.getItem('token')) {
            this.getTodos()
            this.currentPage = 'dashboardPage'
        }
    }
}
</script>

<style>

</style>