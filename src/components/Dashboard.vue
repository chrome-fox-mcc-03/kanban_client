<template>
  <div>
    <KanbanBoard
      v-if="status"
      :tasks="tasks"
      @addMember="addMember"
      :members="members"
      @backProfileTeam="backProfileTeam"
      @logoutFromBoard="logoutFromBoard"
      @refetchTask="refetchTask"
      @updateSuccess="updateSuccess"
      @deleteSuccess="deleteSuccess"
      ></KanbanBoard>
    <ProfileTeam
      v-else
      @addTeam="addTeam"
      @moveKanbanBoard="moveKanbanBoard"
      @logout="logout"
      :teams="teams"
      ></ProfileTeam>

  </div>
</template>

<script>
import axios from 'axios'
import ProfileTeam from './ProfileTeam.vue'
import KanbanBoard from './KanbanBoard.vue'

export default {
  name: 'Dashboard',
  props: ['members'],
  data () {
    return {
      currentDashboardPage : '',
      status: false,
      tasks : [],
      teams: []
    }
  },
  components : {
    ProfileTeam,
    KanbanBoard
  },
  methods : {
    moveKanbanBoard (statusDashboardPage) {
      this.status = statusDashboardPage
      this.fetchTasks (localStorage.TeamId)
    },
    addMember (payload) {
      this.$emit('addMember', payload)
    },
    logout () {
      this.$emit('logout')
    },
    fetchTasks (teamId) {
      axios({
        url: `http://localhost:3000/${teamId}/tasks`,
        method: 'GET',
        headers: {
          access_token : localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.tasks = data
        })
        .catch(err => {
          console.log(err.response)
        })
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
    addTeam (payload) {
      axios({
        url: 'http://localhost:3000/teams',
        method: 'POST',
        data: {
           name: payload.name
        },
        headers: {
          access_token : localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$bvModal.hide(`add-team`)
          this.fetchTeams()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    backProfileTeam(statusProfileTeam) {
      this.status = statusProfileTeam
    },
    logoutFromBoard () {
      this.$emit('logoutFromBoard')
    },
    refetchTask() {
      const TeamId = localStorage.getItem('TeamId')
      this.fetchTasks(TeamId)
    },
    updateSuccess() {
      const TeamId = localStorage.getItem('TeamId')
      this.fetchTasks(TeamId)
    },
    deleteSuccess() {
      const TeamId = localStorage.getItem('TeamId')
      this.fetchTasks(TeamId)
    }
  },
  watch : {
    status (val) {
      this.status = val
    }
  },
  created() {
    this.fetchTeams()
  }
}
</script>

<style>

</style>