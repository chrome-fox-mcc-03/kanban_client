<template>
  <nav
    class="navbar navbar-custom fixed-top justify-content-between align-items-centers pr-0"
  >
    <div class="row" style="width: 100%;">
      <div class="col d-flex justify-content-start align-items-start">
        <button type="button" class="btn btn-danger btn-sm" @click="logOut">
          Log Out
        </button>
      </div>
      <div class="col justify-content-center d-flex">
        <a class="navbar-brand">
          <img
            src="/assets/shield.png"
            width="30"
            height="30"
            alt="kanban-quest-logo"
          />
          Kanban Quest
        </a>
      </div>
      <div
        class="col d-flex justify-content-end pr-0 align-items-centers"
      ></div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logOut() {
      localStorage.clear();
      this.$emit("log-out");
    }
  }
};
</script>

<style scoped>
.navbar-custom {
  background-color: #f67575;
  height: 50px;
  padding: 5px;
}

/* change the brand and text color */
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
  color: white;
}
/* change the link color */
.navbar-custom .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.5);
}
/* change the color of active or hovered links */
.navbar-custom .nav-item.active .nav-link,
.navbar-custom .nav-item:hover .nav-link {
  color: #ffffff;
}
</style>
