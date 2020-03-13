<template>
  <section id="dashboard-page">
    <Navbar
      @logout="logout"
      ></Navbar>
    <div class="container">
      <div id="dashboard-page-team">

        <LeftBar 
          :teams="teams"
          @addTeam="addTeam"
          ></LeftBar>

        <RightBar
          :teams="teams"
          @moveKanbanBoard="moveKanbanBoard"
          ></RightBar>  

      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'
import LeftBar from './LeftBar.vue'
import RightBar from './RightBar.vue'

export default {
  name: 'ProfileTeam',
  props: [],
  data () {
    return {
      teams : []
    }
  },
  components : {
    Navbar,
    LeftBar,
    RightBar
  },
  methods : {
    addTeam (payload) {
      this.$emit('addTeam', payload)
    },
    moveKanbanBoard (statusDashboardPage) {
      this.$emit('moveKanbanBoard', statusDashboardPage)
    },
    logout () {
      this.$emit('logout')
    },
    fetchTeams () {
      axios({
        url: 'http://localhost:3000/teams',
        methods: 'GET',
        headers : {
          access_token : localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.teams = data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
  },
  created () {
    this.fetchTeams()
  }
}
</script>

<style>

</style>