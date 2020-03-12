<template>
    <div class="modal fade" id="FriendsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Friends</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    Email:<br>
                    <input type="email" value=""><br>             
                <button type="button"  class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button"  class="btn btn-primary">Submit</button>
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