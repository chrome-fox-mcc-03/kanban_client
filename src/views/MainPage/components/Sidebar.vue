<template>
  <section>
    <div class="sidebar">
      <a class="active" href="#home">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',

}
</script>

<style scoped>
  .sidebar {
  margin: 0;
  padding: 0;
  width: 12vw;
  background-color: #f1f1f1;
  /* position: fixed; */
  height: 75vh;
  overflow: auto;
}

/* Sidebar links */
.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
</style>