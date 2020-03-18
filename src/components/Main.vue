<template>
  <main>
    <main-list :listData="listData" :taskData="taskData" :appStatus="appStatus"></main-list>
  </main>
</template>

<script>
import List from "./List";
export default {
  name: "Main",
  props: ["appStatus", "listData", "taskData"],
  data() {
    return {
      message: `ini main area`
    };
  },
  components: {
    "main-list": List
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
