<template>
    <div class="TaskBoard" >
    <h2 style="background-color: orangered; color: white; height: 100px; padding: 10%;"> {{category}}</h2><br>
        <task @updatethis="updatethis" @deletethis="deletethis" v-for="task in tasks" :key="task.id" :task="task"></task>
    </div>
</template>

<script>
import task from './task.vue'
export default {
    props: ['category', 'tasks'],
    data() {
        return {
            categories: ["Backlog", "Product", "Development", "Done"]
        }
    },
    methods: {
        deletethis(data) {
            this.$emit('deletethis', data)
        },
        updatethis(data) {
            this.$emit('updatethis', data)
        }
    },
    components : {
        task
    }
}
</script>

<style>

</style>