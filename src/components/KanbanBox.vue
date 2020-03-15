<template>
    <div class="box">
        <div class="col-md-3 kanban-board">
            <div class="kanban-title">
                <h3>
                    {{ category }}
                </h3>
            </div>
            <kanban-card @updateLeft="updateLeft" @updateRight="updateRight" @deleteTask="deleteTask"
                v-for="task in filter" :key="task.id" :task="task"></kanban-card>
        </div>
    </div>
</template>

<script>
    import KanbanCard from './KanbanCard'
    export default {
        name: 'KanbanBox',
        components: {
            KanbanCard
        },
        computed: {
            filter: function () {
                return this.tasks.filter((task) => task.category === this.category)
            }
        },
        methods: {
            updateRight(id) {
                let obj = {
                    id,
                    category: this.category
                }
                this.$emit('updateRight', obj)
            },
            updateLeft(id) {
                let obj = {
                    id,
                    category: this.category
                }
                this.$emit('updateLeft', obj)
            },
            deleteTask(id) {
                this.$emit('deleteTask', id)
            }
        },
        props: ['tasks', 'category']
    }
</script>

<style>

</style>