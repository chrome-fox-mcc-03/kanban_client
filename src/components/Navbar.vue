<template>
  <nav class="navbar app">Test Board App</nav>
</template>

<script>
export default {
  name: 'Navbar',
  // props:
}

</script>

<style lang="scss" scoped>

$appbar-height: 40px;
$navbar-height: 50px;
$list-width: 300px;
$gap: 10px;
$scrollbar-thickness: 17px;
$list-header-height: 36px;
$list-footer-height: 36px;
// Misc
$list-border-radius: 5px;
$card-border-radius: 3px;
// Colors
$board-bg-color: #0079bf;
$appbar-bg-color: #0067a3;
$list-bg-color: #e2e4e6;



.navbar {
  padding-left: $gap;
  display: flex;
  align-items: center;
  &.app {
    background-color: $appbar-bg-color;
    font-size: 1.5rem;
  }
  &.board {
    font-size: 1.1rem;
  }
}
</style>