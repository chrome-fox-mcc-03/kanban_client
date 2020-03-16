<template>
  <div>
      <card :taskData="taskData" @showTask="showTask"></card>
  </div>
</template>

<script>
import Card from './components/card';

export default {
    name: 'MainPage',
    components: {
        Card
    },
    props: [
        "taskData"
    ],
    methods: {
        showTask() {
            this.$emit('showTask')
        }
    }
}
</script>

<style>

#card_container {
    display: flex;
    padding: 2vh 0 0 4vh;
}

</style>