<template>
    <div class="col kanban-card">
        <div class="kanban-title">
            <h1>{{title}}</h1>
        </div>
        <div class="kanban-content overflow-auto">
            <task-card v-for="(card, i) in cards" :key="i" :card="card" @editCard="editCard" @moveLeft="moveLeft" @moveRight="moveRight" v-bind:style="{'border-right':  `9px solid ${card.color}`}"></task-card>                              
        </div>
    </div>
                    
                
</template>

<script>
import TaskCard from './TaskCard'
export default {
    components: {
        TaskCard
    },
    props: {
        title: String,
        cards: Array
    },
    methods: {
        editCard(card){
            this.$emit('editCard', card)
        },
        moveLeft(card){
            this.$emit('moveLeft', card)
        },
        moveRight(card){
            this.$emit('moveRight', card)
        }
    }
}
</script>

<style>

</style>