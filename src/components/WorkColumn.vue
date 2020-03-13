<template>
  <div class="work-column">
                <div class="column-header">
                    <h3><b>{{ status.status }}</b></h3>
                </div>
                <div class="column-content">
                    <Item v-for="todo in selector" :key="todo.title" :todo="todo"></Item>
                </div>
                <div class="list-footer">
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
    components: {
        Item: Item
    },
    methods: {
        addTask: function() {
            this.todos.push({
                title: "New Task",
                description: "Add description here.",
                status: this.status.id,
                editTitle: false,
                editDesc: false
            })
            
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