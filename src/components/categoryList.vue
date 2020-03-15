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
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      axios({
          url: 'https://secure-mountain-34530.herokuapp.com/task',
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
          loader.hide();
          this.$emit('addedNewTask', result.data);
          this.title = '';
        })
        .catch(err => {
          loader.hide();
          this.$toasted.show(err.response.data.errors[0], {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });
          this.title = '';
        })
    },
    editCategoryName(id) {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      axios({
          url: `https://secure-mountain-34530.herokuapp.com/category/${id}`,
          method: 'PUT',
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
          data: {
            name: this.categoryName,
          }
        })
        .then(result => {
          loader.hide();
          this.categoryName = '';
          this.$emit('changeCategoryName', result.data.name)
          this.showInput = false;
        })
        .catch(err => {
          loader.hide();
          this.$toasted.show(err.response.data.errors[0], {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });
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
          url: `https://secure-mountain-34530.herokuapp.com/task/${task.id}`,
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
          this.$toasted.show(`Moved ${result.data.title} to category ${CategoryId}`, {
            theme: "outline",
            position: "top-right",
            duration: 3000
          });
        })
        .catch(err => {
          this.$toasted.show(err.response.data.errors[0], {
            theme: "bubble",
            position: "top-right",
            duration: 3000
          });
        })
    },
    showButtonsDialog() {
      this.$modal.show('dialog', {
        title: 'Delete confirmation',
        text: 'Are you sure to delete this category?',
        buttons: [{
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Delete',
            handler: () => {
              let loader = this.$loading.show({
                // Optional parameters
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
              });
              axios({
                  url: `https://secure-mountain-34530.herokuapp.com/category/${this.$attrs.categoryId}`,
                  method: 'delete',
                  headers: {
                    access_token: localStorage.getItem('access_token'),
                  }
                })
                .then(result => {
                  loader.hide();
                  this.$emit('deleteCategory');
                  this.$modal.hide('dialog');
                })
                .catch(err => {
                  loader.hide();
                  this.$toasted.show(err.response.data.errors[0], {
                    theme: "bubble",
                    position: "top-right",
                    duration: 3000
                  });
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