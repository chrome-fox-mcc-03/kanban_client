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
                <form @submit.prevent="addFriend">
                    Email:<br>
                    <input type="email" v-model="addEmail" value="" required><br> <br>            
                <button type="button"  class="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" class="btn btn-primary" value="Submit"/>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addEmail: ''
        }
    },
    methods: {
        addFriend() {
            console.log('add friend start')
            this.$emit('addFriend', this.addEmail)
            this.addEmail= ''
        }
    }
}
</script>

<style>

</style>