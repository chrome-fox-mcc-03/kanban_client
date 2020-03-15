<template>
    <div class="item">
        <input v-if="todo.editTitle" class="title-editor" v-model="todo.title" v-on:blur="todo.editTitle=false" v-on:keyup.enter="todo.editTitle=false">
        <div v-else v-on:click="todo.editTitle=true" class="task-title">{{ todo.title }}</div>
        <textarea v-if="todo.editDesc" v-model="todo.description" class="task-description" cols="33" v-on:blur="todo.editDesc=false">
                            
        </textarea>
        <p v-else v-on:click="todo.editDesc=true" class="task-description">{{ todo.description }}</p>
        <div v-if="canEdit" class="edit-form">
            <input v-if="todo.editTitle" class="title-editor" v-model="title">
            <textarea v-if="todo.editDesc" v-model="description" class="task-description" cols="33">      
            </textarea>
            <div class="progress" v-on:click="saveEdit()">Update</div>
            <div class="delete-task" v-on:click="cancelEdit()">Cancel</div>
        </div>
        <br>
        <div class="move">
            <div class="regress" v-on:click="decrementStatus()">Regress</div>
            <div class="progress" v-on:click="incrementStatus()">Progress</div>
            <div class="delete-task" v-on:click="deleteTask()">Delete</div>
            <div class="progress" v-on:click="showEdit()">Edit</div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Item",
    props: {
        todo: Object
    },
    body() {
        return {
            title: '',
            description: '',
            canEdit: false
        }
    },
    methods: {
        deleteTask: function() {
            this.$emit('delete-task', {id: this.todo.id})
        },
        incrementStatus: function() {
            if(this.todo.status < 4) {
                this.todo.status += 1
                this.$emit('update-task', {id: this.todo.id, title: this.todo.title, description: this.todo.description, status: this.todo.status})
            }
            else{
                alert('Task already done!')
            }
        },
        decrementStatus: function() {
            if(this.todo.status > 1) {
                this.todo.status -= 1
                this.$emit('update-task', {id: this.todo.id, title: this.todo.title, description: this.todo.description, status: this.todo.status})
            }
            else{
                alert("We've only just beguuun...")
            }
        },
        showEdit: function() {
            this.canEdit = true
        },
        cancelEdit: function() {
            this.canEdit = false
        },
        saveEdit: function() {
            this.$emit('update-task', {id: this.todo.id, title: this.title, description: this.description, status: this.todo.status})
            this.title = ''
            this.description = ''
        }
    }
}
</script>

<style>

</style>