<template>
   <div class="modal fade" id="TaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create Task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <form @submit.prevent="createTask">
                    Title:<br>
                    <input type="text" v-model="taskTitle" > <br>
                    Content:<br>
                    <input type="text" v-model="taskContent" ><br>
                    Category:<br>
                    <select v-model="taskCategory">
                        <option>Backlog</option>
                        <option>Product</option>
                        <option>Development</option>
                        <option>Done</option>
                    </select>
                    Due Date: <br>
                    <input type="date" v-model="taskDueDate"><br><br>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <input type="submit" class="btn btn-primary" value="Submit"/>
                </form>
            </div>
            </div>
        </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            taskTitle: '',
            taskContent: '',
            taskCategory: "",
            taskDueDate: ''

        }
    },
    methods: {
        createTask() {
            let data = {
                Title: this.taskTitle,
                Content: this.taskContent,
                Category: this.taskCategory,
                Due_Date: this.taskDueDate
            }
            this.$emit("createTask", data)
            this.taskDueDate = ''
            this.taskCategory = ''
            this.taskContent = ''
            this.taskTitle = ''
        }

    }
}
</script>

<style>

</style>