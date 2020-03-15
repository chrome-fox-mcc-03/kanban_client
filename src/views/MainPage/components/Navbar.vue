<template>
  <div>
    <b-navbar id="navbar" toggleable="sm" type="light" variant="light">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown :text="username">
          <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      username: localStorage.getItem('username')
    }
  },
  methods: {
    logout () {
      const user = this.username
      localStorage.clear()
      this.$emit('changeCurrentPage', 'landing')
    }
  }
}
</script>

<style scoped>
  #navbar {
    background-color: #f8f5e4;
    height: 10vh;
  }
</style>