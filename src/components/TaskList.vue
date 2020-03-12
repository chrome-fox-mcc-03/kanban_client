<template>
    <div>
        <div class="column-container">
            <div id="header-2" class="column-header">
                <div class="col s3">{{ categoryName }}</div>
            </div>
            <div class="column-body">
                <!-- Card per title -->
                <task-item v-for="task in tasks" v-if="task.category == taskCategory" :key="task.id" :task="task" class="col s12 m7" ></task-item>
            </div>
        </div>
    </div>
</template>

<script>
import TaskItem from './TaskItem.vue'
export default {
    name : 'TaskList',
    props : ['taskCategory', 'tasks'],
    data () {
        return {
        }
    },
    components : {
        TaskItem
    },
    computed : {
        categoryName() {
            if (this.taskCategory == 'backlog') {
                return 'Backlog'
            } else if (this.taskCategory == 'todo') {
                return 'To Do'
            } else if (this.taskCategory == 'done') {
                return 'Done'
            } else if (this.taskCategory == 'completed') {
                return 'Completed'
            }
        }
    },
    methods : {
        
    }

}
</script>

<style>

</style>