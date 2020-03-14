<template>
  <div class="team">
    <i class="fas fa-users"></i>
    <p>{{team.Team.name}}</p>
  </div>
</template>

<script>
export default {
  name: 'TeamCollection',
  props : ['team']
}
</script>

<style>

</style>