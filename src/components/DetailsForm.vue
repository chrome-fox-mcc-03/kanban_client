<template>
    <div id="edit-form">
        <div class="card-form">
            <form class="signup">
                <div class="form-title">Details</div>
                <div class="form-body">
                <div class="row">
                    <input v-model="title" type="text" placeholder="Title">
                </div>
                </div>
                <div class="rule"></div>
                <div class="form-footer">
                    <a @click="saveChanges(detail.id)">Save</a>
                    <a id="cancelEdit" @click="backToMainPage">Cancel</a>
                <a @click="deleteAct(detail.id)">Delete</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailsForm',
    data: function() {
        return {
            title: ''
        }
    },
    props: [
        'detail',
        'fetchActivities'
    ],
    methods: {
        backToMainPage() {
            this.$emit('backToMainPage', 'kanbanSubPage')
        },
        deleteAct(id) {
            axios({
                method: 'delete',
                url: `https://salty-sierra-49064.herokuapp.com/activities/${id}`,
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
                .then(({data}) => {
                    console.log('Successfully deleted 1 activity');
                    console.log(data);
                    this.fetchActivities();
                    this.backToMainPage();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        saveChanges(id) {
            console.log(' = = = = S A V E = = = = ');
            axios({
                method: 'patch',
                url: `https://salty-sierra-49064.herokuapp.com/activities/title/${id}`,
                data: {
                    title: this.title
                },
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
                .then(({data}) => {
                    console.log('Successfully updated 1 activity');
                    console.log(data);
                    this.fetchActivities();
                    this.backToMainPage();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created () {
        this.title = this.detail.title
    }
}
</script>

<style>

</style>