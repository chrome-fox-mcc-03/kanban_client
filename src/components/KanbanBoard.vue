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

        
        <draggable :kanban="kanban" :animation="200" ghost-class="ghost-card" group="any">

                <Card @move="move" @edit="edit" @deleteTask="deleteTask" v-for="list in tasks" :key="list.id" :list="list"></Card>

        </draggable>
    </div>
</div>
 
</template>

<script>

import axios from 'axios'
import Card from './Card'
import draggable from "vuedraggable";


export default {
    name: 'KanbanBoard',
    props: ['name','tasks', 'kanban'],
    components: {
        Card,
        draggable
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
    }
}
</script>

<style scoped>
.ghost-card {
  opacity: 0.5;
  background: #1f3d56;
  border: 2px solid black;
}
</style>