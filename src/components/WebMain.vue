<template>
    <section class="main-page" style="display:;">

        <!-- Side Bar -->
        <!-- Canvas -->
        <div class="canvas">

            <task-category 
                @updateCategory="updateCategory" 
                @addCard="addCard" 
                @deleteTask="deleteTask" 
                @updateTask="updateTask"
            v-for="(category, index) in categories" :key="index" :category="category"></task-category>

        </div>

    </section>
</template>

<script>
import TaskCategory from './TaskCategory'
export default {
    name: 'WebMain',
    data() {
        return {
            taskData: {
                title: "",
                desc: "",
                badge: 0,
                category: 0
            }
        }
    },
    components: {
        TaskCategory
    },
    props: [ 'categories' ],
    methods: {
        addCard(input) {
            this.$emit('addCard', input)
            this.resetForm()
        },
        resetForm() {
            this.taskData = {}

        },
        deleteTask(id) {
            this.$emit('deleteTask', id)
        },
        updateCategory(obj) {
            this.$emit("updateCategory", obj)
        },
        updateTask(obj) {
            this.$emit("updateTask", obj)
        }
    },
}
</script>

<style>

</style>