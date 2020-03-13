<template>
  <div>
    <nav>
      <navbar @changePage="changePage" :currentPage="currentPage"></navbar>
    </nav>
    <div >
      <home v-if="currentPage === 'home'" :groupId="idGroup" ></home>
      <register v-else-if="currentPage === 'register'" @changePage="changePage" @sendMessage="sendMessage" ></register>
      <login v-else-if="currentPage === 'login'" @changePage="changePage" :input="input" ></login>
      <group v-else-if="currentPage === 'group'" @changePage="changePage" @groupId="groupId"></group>
      <create v-else-if="currentPage === 'create'" @changePage="changePage" :groupId="idGroup"></create>      
      <invite v-else-if="currentPage === 'invite'" :groupId="idGroup"></invite>
      <edit v-else-if="currentPage === 'edit'"></edit>
      <createg v-else  @changePage="changePage"></createg>
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
      input: '',
      idGroup: 0
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
    sendMessage(message) {
      this.input = message
    },
    groupId(id) {
      this.idGroup = id
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