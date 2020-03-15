<template>
    <div align="center" style="background-color: #3fc1c9;">
        <form @submit.prevent="addTask" style="padding-top: 15px">
            <input v-model="title" type="text" placeholder="Your Task">
            <input type="submit" value="Add Task"><br>
            <input v-model="status" type="checkbox" value="true" id="status">
            <label for="status">Urgent</label>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'KanbanAddTask',
        data() {
            return {
                title: '',
                status: false,
            }
        },
        methods: {
            addTask() {
                let data = {
                    title: this.title,
                    status: this.status
                }
                this.$emit('addTask', data)
                this.resetForm()
            },
            resetForm() {
                this.title = ''
            }
        }
    }
</script>

<style>

</style>