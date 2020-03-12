<template>
    <!-- <div id="modal-container">   -->
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <i id="profpict-modal" class="profpict fas fa-user-circle"></i>
                <h5 class="modal-title" id="exampleModalLabel"> {{ taskDetail.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <p>
                    {{ taskDetail.description }}
                </p>
                </div>
                <div class="modal-footer">
                    <div id="card-detail-icon" class="card-option">
                    <i type="button" class="fas fa-info-circle" data-toggle="modal" data-target="#exampleModal">
                    </i>
                    <i @click="updateArrow(taskDetail, -1)" v-if="!taskDetail.firstIndex || taskDetail.lastIndex" type="button" class="fas fa-arrow-circle-left" data-dismiss="modal"></i>
                    <i @click="updateArrow(taskDetail, 1)" v-if="!taskDetail.lastIndex || taskDetail.firstIndex" type="button" class="fas fa-arrow-circle-right" data-dismiss="modal"></i>
                    <i @click="deleteTask(taskDetail)" type="button" class="fas fa-trash-alt" data-dismiss="modal"></i>
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
export default {
    data: function () {
        return {

        }
    },
    props: {
        taskDetail: [Object, String]
    },
    methods: {
        updateArrow(taskDetail, index){
            let obj = {
                task: taskDetail,
                index: index
            }
            this.$emit('update', obj)
        },
        deleteTask(el){
            this.$emit('deleteTask', el)
        }
    }
}
</script>

<style>

</style>