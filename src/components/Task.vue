<template>
  <div class="task">
    <p>{{task.title}}</p>
    <a @click="viewTask(task.id)"><i class="fas fa-pen"></i></a>
    <a @click="deleteTask(task.id)"><i class="fas fa-trash"></i></a>

    <b-modal :id="`bv-modal-example${task.id}`" hide-footer>
 
        <div class="d-block text-center">
            <center>
            <form style="" v-on:submit.prevent="updateTask(dataTask.id)">
                <h2>Update Task</h2>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="edit-title" class="form-control" v-model="dataTask.title">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" id="edit-description" class="form-control" v-model="dataTask.description">
                </div>
                <div id="edit-status">
                    <label>Category : </label>
                    <select name="status" v-model="dataTask.CategoryId">
                        <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">{{category.name}}</option>
                    </select>
                </div>
                <br>
                <b-button class="mt-3 btn btn-primary" block type="submit" style="background-color:blue">Submit</b-button>
            </form>
        </center>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide(`bv-modal-example${task.id}`)" style="background-color:red">Cancel</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Task',
  props: ['task', 'categories'],
  data () {
    return {
      dataTask : {}
    }
  },
  methods: {
    viewTask(taskId) {
      axios({
        url: `http://localhost:3000/${localStorage.TeamId}/tasks/${taskId}`,
        method: 'GET',
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.dataTask = data
          this.$bvModal.show(`bv-modal-example${taskId}`)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    updateTask(taskId){
      axios({
          url : `http://localhost:3000/${localStorage.TeamId}/tasks/${taskId}`,
          method : "PUT",
          data : {
              title : this.dataTask.title,
              description : this.dataTask.description,
              CategoryId: +this.dataTask.CategoryId
          },
          headers : {
              access_token : localStorage.access_token
          }
      })
          .then(({ data })=> {
              this.$bvModal.hide(`bv-modal-example${taskId}`)
              this.$emit('updateSuccess')
          })
          .catch(err => {
              console.log(err)
          })
    },
    deleteTask(taskId) {
      axios({
        url : `http://localhost:3000/${localStorage.TeamId}/tasks/${taskId}`,
        method : "DELETE",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$emit('deleteSuccess')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>