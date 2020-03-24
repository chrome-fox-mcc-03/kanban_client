<template>
  <div
    id="base"
    class="d-flex justify-content-center align-items-center flex-column"
  >
    <lottie-player
      src="https://assets3.lottiefiles.com/datafiles/yHc09CaY4TXtqFA/data.json"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px;"
      loop
      autoplay
    >
    </lottie-player>
    <div class="mt-0 pt-0" style="color: #f67575">
      <h1>Now Loading...</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped>
#base {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 100;
}
</style>
