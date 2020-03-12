<template>
  <header>
    <!-- Navigation Left -->
    <NavLeft></NavLeft>
    <!-- Navigation Right -->
    <NavRight></NavRight>
  </header>
</template>

<script>
import NavLeft from './NavLeft';
import NavRight from './NavRight';
export default {
  name: 'Header',
  data() {
    return {};
  },
  components: {
    NavLeft,
    NavRight
  }
};
</script>

<style scope>
header {
  width: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.575);
  top: 0;
  left: 0;
  position: fixed;
  min-height: 10vh;
  align-items: baseline;
  padding: 0 1rem;
  justify-content: space-between;
  z-index: 20;
}
</style>
