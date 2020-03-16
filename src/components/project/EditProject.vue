<template>
  <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content">
                <!-- <div class="col-12 user-img">
                    <img src="https://i.pinimg.com/originals/6d/b9/88/6db988869c105086253a0c388796e1ea.gif" alt="" srcset="">
                </div> -->
                <div class="col-12 form-input">
                    <form @submit.prevent="edit">
                        <h1>Change Name</h1>
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="Name" v-model="name" >
                        </div>
                        <div class="d-flex m-2">
                            <button @click="back" type="button" class="btn btn-success m-1">Back</button>
                            <button type="submit" class="btn btn-success m-1">Save</button>
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
    name: 'Edit Project',
    data(){
        return {
            name: this.editName
        }
    },
    props: {
        editId : Number,
        editName : String
    },
    methods: {
        back(){
            this.$emit('changeActivity', 'projects')
        },
        edit(){
            console.log('ke trigger nih')
            axiosKanban({
                method:'PUT',
                url: `/projects/${this.editId}`,
                data: {
                    name : this.name
                }
            })
                .then(({data}) => {
                    this.$emit('changeActivity', 'projects')
                } )
                .catch(err => {
                    this.$vToastify.error(err.response.data.message)
                })
        }
    },
    created(){
    }
}
</script>

<style>

</style>