<template>
    <div class="TaskBoard" >
    <h2 style="background-color: orangered; color: white; height: 100px; padding: 10%;"> {{category}}</h2><br>
        <task  v-for="task in tasks" :key="task.id"></task>
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
    components : {
        task
    }
}
</script>

<style>

</style>