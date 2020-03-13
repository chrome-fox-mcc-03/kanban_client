<template>
  <div id="card_container">
    <div id="task" v-for="(items, i) in taskHead" :key="i">
      <div id="task_head">{{ items }}</div>
      <task-text :taskData="taskData" :taskHead="items" @showTask="showTask"></task-text>
    </div>
  </div>
</template>

<script>
import TaskText from "./components/task-text.vue";

export default {
  name: "Card",
  data() {
    return {
      taskHead: ["todo", "process", "to_review", "done"]
    };
  },
  components: {
    TaskText
  },
  props: ["taskData"],
  methods: {
    showTask() {
      this.$emit("showTask");
    }
  }
};
</script>

<style>

#task {
  height: 70vh;
  width: 23vw;
  display: flex;
  font-size: 30px;
  margin: 2vh 0 0 2vh;
  overflow: scroll;
  flex-direction: column;
  padding: 0;
}

#task_head {
  border-bottom: 1px solid black;
  margin-bottom: 1vh;
}
</style>