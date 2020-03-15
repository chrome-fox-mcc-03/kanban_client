<template>
  <div class="work-column">
                <div class="column-header">
                    <h3><b>{{ status.status }}</b></h3>
                </div>
                <div class="column-content">
                    <Item v-for="todo in selector" :key="todo.title" :todo="todo" v-on:delete-task="deleteTask()" v-on:update-task="updateTask()"></Item>
                </div>
                <div class="list-footer">
                    <div class="add-new-task">
                        <input v-if="todo.editTitle" class="title-editor" v-model="title">
                        <textarea v-if="todo.editDesc" v-model="description" class="task-description" cols="33">
                            
                        </textarea>
                    </div>
                    <div class="add-button" v-on:click="addTask()"> + </div>
                </div>
    </div>
</template>

<script>
import Item from "./Item.vue"

export default {
    name: 'WorkColumn',
    props: {
        status: Object,
        todos: Array
    },
    data() {
        return {
            title: '',
            description: ''
        }
    },
    components: {
        Item: Item
    },
    methods: {
        addTask: function() {
            // this.todos.push({
            //     title: "New Task",
            //     description: "Add description here.",
            //     status: this.status.id,
            //     editTitle: false,
            //     editDesc: false
            // })
            this.$emit('add-task', {title: this.title, description: this.description, status: this.status.id})
            this.title = ''
            this.description = ''
        },
        deleteTask: function(todoData) {
            this.$emit('delete-task', todoData)
        },
        updateTask: function(todoData) {
            this.$emit('update-task', todoData)
        }
    },
    computed: {
        selector: function() {
            return this.todos.filter(el => el.status == this.status.id)
        }
    }
}
</script>

<style>

</style>