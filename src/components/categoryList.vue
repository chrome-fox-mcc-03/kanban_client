<template>
  <div class="list">
     <v-dialog></v-dialog>
        <h3 class="list-title row justify-content-between no-gutters" v-if="!showInput">
            <div class="col-auto" @click="hideInput">
             {{ category.name }}
            </div>
            <a href="#" class="col-auto" @click="showButtonsDialog">
              <i class="fas fa-trash-alt"></i>
            </a>
            </h3>
        <input ref="inputTitle" type="text" placeholder="Edit category name..."  
              @blur="hideTitle" v-else v-model="categoryName" 
              @keyup.enter="editCategoryName(category.id)" 
              class="list-title list-title-edit">
        <draggable 
          :move="checkMove"
          :list="taskList"
          group="people"
          @start="drag=true"
          @end="drag=false"
        >

        <task v-for="(el, index) in category.Tasks" :key="el.id" :task="el" 
            @changeTaskTitle="category.Tasks[index].title = $event"
            @deleteTask="category.Tasks.splice(index, 1)"></task>
        </draggable>
        <input class="add-card-btn btn addCardInput" placeholder="Add a card..." 
              @keyup.enter="addTask(category.id)" 
              v-model="title">
      </div>
</template>

<script>
import task from './task';
import axios from 'axios';
import draggable from 'vuedraggable';
export default {
  name: 'CategoryList',
  components: {
    task,
    draggable,
  },
  props: ['category'],
  data() {
    return {
      title: '',
      id: '',
      categoryName: '',
      showInput: false,
      taskList: this.category.Tasks,
    }
  },
  methods: {
    addTask(id) {
      axios({
        url: 'http://localhost:3000/task',
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          title: this.title,
          CategoryId: id,
        }
      })
        .then(result => {
          this.$emit('addedNewTask', result.data);
          this.title = '';
        })
        .catch(err => {
          console.log(err);
          this.title = '';
        })
    },
    editCategoryName(id) {
      axios({
        url: `http://localhost:3000/category/${id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          name: this.categoryName,
        }
      })
        .then(result => {
          this.categoryName = '';
          this.$emit('changeCategoryName', result.data.name)
          this.showInput = false;
        })
        .catch(err => {
          console.log(err.response);
        })
    },
    hideInput() {
      this.showInput = true;
    },
    hideTitle() {
      this.showInput = false;
    },
    checkMove(evt) {
      const CategoryId = +evt.to.parentElement.attributes.categoryid.value;
      const task = evt.draggedContext.element;
      axios({
        url: `http://localhost:3000/task/${task.id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
        data: {
          title: task.title,
          CategoryId: +CategoryId,
        }
      })
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err.response);
        })
    },
    showButtonsDialog () {
      this.$modal.show('dialog', {
        title: 'Delete confirmation',
        text: 'Are you sure to delete this category?',
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
                url: `http://localhost:3000/category/${this.$attrs.categoryId}`,
                method: 'DELETE',
                headers: {
                  access_token: localStorage.getItem('access_token'),
                }
              })
                .then(result => {
                  this.$emit('deleteCategory');
                  this.$modal.hide('dialog');
                })
                .catch(err => {
                  console.log(err.response);
                })
            }
          }
        ]
      })
    },
  },
}
</script>

<style scoped>
  .addCardInput {
    color: #3b3b3b;
  }

  ::placeholder {
  color: #9e9e9e;
}
</style>