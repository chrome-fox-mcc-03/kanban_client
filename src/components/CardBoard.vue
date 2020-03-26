<template>
    <div class="board">
        <add-todo @fetchTodo='fetchTodo'></add-todo>
        <div class="card-board">
                <card-container  @fetchTodo='fetchTodo' v-for="(category, index) in categories" :key="index" :category="category" :showTasks='showTasks'>
                </card-container>
        </div>
    </div>
</template>

<script>

import CardContainer from "./CardContainer"
import AddTodo from "./AddTodo"

import axios from 'axios'

export default {
    name : "CardBoard",
    props:['showTasks'],
    components : {
        CardContainer,
        AddTodo
    },
    data () {
        return {
            categories : [
                { 
                    id : 0,
                    phase : 'Backlog' }, 
                { 
                    id : 1,
                    phase : 'Product' }, 
                { 
                    id : 2,
                    phase : 'Development' },
                { 
                    id : 3,
                    phase : 'Done' }
            ]
        }
    },
    methods : {
        fetchTodo : function(){
            this.$emit('fetchTodo')
        }
    }

}
</script>

<style>

.board {
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 0;
}

.card-board {
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 40px;
}

.board-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

</style>