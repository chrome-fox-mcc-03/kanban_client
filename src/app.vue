<template>
  <div>
        <!-- Navbar -->
        <navbar :isLogin="isLogin" @logout="logout" ></navbar>
        <!-- <Hello @panggil="panggil" :msg="msg"></Hello> -->
        <!-- Navbar End -->
        <landing v-if="!isLogin" @createproject="createproject"></landing>
        <!-- Div Dashboard Kanban -->
        <dashboard v-if="isLogin"  ></dashboard>
        <!-- template outerboard -->
        <outerboard v-if="isLogin" ></outerboard>
        <!-- Modal Login-->
        <modallogin @login="login"></modallogin>
        <!-- Modal register -->
        <modalregister @register="register"></modalregister>
        <!-- Modal Kanban Task -->
        <modaltask></modaltask>
        <!-- Modal Kanban Task Done -->
        <!-- Modal Create Task -->
        <modalcreatetask></modalcreatetask>
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
            IsProject: false,
            projectselect: '',
            projectname: '',
            projects: ['test', "test1", 'test2', "text3", "text4"],
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
                    self.isLogin = true
                    console.log(self.methods())
                })
                .catch(function(err) {

                })
        },
        logout() {
            this.isLogin = false
            this.IsProject = false
        },
        generateProject() {
            axios({
                url: 'http://localhost:3000/project',
                method: "post",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(function(result) {
                    console.log('berhasil generate projects')
                    console.log(result)
                })
                .catch(function(err) {
                    console.log(err)
                })

        },
        createproject(data) {
            console.log('create projects start')
            console.log(data)
        }
    }


}
</script>

<style>

</style>