<template>
    <div id="edit-form">
        <div class="card-form">
            <form class="signup">
                <div class="form-title">Details</div>
                <div class="form-body">
                <div class="row">
                    <input type="text" placeholder="Title">
                </div>
                <div class="row">
                    <input type="text" placeholder="Category">
                </div>
                </div>
                <div class="rule"></div>
                <div class="form-footer">
                    <a>Save</a>
                    <a id="cancelEdit" @click="backToMainPage">Cancel</a>
                <a>Delete</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailsForm',
    methods: {
        backToMainPage() {
            console.log('back to main page senpai');
            this.$emit('backToMainPage', 'kanbanSubPage')
        }
    }
}
</script>

<style>

</style>