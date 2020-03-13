<template>
  <div class="task">
    <p>{{task.title}}</p>
    <a><i class="fas fa-pen"></i></a>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['task']
}
</script>

<style>

</style>