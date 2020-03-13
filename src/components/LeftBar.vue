<template>
  <div id="left-bar-teams">
    
    <UserProfile></UserProfile>

    <div class="up-bar">
      <i class="fab fa-flipboard"></i>
      <p>Board</p>
    </div>

    <BoardTeam 
      :teams="teams"
      @addTeam="addTeam"
      ></BoardTeam>
  </div>
</template>

<script>
import UserProfile from './UserProfile.vue'
import BoardTeam from './BoardTeam.vue'

export default {
  name: 'LeftBar',
  props: ['teams'],
  data () {
    return  {

    }
  },
  components : {
    UserProfile,
    BoardTeam
  },
  methods : {
    addTeam (payload) {
      this.$emit('addTeam', payload)
    }
  }
}
</script>

<style>

</style>