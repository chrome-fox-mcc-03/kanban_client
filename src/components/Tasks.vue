<template>
    <div class="col-xl-3">
        <div class="box">
            <div class="kanban-header">
                <h4>{{ taskList[index] }}</h4>
            </div>
            <div class="kanban-content">
                <task-item 
                    v-for="card in sortedCards" 
                    :key="card.id"
                    :index="index"
                    :taskList="taskList"
                    :card="card"
                    @editCard="editCard"
                    @deleteCard="deleteCard">
                </task-item>
            </div>
        </div>
    </div>
</template>

<script>
import TaskItem from "./TaskItem"
export default {
    props: [ 'index', 'taskList', "cards" ],
    components: {
        TaskItem
    },
    computed: {
        sortedCards: function () {
            let data = [];
            this.cards.forEach(el => {
                if(el.category == this.taskList[this.index].toLowerCase()){
                    data.push(el);
                }
            })
            return data;
        }
    },
    methods: {
        editCard(obj) {
            this.$emit('editCard', obj)
        },
        deleteCard(id) {
            this.$emit('deleteCard', id)
        }
    }
}
</script>

<style>

</style>