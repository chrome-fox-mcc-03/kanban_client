<template>
  <div>
        <!-- Navbar -->
        <navbar :isLogin="isLogin" @logout="logout" @onSignInSuccess="onSignInSuccess" @onSignInError="onSignInError" @signOut="signOut"></navbar>
        <!-- <Hello @panggil="panggil" :msg="msg"></Hello> -->
        <!-- Navbar End -->
        <landing v-if="!isLogin" @createproject="createproject" ></landing>
        <!-- Div Dashboard Kanban -->
        <dashboard v-if="isLogin" :isProject="isProject" :projects="projects" :users="users" @generateTask="generateTask"  ></dashboard>
        <!-- template outerboard -->
        <outerboard @updatethis="updatethis" @deletethis="deletethis" v-if="isProject" :backlog="backlog" :product="product" :development="development" :done="done" :categories="categories" ></outerboard>
        <!-- Modal Login-->
        <modallogin @login="login"></modallogin>
        <!-- Modal register -->
        <modalregister @register="register"></modalregister>
        <!-- Modal Create Task -->
        <modalcreatetask @createTask="createTask"></modalcreatetask>
        <!-- Modal Create Task Done -->
        <!-- Modal Add Projects -->
        <modaladdproject :projectname="projectname" @createproject="createproject"></modaladdproject>
        <!-- Modal Add Projects Done -->
        <!-- Modal Add Friends -->
        <modaladdfriends @addFriend="addFriend"></modaladdfriends>
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
import GoogleLogin from 'vue-google-login';
import Hello from './components/Hello.vue'
export default {
    name: 'App',
    data() {
        return {
            googleSignInParams: {
                client_id: '1025007694828-ihmb2m11jrfubgbkp40n244kldd1ul8u.apps.googleusercontent.com'
            },
            isLogin: false,
            Loading: false,
            isProject: false,
            currentProject: '',
            project: '',
            backlog: [],
            product: [],
            development: [],
            categoryname: '',
            done: [],
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
                url: 'https://glacial-waters-19885.herokuapp.com/user/register',
                data: {
                  data
                }
              })
                .then(function(result) {
                    console.log('berhasil register')
                    console.log("hasil register", result)
                    $('#RegisterModal').modal('hide');
                    self.$toasted.show('Register Success')
                    
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
                url: 'https://glacial-waters-19885.herokuapp.com/user/login',
                data: {
                  data
                }
              })
                .then(function(result) {
                    localStorage.setItem("access_token", result.data.access_token)
                    console.log('berhasil login')
                    self.isLogin = true;
                    self.generateProject()
                    $('#LoginModal').modal('hide')
                    self.$toasted.show('Login Success')
                    // console.log(self.methods())
                })
                .catch(function(err) {

                })
        },
        onSignInSuccess (googleUser) {
            let self = this
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            const profile = googleUser.getBasicProfile() // etc etc
            const token = googleUser.getAuthResponse().id_token
            axios({
                url:"https://glacial-waters-19885.herokuapp.com/user/googlelogin",
                method: "post",
                headers: {
                    token
                }

            })
                .then(function(result) {
                    localStorage.setItem('access_token', result.data.access_token)
                    self.isLogin = true;
                    self.generateProject()
                    self.$toasted.show('Login Success')
                })
                .catch(function(err) {

                })
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        },
        logout() {
            this.isLogin = false
            this.isProject = false
            this.project = ''
            this.projects = []
            localStorage.removeItem('access_token')
  
        },
        signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
        },
        generateProject() {
            let self = this
            console.log('generate project')
            axios({
                url: 'https://glacial-waters-19885.herokuapp.com/',
                method: "get",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(function(result) {
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
                url: 'https://glacial-waters-19885.herokuapp.com/project/create',
                method: "post",
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    data
                }
            })
                .then(function(result) {
                    self.$toasted.show('Project Created')
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
                url: "https://glacial-waters-19885.herokuapp.com/project",
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
                url: "https://glacial-waters-19885.herokuapp.com/project/task/create",
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
                    self.generateTask(self.project)
                    self.$toasted.show('Task Created')
                    
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        addFriend(email) {
            let self = this
            console.log('addfriend app.vue')
            let data = {
                Email: email,
                ProjectId: this.project
            }
            axios({
                url: 'https://glacial-waters-19885.herokuapp.com/project/addfriend',
                method: "post",
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    data
                }
            })
                .then(function(result) {
                    $('#FriendsModal').modal('hide');
                    self.generateTask(self.currentProject)
                    self.$toasted.show('Friend Added')
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        deletethis(data) {
            let self = this
            console.log(`ini adalah ${data}`)
            axios({
                url:`https://glacial-waters-19885.herokuapp.com/project/task/delete/${data}`,
                method: "delete",
                headers: {
                    access_token : localStorage.getItem('access_token')
                }

            })
            .then(function(result) {
                self.$toasted.show('Delete Success')
                $('.modal-backdrop').remove()
                self.generateTask(self.currentProject)
                $(`#ContentModal${data.id}`).modal('hide');
            })
            .catch(function(err) {
                console.log(err)
            })
        },
        updatethis(data) {
            let self = this
            console.log(`update data ${data.id}`)
            axios({
                url:`https://glacial-waters-19885.herokuapp.com/project/task/update/${data.id}`,
                method: "put",
                headers: {
                    access_token : localStorage.getItem('access_token')
                },
                data: {
                    data
                }
            })
                .then(function(result) {
                self.$toasted.show('Update Success')
                self.generateTask(self.currentProject)
                $('.modal-backdrop').remove()
                $(`#ContentModal${data.id}`).modal('hide');
                })
                .catch(function(err) {
                    console.log('gagal update')
                    console.log(err)
                })
        }
    },
    
    created() {
        if(localStorage.getItem('access_token')) {
            this.isLogin = true
            this.generateProject()
        }
        else {
            this.isLogin = false
        }
    },
    mounted() {
        $('#FriendsModal').modal('hide');
        $('#ProjectModal').modal('hide');
        $('#TaskModal').modal('hide');
        $('#LoginModal').modal('hide');
        $('#RegisterModal').modal('hide');
        $('#ContentModal').modal('hide');

    }


}
</script>

<style>

</style>