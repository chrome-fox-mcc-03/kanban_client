<template>
<div>
     <!-- <div class="container p-3" v-if="page === 'board'"> -->
        <!-- <div class="row flex-row flex-sm-nowrap py-3"> -->
            <!-- Each column has this section Task -->
            <!-- <div class="col-sm-6 col-md-4 col-xl-3 scroll"> -->
                <div class="card card-border-secondary">
                    <div class="card-header">
                        <h5 class="card-title text-uppercase">{{ name }}</h5>
                        <h6 class="card-subtitle text-muted" v-if="name === 'backlog'">Upcoming Task</h6>
                        <h6 class="card-subtitle text-muted" v-if="name === 'progress'">Ongoing Task</h6>
                        <h6 class="card-subtitle text-muted" v-if="name === 'development'">Under Review Task</h6>
                        <h6 class="card-subtitle text-muted" v-if="name === 'done'">Completed Task</h6>
                    </div>

                    <Card @move="move" @edit="edit" @deleteTask="deleteTask" v-for="list in data" :key="list.id" :list="list"></Card>
                    <!-- <div class="card-body" v-for="list in data" :key="list.id">
                        {{list.id}}
                        <div class="card mb-3 bg-light">
                            <div class="card-body p-3">
                                <p>{{list.description}}</p>
                                <div class="float-right mr-n1">
                                    <button class="btn" @click="deleteTask(list.id)"><i class="fa fa-trash"></i></button>
                                </div>
                                <div class="float-left mr-n1">
                                    <button class="btn" v-on:click="edit(list.id)"><i class="fa fa-pencil"></i></button>
                                </div>
                                <div class="p-0 text-center">
                                    <button class="btn" v-on:click="move(list.id, list.description, list.CategoryId-1)" v-if="list.CategoryId-1 > 0"><i class="fa fa-angle-double-left"></i></button>
                                    <button class="btn" v-on:click="move(list.id, list.description, list.CategoryId+1)" v-if="list.CategoryId+1 < 5"><i class="fa fa-angle-double-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            <!-- </div> -->
        <!-- </div> -->
    <!-- </div> -->

    <div class="container" v-if="page === 'edit'">
        <div class="row mt-5">
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
                <h3 class="font-weight-light text-dark">Edit Task</h3>
                <form @submit.prevent="editTask()">
                    <div class="form-group">
                        <div class="card mb-3 bg-light">
                            <div class="card-body p-3">
                                <textarea v-model="description" rows="6" class="form-control mb-2"></textarea>
                                <button type="submit" class="btn btn-secondary float-left">Edit Task</button>
                                <button type="click" class="btn btn-secondary float-right" @click="backlogClick">Back To Backlog</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                
            </div>
        </div>
    </div>
</div>
 
</template>

<script>

import axios from 'axios'
import Card from './Card'

const baseUrl = `http://localhost:3000`

export default {
    name: 'KanbanBoard',
    components: {
        Card
    },
    data() {
        return {
            id: "",
            description: "",
            CategoryId: ""
        }
    },
    props: ['page','kanban','name','data'],
    methods: {
        fetch() {
            this.$emit('fetch')
        },
        findOne(id) {
            axios({
                method: "GET",
                url: `${baseUrl}/tasks/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(result => {                    
                    this.id = result.data.data.id
                    this.description = result.data.data.description
                    this.CategoryId = result.data.data.CategoryId
                })
                .catch(err => {

                })
        },
        edit(id) {
            this.findOne(id)
            this.$emit("fromBoard", "edit")
        },
        editTask() {
            axios({
                method: "PUT",
                url: `${baseUrl}/tasks/${this.id}`,
                data: {
                    description: this.description,
                    CategoryId: this.CategoryId
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })
                .then(result => {
                    this.$emit('clearData')
                    this.backlogClick()
                    this.fetch();
                })
                .catch(err => {

                })

        },
        backlogClick(){
            this.$emit("fromEdit", "board")
        },
        move(id, description, CategoryId) {
            // alert('masuk hmgh')
            // console.log(id,description,CategoryId,'---------------');
            
            axios({
                method: "PUT",
                url: `${baseUrl}/tasks/${id}`,
                data: {
                    description,
                    CategoryId
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })
                .then(result => {
                    this.$emit('clearData')
                    this.fetch();
                })
                .catch(err => {

                })
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
            // this.fetch()
        } else {
            this.$emit("pageChanging", "login")
        }
    }
}
</script>

<style>

</style>