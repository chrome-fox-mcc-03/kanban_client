<template>
  <div class="outer-card border-2 border-primary">
    <!-- <div class="phase-list"> -->
      <div class="phase-header">
          <h4 class="phase"> {{category.phase}} <span class="badge secondary"> <i class="fas fa-file-signature"></i> </span> </h4>
      </div>
      <div class="phase-body overflow-auto">
        <card v-for="(task, i) in showTasks[category.id]" :key="i" :task='task' @fetchTodo='fetchTodo'></card>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>

import Card from './Card'

export default {
    name : "OuterCard",
    props: ['category', 'showTasks'],
    data () {
      return {
       
      }
    },
    components :{
      Card
    },
    methods : {
        fetchTodo : function(){
            this.$emit('fetchTodo')
        }
    }
}
</script>

<style scoped>

.phase-body {
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.outer-card {
    width: 20vw;
    padding-top: 15px;
    padding-bottom: 15px;
    height: fit-content;
    max-height: 70vh;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.outer-card::after {
    box-shadow: inset 0 0 0 rgba(255, 255, 255, .5);
    filter: blur(10px);
}


.phase-header{
    text-align: center;
    height: 6vh;
    border-radius: 5%;
}

</style>