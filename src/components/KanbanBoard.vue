<template>
<div>
    <div class="card card-border-secondary">
        <div class="card-header">
            <h5 class="card-title text-uppercase">{{ name }}</h5>
            <h6 class="card-subtitle text-muted" v-if="name === 'backlog'">Upcoming Task</h6>
            <h6 class="card-subtitle text-muted" v-if="name === 'progress'">Ongoing Task</h6>
            <h6 class="card-subtitle text-muted" v-if="name === 'development'">Under Review Task</h6>
            <h6 class="card-subtitle text-muted" v-if="name === 'done'">Completed Task</h6>
        </div>

        <Card @move="move" @edit="edit" @deleteTask="deleteTask" v-for="list in data" :key="list.id" :list="list"></Card>
    </div>
</div>
 
</template>

<script>

import axios from 'axios'
import Card from './Card'

const baseUrl = `https://shielded-cove-72197.herokuapp.com`

export default {
    name: 'KanbanBoard',
    props: ['page','kanban','name','data'],
    components: {
        Card
    },
    data() {
        return {
         
        }
    },
    methods: {
        fetch() {
            this.$emit('fetch')
        },
        edit(id) {
            this.$emit('edit', id)
        },
        move(id, description, CategoryId) {
            this.$emit('move', id, description, CategoryId)
        },
        deleteTask(id) {
            axios({
                method: "DELETE",
                url: `${baseUrl}/tasks/${id}`,
                headers: {
                    token: localStorage.getItem("token")
                }
            })
                .then(result => {
                    this.$emit('clearData')
                    this.fetch()
                })
                .catch(err => {

                })
        }
    },
    created() {
        if(localStorage.token) {
        } else {
            this.$emit("pageChanging", "login")
        }
    }
}
</script>

<style>

</style>