<template>
  <div class="modal fade" :id="'ContentModal'+task.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <form>
                        Title:<br>
                        <input type="text" v-model="task.Title" required><br>
                        Content:<br>
                        <input type="text" v-model="task.Content" required><br>
                        Category:<br>
                        <select v-model="task.Category" required>
                        <option>Backlog</option>
                        <option>Product</option>
                        <option>Development</option>
                        <option>Done</option>
                        </select><br>
                        Due Date:<br>
                        <input type="date" v-model="task.Due_date" required><br><br>
                        
                </form>
                    <button type="button"  class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" @click.prevent="updatethis" class="btn btn-primary">Update</button>
                    <button type="button" @click.prevent="deletethis" class="btn btn-primary">Delete</button>
                </div>
            </div>
            </div>
        </div>
</template>

<script>
export default {
    props: ['task'],
    data() {
        return {

        }
    },
    methods: {
        formattedDate() {
            this.task.Due_date = this.task.Due_date.split('T')[0]
        },
        deletethis() {
            console.log(`this is ${this.task.id}`)
            this.$emit('deletethis', this.task.id)
        },
        updatethis() {
            let data = {
                Title: this.task.Title,
                Content: this.task.Content,
                Category: this.task.Category,
                Due_Date: this.task.Due_date,
                id: this.task.id
            }
            this.$emit('updatethis', data)
        }    
    },
    created() {
        this.formattedDate()
    }
}

</script>

<style>

</style>