<template>
  <div>
        <!-- Navbar -->
        <navbar :isLogin="isLogin" @logout="logout" ></navbar>
        <!-- <Hello @panggil="panggil" :msg="msg"></Hello> -->
        <!-- Navbar End -->
        <landing v-if="!isLogin" @createproject="createproject" ></landing>
        <!-- Div Dashboard Kanban -->
        <dashboard v-if="isLogin" :isProject="isProject" :projects="projects" :users="users" @generateTask="generateTask"  ></dashboard>
        <!-- template outerboard -->
        <outerboard v-if="isProject" :backlog="backlog" :product="product" :development="development" :done="done" :categories="categories" ></outerboard>
        <!-- Modal Login-->
        <modallogin @login="login"></modallogin>
        <!-- Modal register -->
        <modalregister @register="register"></modalregister>
        <!-- Modal Kanban Task -->
        <!-- <modaltask></modaltask> -->
        <!-- Modal Kanban Task Done -->
        <!-- Modal Create Task -->
        <modalcreatetask @createTask="createTask"></modalcreatetask>
        <!-- Modal Create Task Done -->
        <!-- Modal Add Projects -->
        <modaladdproject :projectname="projectname" @createproject="createproject"></modaladdproject>
        <!-- Modal Add Projects Done -->
        <!-- Modal Add Friends -->
        <modaladdfriends></modaladdfriends>
        <!-- Modal Add Friends Done -->
  </div>
</template>
    
<script>
import navbar from './components/navbar.vue'
import landing from './components/landing.vue'
import dashboard from './components/dashboard.vue'
import outerboard from './components/outerboard.vue'
import modallogin from './components/modallogin.vue'
import modalregister from './components/modalregister.vue'
import modaltask from './components/modaltask.vue'
import modalcreatetask from './components/modalcreatetask.vue'
import modaladdproject from './components/modaladdproject.vue'
import modaladdfriends from './components/modaladdfriends.vue'

import Hello from './components/Hello.vue'
export default {
    name: 'App',
    data() {
        return {
            isLogin: false,
            Loading: false,
            isProject: false,
            currentProject: '',
            project: '',
            backlog: ['test'],
            product: ['test'],
            development: ['test'],
            categoryname: '',
            done: ['test'],
            categories: ["Backlog", "Product", "Development", "Done"],
            users: [],//Kanban Board
            data: {
                title: '',
                content: '',
                category: '',
                due_date: '',
                userid: '',
                projectid: '',
                //Task Satuan Modal
            },
            projectname: '',  //untuk add projects kalau tidak ada project
            projects: [],
            msg: 'hai dunia dari app'
        }
    },
    components: {
        navbar,
        landing,
        dashboard,
        outerboard,
        modallogin,
        modalregister,
        modaltask,
        modalcreatetask,
        modaladdproject,
        modaladdfriends,
        Hello
    },
    methods : {
        panggil (data) {
            alert(data)
        },
        register (data) {
            console.log('masuk register atas')
            axios({
                method: 'post',
                url: 'http://localhost:3000/user/register',
                data: {
                  data
                }
              })
                .then(function(result) {
                    console.log('berhasil register')
                    console.log("hasil register", result)
                    
                })
                .catch(function(err) {

                })
            
        },
        login(data) {
            let self = this
            console.log('masuk Login atas')
            console.log(data)
            axios({
                method: 'post',
                url: 'http://localhost:3000/user/login',
                data: {
                  data
                }
              })
                .then(function(result) {
                    localStorage.setItem("access_token", result.data.access_token)
                    console.log('berhasil login')
                    self.isLogin = true;
                    self.generateProject()
                    $('#LoginModal').modal('hide');
                    // console.log(self.methods())
                })
                .catch(function(err) {

                })
        },
        logout() {
            this.isLogin = false
            this.IsProject = false
        },
        generateProject() {
            let self = this
            console.log('generate project')
            axios({
                url: 'http://localhost:3000/',
                method: "get",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(function(result) {
                    console.log('berhasil generate projects')
                    console.log(result)
                    self.projects = result.data
                })
                .catch(function(err) {
                    console.log(err)
                })

        },
        createproject(data) {
            let self = this
            console.log('create projects start')
            console.log(data)
            axios({
                url: 'http://localhost:3000/project/create',
                method: "post",
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    data
                }
            })
                .then(function(result) {
                    console.log('berhasil create project')
                    console.log(result)
                    self.generateProject()
                    $('#ProjectModal').modal('hide');
                    this.projects = result.data
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        generateTask(data) {
            let self = this
            self.currentProject = data
            console.log("generate task start")
            console.log(data)
            self.project = data
            axios({
                url: "http://localhost:3000/project",
                method: "post",
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    data
                }
            })
                .then(function(result) {
                    self.isProject = true
                    console.log('generate task done')
                    console.log(result.data.Backlog)
                    self.users = result.data.Users
                    self.backlog = result.data.Backlog
                    self.product = result.data.Product
                    self.development = result.data.Development
                    self.done = result.data.Done
                    console.log(result)
                })
                .catch(function(result) {

                })
        },
        createTask(data) {
            let self = this
            console.log(data)
            console.log('create task start')
            axios({
                url: "http://localhost:3000/project/task/create",
                method: "post",
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    data,
                    ProjectId: this.project
                }
            })
                .then(function(result) {
                    $('#TaskModal').modal('hide');
                    console.log(result)
                    console.log(self.project)
                    self.generateTask(self.project)
                    
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    }


}
</script>

<style>

</style>