<template>
  <div>
      <h3 > {{type}} </h3><br>
      <TaskCard
            v-for="(task, index) in sortedTasks" :key="index"
            :unitTask="task"
            @getTaskDetails1="getTaskDetails2"
      ></TaskCard>

  </div>
</template>

<script>

import TaskCard from "./TaskCard"
export default {
    name: "TaskBox",
    methods: {
getTaskDetails2(data) {
  this.$emit('getTaskDetails3',data)
}
    },
    props: ['sortedTasks', 'type'],
    components: {
        TaskCard
    }

}
</script>

<style>

</style>