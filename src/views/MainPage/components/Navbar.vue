<template>
  <div>
    <b-navbar id="navbar" toggleable="sm" type="light" variant="light">
      <b-navbar-nav align="end">
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
  #navbar {
    background-color: #f8f5e4;
    height: 10vh;
  }
</style>