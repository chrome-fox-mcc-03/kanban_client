<template>
  <main>
    <main-list></main-list>
  </main>
</template>

<script>
import List from './List';
export default {
  data() {
    return {
      message: `ini main area`
    };
  },
  components: {
    'main-list': List
  }
};
</script>

<style scope>
main {
  display: flex;
  margin-top: 12vh;
  padding: 0.5rem;
}
</style>
