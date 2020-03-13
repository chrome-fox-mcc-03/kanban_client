<template>
  <nav id="navbar-dash">
    <a><i class="fas fa-home"></i></a>
    <p>SweatBan</p>
    <a @click="logoutProcess"><i class="fas fa-sign-out-alt"></i></a>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods : {
    logoutProcess() {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>