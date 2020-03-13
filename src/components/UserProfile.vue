<template>
  <div class="avatar">
    <p><i class="fas fa-user-circle"></i></p>
    <p>{{nameUser}}</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      nameUser : localStorage.nameUser || ''
    }
  }
}
</script>

<style>

</style>