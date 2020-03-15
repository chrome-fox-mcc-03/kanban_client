<template>
  <div id="master-board">
            <div id="navbar">
                <div id="daleman">
                    <div class="bar-item">
                        <i class="fas fa-robot">Welcome back, </i>
                        {{ user.email }}            
                        <button v-on:click.prevent="logout()" id="logout">Logout</button>
                    </div>
                    <div class="logo-head">
                        KANBAN-CHAN
                    </div>
                </div>
            </div>
            <WorkColumn v-for="stat in statii" :key="stat.id" :status="stat" :todos="todos" v-on:update-task="updateTask()" v-on:add-task="addTask()" v-on:delete-task="deleteTask()"></WorkColumn>
            
        </div>
</template>

<script>
import WorkColumn from "./WorkColumn.vue"

export default {
    name: "MasterBoard",
    props: {
        user: Object,
        todos: Array
    },
    components: {
        WorkColumn: WorkColumn
    },
    data() {
        return {
            statii: [
                {
                    id: 1,
                    status: 'Backlog'},
                {
                    id: 2,
                    status: 'Product'},
                {
                    id: 3,
                    status: 'Development'},
                {
                    id: 4,
                    status: 'Done'
                }]
        }
    },
    methods: {
        logout: function() {
            this.$emit('logging-out')
        },
        addTask: function(todoData) {
            this.$emit('app-add-task', todoData)
        },
        deleteTask: function(todoData) {
            this.$emit('delete-task', todoData)
        },
        updateTask: function(todoData) {
            this.$emit('update-task', todoData)
        }
    },
}
</script>

<style>

</style>