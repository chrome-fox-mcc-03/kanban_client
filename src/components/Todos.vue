<template>
<div>
    <div class="card-list mb-3" v-for="todo in data" :key="todo.id">
      <div class="card-list-header">
          <div class="card-list-title">
              <span class="labels" v-for="label in todo.Labels" :key="label.id" :style="{background:label.color}">{{label.name}}</span>
          </div>
          <button class="content-delete-button" @click="deleteTodo(todo.id)">
              x
          </button>
      </div>
      <div class="card-list-body" @click="getDescription(todo.id)" :data-target="`#exampleModal${todo.id}`" data-toggle="modal">
          {{todo.description}}
      </div>
      <Action :data="todo" @rightAction="rightAction" @leftAction="leftAction"> </Action>
  <!-- MODAL UPDATE -->
  <div class="modal fade" :id="`exampleModal${todo.id}`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Update Todo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form>
                  <span>Label:</span>
                  <div class="temp-label">
                      <span class="labels labels-hover" v-for="label in todo.Labels" :key="label.id" :style="{background:label.color}" >
                          {{label.name}}
                          <button class="label-delete-button" @click.prevent="deleteLabel(label.id)">x</button>
                      </span> 
                  </div>
                  <br>
                  <input type="text" class="form-update-input" style="text-align: left;" placeholder="Add Label" v-model="inputAddLabel">
                  <select class="custom-select" v-model="selectColorLabel">
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                  </select>
                  <button class="btn  btn-outline-warning" @click.prevent="addLabel(todo.id)">Add Label</button> <br>
                  <span>Description</span> <br>
                  <input type="text" class="form-update-input" style="text-align: left;" placeholder="Desctiption" v-model="description">
                  <button class="btn btn-outline-dark" @click.prevent="updateTodo(todo.id)">Update</button>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
          </div>
      </div>
  </div>
  </div>
</div>
</template>

<script>
import Action from './Action'
export default {
  data () {
    return {
      inputAddLabel: '',
      description: '',
      selectColorLabel: '',
      payload: ''
    }
  },
  props: ['data'],
  components: {
    Action
  },
  methods: {
    deleteTodo (todoId) {
      console.log(this.data)
      this.$emit('deleteTodo',todoId) 
    },
    addLabel (todoId) {
      const inputAddLabel = this.inputAddLabel
      const selectColorLabel = this.selectColorLabel
      let payload = {inputAddLabel,selectColorLabel,todoId}
      this.inputAddLabel = ''
      this.selectColorLabel = ''
      this.$emit('addLabel',payload)
    },
    updateTodo (todoId) {
      const description = this.description
      const payload = {description,todoId}
      this.$emit('updateTodo',payload)
      this.description = ''
    },
    deleteLabel(labelId) {
      this.$emit('deleteLabel',labelId)
    },
    getDescription (todoId) {
      this.description = this.data.filter((el) => el.id == todoId ? el.description : '')
      this.description = this.description[0].description
    },
    rightAction (data,newBox) {
      this.$emit('rightAction',data,newBox)
    },
    leftAction (data,newBox) {
      this.$emit('leftAction',data,newBox)
    }
  }
}
</script>

<style>

</style>