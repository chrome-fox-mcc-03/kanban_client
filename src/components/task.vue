<template>
  <div class="card"  >
      <div class="card1">{{task.Title}}</div>
      <div class="card2"><button data-toggle="modal" :data-target="'#ContentModal'+task.id" > Show Info</button></div>
      <modaltask @updatethis="updatethis" @deletethis="deletethis" :task="task"></modaltask>
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
    methods: {
        deletethis(data) {
            this.$emit('deletethis', data)
        },
        updatethis(data) {
            this.$emit('updatethis', data)
        }
    },
    components: {
        modaltask
    }
}
</script>

<style>

</style>