<template>
  <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content">
                <!-- <div class="col-12 user-img">
                    <img src="https://i.pinimg.com/originals/6d/b9/88/6db988869c105086253a0c388796e1ea.gif" alt="" srcset="">
                </div> -->
                <div class="col-12 form-input">
                    <form @submit.prevent="edit" >
                        <h1>Edit Task</h1>
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="Title" v-model="title" >
                        </div>
                        <div class="form-group">
                          <input type="text" class="form-control"  placeholder="Description" v-model="description">
                        </div>
                        <button type="submit" class="btn btn-success">Done!</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosKanban from '../../config/index'

export default {
    name: 'EditTask',
    data() {
        return {
            id : this.editId,
            title: this.editTitle,
            description: this.editDescription
        }
    },
    props: {
        editId: Number,
        editTitle : String,
        editDescription : String
    },
    methods: {
        edit(){
            let editTask = {
                title: this.title,
                description: this.description
            }
            console.log(editTask)
            axiosKanban({
                method: 'PUT',
                url: `/tasks/${this.id}`,
                data: editTask,
                headers: {
                    project_id : localStorage.project_id
                }
            })
                .then(taskEdited => {
                    console.log(taskEdited)
                    this.$emit('changeActivity', 'list')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>