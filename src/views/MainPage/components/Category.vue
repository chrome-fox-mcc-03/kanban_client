<template>
  <b-col id="category" cols="3">
    <h3 class="text-center">{{category.name}}</h3>
    <b-row>
      <b-col cols="12" class="mx-auto">
        <task-card
          v-for="task in tasksFilter"
          :key="task.id"
          :task="task"
          :CategoryId="category.id"
          @changeCategory="changeCategory"
          @editTask="editTask"
          @deleteTask="deleteTask"
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
    category: Object,
    tasks: Array
  },
  components: {
    TaskCard
  },
  computed: {
    tasksFilter () {
      return this.tasks.filter(task => task.CategoryId === this.category.id) 
    }
  },
  methods: {
    changeCategory (taskId, newCategoryId) {
      this.$emit('changeCategory', taskId, newCategoryId)
    },
    editTask (taskId) {
      this.$emit('editTask', taskId)
    },
    deleteTask (taskId) {
      this.$emit('deleteTask', taskId)
    }
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