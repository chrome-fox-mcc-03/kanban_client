<template>
    <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content">
                <!-- <div class="col-12 user-img">
                    <img src="https://i.pinimg.com/originals/6d/b9/88/6db988869c105086253a0c388796e1ea.gif" alt="" srcset="">
                </div> -->
                <div class="col-12 form-input">
                    <form @submit.prevent="create">
                        <h1>Create Your Task</h1>
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="Title" v-model="title">
                        </div>
                        <div class="form-group">
                          <input type="text" class="form-control"  placeholder="Description" v-model="description">
                        </div>
                        <button type="submit" class="btn btn-success">Create Now!</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosKanban from '../config/index'

export default {
    name: 'CreateTask',
    data() {
        return {
            title: '',
            description: ''
        }
    },
    methods:{
        create(){
            let newTask = {
                title: this.title,
                description: this.description
            }

            axiosKanban({
                method: 'POST',
                url: '/tasks',
                data: newTask,
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then(create => {
                    console.log(create)
                    this.$emit('changeActivity', 'list')
                })
                .catch(err => {
                    console.log('ini errror booooo')
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>