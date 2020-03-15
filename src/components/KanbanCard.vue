<template>
<div>

    <div class="card" v-if="task.status" style="background-color: #7f78d2;">
        <div class="card-body">
            <h5 class="card-title" style="color: #fefefe;">
                {{ task.title }}
            </h5>
        </div>
        <div style="display: flex; justify-content: center">
            <a href="#" v-if="task.category != 'Backlog'" 
            @click="updateLeft(task.id)"><i class="fa fa-arrow-left" aria-hidden="true" style="font-size: 20px; color: white; margin: 10px 10px"></i></a>
            <a href="#" @click="deleteTask(task.id)"><i class="fa fa-trash" aria-hidden="true" style="font-size: 20px; color: red; margin: 10px 10px"></i></a>
            <a href="#" v-if="task.category != 'Done'" @click="updateRight(task.id)"><i class="fa fa-arrow-right" aria-hidden="true" style="font-size: 20px; color: white; margin: 10px 10px"></i></a>
        </div>
    </div>
    <div class="card" v-if="!task.status">
        <div class="card-body">
            <h5 class="card-title" style="color: black;">
                {{ task.title }}
            </h5>
        </div>
        <div style="display: flex; justify-content: center">
            <a href="#" v-if="task.category != 'Backlog'" 
            @click="updateLeft(task.id)"><i class="fa fa-arrow-left" aria-hidden="true" style="font-size: 20px; color: blue; margin: 10px 10px"></i></a>
            <a href="#" @click="deleteTask(task.id)"><i class="fa fa-trash" aria-hidden="true" style="font-size: 20px; color: red; margin: 10px 10px"></i></a>
            <a href="#" v-if="task.category != 'Done'" @click="updateRight(task.id)"><i class="fa fa-arrow-right" aria-hidden="true" style="font-size: 20px; color: blue; margin: 10px 10px"></i></a>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'KanbanCard',
        props: [ 'task' ],
        methods: {
            updateRight(id) {
                this.$emit('updateRight', id)
            },
            updateLeft(id) {
                this.$emit('updateLeft', id)
            },
            deleteTask(id) {
                this.$emit('deleteTask', id)
            }
        }
    }
</script>

<style>
</style>