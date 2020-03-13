<template>
    <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content">
                <!-- <div class="col-12 user-img">
                    <img src="https://i.pinimg.com/originals/6d/b9/88/6db988869c105086253a0c388796e1ea.gif" alt="" srcset="">
                </div> -->
                <div class="col-12 form-input">
                    <form @submit.prevent="create">
                        <h1>Create New Project</h1>
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="Name" v-model='name' >
                        </div>
                        <div class="d-flex justify-content-between">
                            <button @click="back" type="button" class="btn btn-success m-1">Back</button>
                            <button type="submit" class="btn btn-success m-1">Create Now!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosKanban from '../../config/index'

export default {
    name: 'CreateProject',
    data() {
        return{
            name: ''
        }
    },
    methods:{
        create(){
            let nameProject = {
                name : this.name
            }
            console.log('MASUK CREATEEEEE')
            axiosKanban({
                method: 'POST',
                url: '/projects',
                data: nameProject,
                headers: {
                    access_token : localStorage.access_token
                }
            })
                .then(({data})=> {
                    console.log(data)
                    return axiosKanban({
                        method: 'POST',
                        url: '/projectusers',
                        data : {
                            ProjectId : data.id
                        },
                        headers: {
                            access_token : localStorage.access_token
                        }
                    })
                })
                .then(({data}) => {
                    console.log(data)
                    this.$emit('changeActivity', 'projects')
                })
                .catch(err => {
                    console.log(err)
                })
        }, 
        back(){
            console.log('masuk back')
            this.$emit('changeActivity', 'projects')
        }
    }

}
</script>

<style>

</style>