<template>
   <div class="modal fade" id="TaskModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <form>
                    Content:<br>
                    <input type="text" ><br>
                    Category:<br>
                    <select>
                        <option>Backlog</option>
                        <option>Product</option>
                        <option>Development</option>
                        <option>Done</option>
                    </select>
                    Due Date: <br>
                    <input type="date"><br><br>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Update</button>
                    <button type="button" class="btn btn-primary">Delete</button>
                </form>
            </div>
            </div>
        </div>
        </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style>

</style>