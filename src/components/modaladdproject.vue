<template>
    <div class="modal fade" id="ProjectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create Project</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="createproject">
                    Project Name:<br>
                    <input type="text" v-model="projectname" value=""><br><br>             
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit"  class="btn btn-primary" value="Submit" />
            </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    props: [ ''],
    data() {
        return {
            projectname: ''
        }
    },
    methods: {
        createproject() {
            this.$emit('createproject', this.projectname)
        }
    }
}
</script>

<style>

</style>