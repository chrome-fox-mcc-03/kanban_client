<template>
  <div>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>
              Kanbanian
              <img src="../../img/logo1.svg" alt />
            </strong>
          </p>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <!-- <p class="level-item"><strong>All</strong></p>
                        <p class="level-item"><a>Published</a></p>
                        <p class="level-item"><a>Drafts</a></p>
        <p class="level-item"><a>Deleted</a></p>-->
        <p class="level-item">
          <a v-on:click="logout()" class="button is-dark">logout</a>
        </p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$emit("logoutBtn");
    }
  }
};
</script>

<style>
</style>