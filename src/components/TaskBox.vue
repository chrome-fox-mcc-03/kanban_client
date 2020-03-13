<template>
  <div>
    <h3>{{type}}</h3>
    <br />
    <TaskCard
      v-for="(task, index) in sortedTasks"
      :key="index"
      :unitTask="task"
      @getTaskDetails1="getTaskDetails2"
      @deleteTaskById1="deleteTaskById2"
    ></TaskCard>
  </div>
</template>

<script>
import TaskCard from "./TaskCard";
export default {
  name: "TaskBox",
  methods: {
    getTaskDetails2(dataFromChild) {
      this.$emit("getTaskDetails3", dataFromChild);
    },

    deleteTaskById2(dataFromChild) {
      this.$emit("deleteTaskById3", dataFromChild);
    }
  },
  props: ["sortedTasks", "type"],
  components: {
    TaskCard
  }
};
</script>

<style>
</style>