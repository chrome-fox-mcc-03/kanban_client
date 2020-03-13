<template>
    <div class="main-space">
        <div class="kanbanWrapper" v-if="subCurrentPage === 'kanbanSubPage'">
            <KanbanCard 
                @moveLeft="moveLeft" 
                @moveRight="moveRight" 
                v-for="(kanbanCard, i) in kanbanCards" :key="i" 
                :category="kanbanCard" 
                :activities="activities" 
                :fetchActivities="fetchActivities"
                @changeSubPage="changeSubPage"
                @getDetail="getDetail"
                >
            </KanbanCard>
        </div>
        <DetailsForm 
            :detail="detail" 
            @backToMainPage="changeSubPage" 
            :fetchActivities="fetchActivities"
            v-else-if="subCurrentPage === 'detailsSubPage'">
        </DetailsForm>
    </div>
</template>

<script>
import KanbanCard from './KanbanCard';
import DetailsForm from './DetailsForm';
export default {
    name: 'MainSpace',
    data: function() {
        return {
            kanbanCards: [ 'Backlog', 'On Progress', 'Needs Review', 'Finished' ],
            activities: [], 
            subCurrentPage: 'kanbanSubPage',
            detail: ''
        }
    },
    methods: {
        moveLeft(data) {
            let category;
            if (data.category === 'Finished') category = 'Needs Review'
            else if (data.category === 'Needs Review') category = 'On Progress'
            else if (data.category === 'On Progress') category = 'Backlog'

            axios({
                method: 'patch',
                url: `http://localhost:3000/activities/${data.id}`,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: {
                    new_category: category
                }
            })
                .then(({data}) => {
                    this.fetchActivities();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        moveRight(data) {
            let category;
            if (data.category === 'Backlog') category = 'On Progress'
            else if (data.category === 'On Progress') category = 'Needs Review'
            else if (data.category === 'Needs Review') category = 'Finished'

            axios({
                method: 'patch',
                url: `http://localhost:3000/activities/${data.id}`,
                headers: {
                    token: localStorage.getItem('access_token')
                },
                data: {
                    new_category: category
                }
            })
                .then(({data}) => {
                    this.fetchActivities();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        fetchActivities() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/activities',
                headers: {
                    token: localStorage.getItem('access_token')
                }
            })
                .then(({data}) => {
                    console.log(data);
                    this.activities = data;
                    // this.$notify({
                    //     group: 'foo',
                    //     title: 'Important message',
                    //     text: 'Hello user! This is a notification!'
                    // });
                })
                .catch(err => {
                    console.log(err);
                })
        },
        changeSubPage(subPage) {
            this.subCurrentPage = subPage
        },
        getDetail(data) {
            this.detail = data
        }
    },
    created() {
        this.fetchActivities();
    },
    components: {
        KanbanCard,
        DetailsForm
    }
}
</script>

<style scoped>
    .kanbanWrapper {
        padding: 0 1.25rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>