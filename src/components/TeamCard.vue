<template>
  
  <div class="team-board" @click="moveKanbanBoard(team.Team.id)">
    <p>{{team.Team.name}}</p>
    <img src="../../assets/img/flight-landscape-nature-sky-36717.jpg">
  </div>
</template>

<script>
export default {
  name: 'TeamCard',
  props : ['team'],
  methods : {
    moveKanbanBoard (teamId) {
      localStorage.setItem('TeamId', teamId)
      let statusDashboardPage = true

      this.$emit('moveKanbanBoard', statusDashboardPage)
    }
  }
}
</script>

<style>

</style>