<template>

    <div class="cards-container" id="prelog">
        <div class="container-body">
            <h2 class="container-title ">{{ this.category.name }}</h2>

            <div class="add-card">
                <div class="uk-inline">
                    <a @click="addCard" class="uk-form-icon uk-form-icon-flip uk-icon-link"
                        uk-icon="icon: plus-circle"></a>
                    <input v-model="taskData.title" class="uk-input" type="text" placeholder="Add new card...">
                </div>
            </div>

        </div>

        <task-card 
            @updateTask="updateTask"
            @updateCategory="updateCategory" 
            @deleteTask="deleteTask" 
        v-for="task in this.category.tasks" :key="task.id" :task="task"></task-card>
        <div v-if="!category.tasks.length" class="idle uk-text-center">
            <img src="../assets/idle.svg"  alt="Idle" style="width: 200px;margin:auto">
            <p class="uk-text-muted">No task available for today :)</p>
        </div>
    </div>

</template>

<script>
    import TaskCard from './TaskCard'

    export default {
        name: "TaskCategory",
        data() {
            return {
                taskData: {
                    title: "",
                    catId: this.category.catId
                }
            }
        },
        props: [ 'category' ],
        components: {
            TaskCard
        },
        computed: {
        },
        methods: {
            addCard() {
                let input = {
                    catId: this.taskData.catId,
                    title: this.taskData.title
                }
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
                this.$emit('updateCategory', obj)
            },
            updateTask(obj) {
                this.$emit('updateTask', obj)
            }
        },
        created() {
        }

    }
</script>

<style>

</style>