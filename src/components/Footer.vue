<template>
  <footer v-html="content"></footer>
</template>

<script>
export default {
  data() {
    return {
      content: `Copyright &copy; JULESHWA 2020`
    };
  }
};
</script>

<style scope>
footer {
  color: goldenrod;
  display: flex;
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.575);
  min-height: 10vh;
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  justify-content: center;
  align-items: center;
}
</style>
