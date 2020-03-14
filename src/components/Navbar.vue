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
      Toastify({
        text: 'Thanks You :)',
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        className: "info",
      }).showToast();
    }
  }
}
</script>

<style>

</style>