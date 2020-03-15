<template>
  <ul class="list-items">
    <v-dialog></v-dialog>
    <li v-if="showInput" class="row justify-content-between no-gutters">
      <div  @click="inputToggle" class="col-auto">
      {{ task.title }}
      </div>
      <a @click="showButtonsDialog(task.id)" class="col-auto" href="#">
        <i class="fas fa-trash-alt"></i>
      </a>
      </li>
    <li v-else>
     <input type="text" placeholder="Edit title..."  
              @blur="inputBlur"  
              @keyup.enter="editTitle(task.id, task.CategoryId)" 
              v-model="taskTitle"
              >
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  name: 'task',
  props: ['task'],
  data() {
    return {
      showInput: true,
      taskTitle: '',
    };
  },
  methods: {
    inputToggle() {
      this.showInput = false;
    },
    inputBlur() {
      this.showInput = true;
    },
    editTitle(taskId, categoryId) {
      console.log(taskId, categoryId, '<<<<<<<<<<<<<');
      axios({
        url: `http://localhost:3000/task/${taskId}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          title: this.taskTitle,
          CategoryId: categoryId,
        }
      })
        .then(result => {
          this.$emit('changeTaskTitle', result.data.title)
          this.showInput = true;
        })
        .catch(err => {
          console.log(err);
        })
    },
    showButtonsDialog (id) {
      this.$modal.show('dialog', {
        title: 'Delete confirmation',
        text: 'Are you sure to delete this task?',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Delete',
            handler: () => {
              axios({
                url: `http://localhost:3000/task/${id}`,
                method: 'delete',
                headers: {
                  access_token: localStorage.getItem('access_token'),
                },
              })
                .then(result => {
                  this.$emit('deleteTask');
                  this.$modal.hide('dialog')
                })
                .catch(err => {
                  console.log(err.response);
                  this.$modal.hide('dialog');
                })
            }
          }
        ]
      })
  },
  }
}
</script>

<style scoped>
input {
  border: none;
  margin: 0;
  width: 100%;
  height: 100%
}
</style>