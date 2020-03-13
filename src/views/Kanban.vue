<template>
    <div>
        <kanban-navbar @logout="logout" :userName="userName" :userImageUrl="userImageUrl"></kanban-navbar>
        <div class="dashboardPage">
            <kanban-add-task @addTask="addTask"></kanban-add-task>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <kanban-box v-for="(category,i) in categories" :category="category" :key="i" :tasks="tasks" 
                        @updateLeft="updateLeft" @updateRight="updateRight" 
                        @deleteTask="deleteTask">
                    </kanban-box>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import KanbanNavbar from '../components/KanbanNavbar'
    import KanbanAddTask from '../components/KanbanAddTask'
    import KanbanBox from '../components/KanbanBox'
    export default {
        name: 'Kanban',
        data() {
            return {
                categories: ['Backlog', 'Product', 'Development', 'Done']
            }
        },
        methods: {
            logout() {
                this.$emit('logout')
            },
            addTask(data) {
                this.$emit('addTask', data)
            },
            updateRight(data) {
                this.$emit('updateRight', data)
            },
            updateLeft(data) {
                this.$emit('updateLeft', data)
            },
            deleteTask(data) {
                this.$emit('deleteTask', data)
            }
        },
        components: {
            KanbanNavbar,
            KanbanAddTask,
            KanbanBox
        },
        props: ['tasks', 'userName', 'userImageUrl']
        
    }
</script>

<style>
    .row {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        background-color: #3fc1c9;
        overflow-y: auto;
        height: 76vh;
    }

    .box {
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #f5f5f5;
        margin: 10px 10px;
        min-width: 18em;
        max-height: 75vh;
        overflow-x: auto;
        height: max-content;
    }

    .card {
        width: 17em;
        border-radius: 5px;
        box-sizing: border-box;
        margin: 10px 0;
    }

    .kanban-title {
        margin-top: 10px;
    }

    .card-body {
        padding: 10px;
    }

    .card-text {
        font-size: 10px;
        font-family: 'Roboto', sans-serif;
    }

    .card-title {
        font-size: 15px;
        margin: 10px;
        font-family: 'Proza Libre', sans-serif;
    }
</style>