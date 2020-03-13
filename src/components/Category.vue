<template>
  <div class="category">
    <div class="name-category">
      <p>{{category.name}}</p>
    </div>
    <div class="tasks">

      <Task
        v-for="task in tasksEachCategory"
        :key="task.id"
        :task="task"
        :categories="categories"
        @updateSuccess="updateSuccess"
        @deleteSuccess="deleteSuccess"
        ></Task>
      
    </div>
    <div class="add-another-task">
      <form v-if="statusAdd" @submit.prevent="addTask(category.id)">
        <input class="input-task" type="text" placeholder="+ add another task" v-model="title">
        <button>add</button> <button @click="cancelTask">cancel</button>
      </form>
      <p v-else @click="showFormTask"><i class="fas fa-plus"></i> Add another task</p>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Task from './Task'

export default {
  name: 'Category',
  props: ['category', 'tasks', 'categories'],
  components: {
    Task
  },
  data () {
    return {
      status : false,
      title: '',
      statusAdd: false
    }
  },
  computed: {
    tasksEachCategory () {
      console.log('MASUK NIH')
      let output = []
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].CategoryId === this.category.id) {
                output.push(this.tasks[i])
            }
        }
        return output
    }
  },
  methods :  {
    showFormTask() {
      this.statusAdd = true
    },
    addTask(categoryId) {
      console.log(this.title, categoryId)
      axios({
        url: `http://localhost:3000/${localStorage.TeamId}/tasks`,
        method: 'POST',
        data: {
          title: this.title,
          description: '',
          CategoryId: categoryId,
          TeamId: localStorage.TeamId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.title = '+ add another task'
          this.$emit('refetchTask')
          this.statusAdd = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancelTask() {
      this.statusAdd = false
      this.title = ''
    },
    updateSuccess() {
      this.$emit('updateSuccess')
    },
    deleteSuccess() {
      this.$emit('deleteSuccess')
    } 
  },
  watch : {
    statusAdd (val) {
      this.statusAdd = val
    }
  }
}
</script>

<style>

</style>