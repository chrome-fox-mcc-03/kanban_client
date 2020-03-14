<template>
  <div id="right-bar-teams">
    <TeamCard
      v-for="team in teams" 
      :key="team.id"
      :team="team"
      @moveKanbanBoard="moveKanbanBoard"
      ></TeamCard>
  </div>
</template>

<script>
import TeamCard from './TeamCard.vue'

export default {
  name: 'RightBar',
  props : ['teams'],
  data () {
    return {

    }
  },
  components : {
    TeamCard
  },
  methods : {
    moveKanbanBoard (statusDashboardPage) {
      this.$emit('moveKanbanBoard', statusDashboardPage)
    }
  }
}
</script>

<style>

</style>