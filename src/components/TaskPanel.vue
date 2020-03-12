<template>
    <div class="tasks">
      <div
       v-for="task in allTasks"
       :key="task.id"
      >
      <!-- {{task}} -->
        <div class="card task ">
            <div class="card-body">
                <div class="row align-content-center">
                    <div class="col card-title">
                        <h5 class=" h4 font-weight-bold">{{task.title}}</h5>
                    </div>
                    <div @click="edit(task.id, task.title, task.description)" class="text-right">
                        <button><i class="far fa-edit fa-lg"></i></button>
                    </div>
                    <div class="text-right">
                        <button class="btn"><i class="fas fa-paper-plane fa-lg"></i></button>                                    
                    </div>
                    <div @click="remove(task.id)" class="text-right">
                        <button class="btn"><i class="fas fa-trash-alt fa-lg"></i></button>
                    </div>
                </div>
                <p class="card-text">{{task.description}}</p>
                <div class="d-flex justify-content-between">
                    <i
                     v-if="task.Category.id === 2 || task.Category.id === 3 || task.Category.id === 4"
                     @click="moveLeft(task.id, task.CategoryId)"
                     class="fas fa-arrow-left"
                    ></i>
                    <i
                     v-if="task.Category.id === 1 || task.Category.id === 2 || task.Category.id === 3"
                     @click="moveRight(task.id, task.CategoryId)"
                     class="fas fa-arrow-right"
                    ></i>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import axiosKanban from '../config/index'

export default {
    name: 'TaskPanel',
    data() {
        return {
            tasks : []
        }
    },
    methods:{
        edit(id, title, description){
            console.log('ke hit ga nih ++++++++++++++++++++++++++')
            this.$emit('editData', id, title, description)
        },
        moveLeft(numTask, numCategory){
            let categoryId = numCategory -1
            console.log(categoryId, 'MOVE LEFT')
            axiosKanban({
                method: 'PUT',
                url: `/tasks/${numTask}`,
                data: {
                    CategoryId : categoryId
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(taskEdited => {
                    console.log('sudah pindah')
                    this.$emit('fetchTask')
                    // this.$emit('changeActivity', 'edit')
                    // this.$emit('changeActivity', 'list')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        moveRight(numTask, numCategory){
            let categoryId = numCategory + 1
            console.log(categoryId, 'INI MOVE RIGHT')
            axiosKanban({
                method: 'PUT',
                url: `/tasks/${numTask}`,
                data: {
                    CategoryId : categoryId
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(taskEdited => {
                    this.$emit('fetchTask')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        remove(id){
            axiosKanban({
                method: 'delete',
                url: `/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(taskEdited => {
                    this.$emit('fetchTask')
                    // this.$emit('changeActivity', 'list')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    props: {
        title : String,
        allTasks : Array
    }
}
</script>

<style>

</style>