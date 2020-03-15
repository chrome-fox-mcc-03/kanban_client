<template>
  <div>
    <nav>
      <navbar
        @changePage="changePage"
        :currentPage="currentPage"
        @clearMsg="clearMsg"
      ></navbar>
    </nav>
    <div >
      <home
        v-if="currentPage === 'home'"
        @clearMsg="clearMsg"
        :groupId="idGroup"
        @changePage="changePage"
        @payloadEdit="edit"
        :msg="msg"
      ></home>

      <register
        v-else-if="currentPage === 'register'"
        @changePage="changePage"
        @notification="notification"
      ></register>

      <login
        v-else-if="currentPage === 'login'"
        @changePage="changePage"
        :msg="msg"
        @notification="notification"
        @clearMsg="clearMsg"
      ></login>

      <group
        v-else-if="currentPage === 'group'"
        @changePage="changePage"
        @groupId="groupId"
        :msg="msg"
        @clearMsg="clearMsg"
      ></group>

      <create
        v-else-if="currentPage === 'create'"
        @changePage="changePage"
        @notification="notification"
        :groupId="idGroup"
      ></create>

      <invite
        v-else-if="currentPage === 'invite'"
        @changePage="changePage"
        :groupId="idGroup"
        @notification="notification"
      ></invite>

      <edit
        v-else-if="currentPage === 'edit'"
        @changePage="changePage"
        :groupId="idGroup"
        @notification="notification"
        :payloadEdit="payloadEdit"
      ></edit>

      <createg
        v-else
        @changePage="changePage"
        @notification="notification"
      ></createg>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar'
import Register from './components/Form/Register'
import Login from './components/Form/Login'
import Home from './components/Home/Home'
import Create from './components/Form/Create'
import Group from './components/Group/Group'
import Createg from './components/Form/CreateGroup'
import Invite from './components/Form/Invite'
import Edit from './components/Form/Edit'

export default {
  name: 'App',
  data() {
    return {
      currentPage: '',
      idGroup: 0,
      payloadEdit: 0,
      msg: {
        action: false
      }
    };
  },
  components: {
    Navbar,
    Register,
    Login,
    Home,
    Create,
    Group,
    Createg,
    Invite,
    Edit
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    groupId(id) {
      this.idGroup = id
    },
    edit (payload) {
      this.payloadEdit = payload
    },
    notification(message) {
      this.msg = message
    },
    clearMsg () {
      this.msg = {
        action: false
      }
    }
  },
  created () {
    if(localStorage.getItem('token')) {
      this.currentPage = 'group'
    } else {
      this.currentPage = 'login'
    }
  }
};
</script>

<style scoped>
</style>