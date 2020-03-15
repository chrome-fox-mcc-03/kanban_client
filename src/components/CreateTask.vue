<template>
  <div class="container">
    <div class="row mt-5">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
            <h3 class="font-weight-light text-dark">Create New Task</h3>
            <form  @submit.prevent="create()">
                <div class="form-group">
                    <div class="card mb-3 bg-light">
                        <div class="card-body p-3">
                            <textarea v-model="task" rows="6" class="form-control mb-2" required></textarea>
                            <button type="submit" class="btn btn-secondary float-left">Add New Task</button>
                            <button type="click" class="btn btn-secondary float-right" @click.prevent="backlog">Back To Backlog</button>
                        </div>
                    </div>
                </div>
              </form>
        </div>
        <div class="col-md-4">
            
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
const baseUrl = `https://shielded-cove-72197.herokuapp.com`

export default {
    name: "CreateTask",
    data() {
        return {
            task: ""
        }
    },
    methods: {
        backlog(){
            this.$emit('changePage', 'board')
        },
        create() {
            this.$emit('changeLoading')
            axios({
                method: "POST",
                url: `${baseUrl}/tasks/`,
                data: {
                    description: this.task
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })
             .then(result => { 
                    this.$emit('changeLoading')             
                    this.backlog()
                    this.$emit('clearData')
                    this.$emit('fetch')
                })
                .catch(err => {
                })
        }
    }
}
</script>

<style>

</style>