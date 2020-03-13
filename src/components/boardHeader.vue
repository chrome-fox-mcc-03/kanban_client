<template>
  <header class="masthead">

      <div class="boards-menu">

        <button class="boards-btn btn"><i class="fab fa-vuejs boards-btn-icon"></i>Boards</button>

        <div class="board-search">
          <input type="search" class="board-search-input" aria-label="Board Search">
          <i class="fas fa-search search-icon" aria-hidden="true"></i>
        </div>

      </div>

      <div class="logo">

        <div><i class="fab fa-vuejs logo-icon" aria-hidden="true"></i>Canban</div>

      </div>

      <div class="user-settings">

        <button class="user-settings-btn btn" aria-label="Create">
          <i class="fas fa-plus" aria-hidden="true"></i>
        </button>

        <button class="user-settings-btn btn" aria-label="Information">
          <i class="fas fa-info-circle" aria-hidden="true"></i>
        </button>

        <button class="user-settings-btn btn" aria-label="Notifications">
          <i class="fas fa-bell" aria-hidden="true"></i>
        </button>

        <button @click="logout" class="user-settings-btn btn" aria-label="User Settings">
          <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
        </button>

      </div>

    </header>
</template>

<script>
export default {
  name: 'BoardHeader',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  }
}
</script>

<style>

</style>