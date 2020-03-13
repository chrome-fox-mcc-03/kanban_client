<template>
  <div class="content-section">
      <card-board @fetchTodo="fetchTodo" :showTasks='showTasks'></card-board>
  </div>
</template>

<script>
import CardBoard from './CardBoard'

import axios from 'axios'

export default {
    name : 'ContentSection',
    props : ['showTasks'],
    components : {
        CardBoard
    },
    methods : {
        fetchTodo : function(){
            this.$emit('fetchTodo')
        }
    }

}
</script>

<style>

.content-section {
    /* background-color: grey; */
    width: 100vw;
    height: 80vh;
    margin-top: 4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

</style>