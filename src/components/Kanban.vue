<template>
  <div>
      <div class="row bg-custom">
        <div class="card-title" style="width: 100%;" v-if="index == 0">
            <span class="card-list-title"> Backlog </span>
        </div>
        <div class="card-title" style="width: 100%;" v-if="index == 1">
            <span class="card-list-title"> Development </span>
        </div>
        <div class="card-title" style="width: 100%;" v-if="index == 2">
            <span class="card-list-title"> Production </span>
        </div>
        <div class="card-title" style="width: 100%;" v-if="index == 3">
            <span class="card-list-title"> Done </span>
        </div>
        <div class="content-wrapper">
            <div v-if="todos[0]">
                <Todos :data="todos" 
                @deleteTodo="deleteTodo" 
                @updateTodo="updateTodo" 
                @addLabel="addLabel"
                @deleteLabel="deleteLabel"
                @rightAction="rightAction"
                @leftAction="leftAction"> </Todos>
            </div>
            <div class="empty-card" style="text-align: center;" v-else>
                <span>Card is empty.</span>
            </div>
        </div>
    </div>
    <div class="row card-bottom">
        <input type="text" class="form-control mr-1" style="width: 75%;" placeholder="Add Card ...." v-model="inputAdd[index]">
        <button class="add-button btn btn-primary" @click="btnAdd(index)">+ Add</button>
    </div>
  </div>
</template>

<script>
import Todos from './Todos'
export default {
    data () {
        return {
            inputAdd: ['','','','']
        }
    },
    methods : {
        btnAdd(index) {
            let input = this.inputAdd[index]
            this.$emit('btnAdd',{index,input})
            this.inputAdd[index] = ''
        },
        deleteTodo(todoId) {
            this.$emit('deleteTodo',todoId)
        },
        deleteLabel(labelId) {
            this.$emit('deleteLabel',labelId)
        },
        addLabel(payload) {
            this.$emit('addLabel',payload)
        },
        updateTodo(payload) {
            this.$emit('updateTodo',payload)
        },
        rightAction(data,newBox) {
            this.$emit('rightAction',data,newBox)
        },
        leftAction(data,newBox) {
            this.$emit('leftAction',data,newBox)
        }
    },
    components: {
        Todos
    },
    props: ['todos','index']
}
</script>

<style>

</style>