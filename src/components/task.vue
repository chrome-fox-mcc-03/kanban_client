<template>
  <div class="card" data-toggle="modal" :data-target="'#ContentModal'+task.id" >
      <div class="card1">{{task.Title}}</div>
      <div class="card2"></div>
      <modaltask :task="task"></modaltask>
  </div>
</template>

<script>
import modaltask from './modaltask'
export default {
    props: ['task'],
    data() {
        return {

        }
    },
    components: {
        modaltask
    }
}
</script>

<style>

</style>