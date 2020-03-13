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
      ></KanbanBoard>
    <ProfileTeam
      v-else
      @addTeam="addTeam"
      @moveKanbanBoard="moveKanbanBoard"
      @logout="logout"
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
      tasks : []
    }
  },
  components : {
    ProfileTeam,
    KanbanBoard
  },
  methods : {
    addTeam (payload) {
      this.$emit('addTeam', payload)
    },
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
          // console.log(this.tasks)
        })
        .catch(err => {
          // console.log(err)
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
    }
  },
  watch : {
    status (val) {
      this.status = val
    }
  }
}
</script>

<style>

</style>