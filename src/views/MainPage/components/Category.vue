<template>
  <b-col id="category" cols="3">
    <h3 class="text-center">{{category}}</h3>
    <b-row>
      <b-col cols="12" class="mx-auto">
        <task-card
          v-for="(coba, i) in 3"
          :key="i"
        ></task-card>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import TaskCard from './TaskCard'
export default {
  name: 'Category',
  props: {
    category: String
  },
  components: {
    TaskCard
  }
}
</script>

<style scoped>
  #category {
    height: min-content;
  }

  #category h3 {
     background-color: #c0828c;
  }
</style>