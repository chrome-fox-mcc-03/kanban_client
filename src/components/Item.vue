<template>
    <div class="item">
        <input v-if="todo.editTitle" class="title-editor" v-model="todo.title" v-on:blur="todo.editTitle=false" v-on:keyup.enter="todo.editTitle=false">
        <div v-else v-on:click="todo.editTitle=true" class="task-title">{{ todo.title }}</div>
        <textarea v-if="todo.editDesc" v-model="todo.description" class="task-description" cols="33" v-on:blur="todo.editDesc=false">
                            
        </textarea>
        <p v-else v-on:click="todo.editDesc=true" class="task-description">{{ todo.description }}</p>
        <div class="move">
            <div class="regress">Regress</div>
            <div class="progress">Progress</div>
            <div class="delete-task">Delete</div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Item",
    props: {
        todo: Object
    },
    methods: {

    }
}
</script>

<style>

</style>