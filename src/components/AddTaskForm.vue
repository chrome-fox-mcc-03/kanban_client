<template>
    <div  id="add-task-container">
        <h1 class="add_task title">Add Task</h1>
        <form @submit.prevent="addTask()" id="add_task-form">
            <label class="title-label add_task" for="title">Title:</label><br>
            <input v-model="title" class="title-input add_task" type="text" id="title-add_task" name="title" ><br>
            <label class="category-label add_task" for="category">Category:</label><br>
            <input v-model="category" class="category-input add_task" type="category" id="category-add_task" name="category" ><br><br>
            <label class="description-label add_task" for="description">Description:</label><br>
            <input v-model="description" class="description-input add_task" type="description" id="description-add_task" name="description" ><br><br>
            <input class="submit" type="submit" value="Add Task">
        </form>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            title: '',
            category: '',
            description: ''
        }
    },
    methods: {
        addTask: function () {
            let obj = {
                title: this.title,
                category: this.category,
                description: this.description
            }
            this.$emit('addTask', obj)
        }
    }
}
</script>

<style>

</style>