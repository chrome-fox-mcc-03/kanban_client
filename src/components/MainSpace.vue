<template>
    <div class="main-space">
        <KanbanCard @moveLeft="moveLeft" @moveRight="moveRight" v-for="(kanbanCard, i) in kanbanCards" :key="i" :category="kanbanCard" :activities="activities" :fetchActivities="fetchActivities"></KanbanCard>
        <!-- <KanbanCard></KanbanCard> -->
    </div>
</template>

<script>
import KanbanCard from './KanbanCard';
export default {
    name: 'MainSpace',
    data: function() {
        return {
            kanbanCards: [ 'Backlog', 'On Progress', 'Needs Review', 'Finished' ],
            activities: [] //nge-bind nya dimana terus biar bisa diprops di MainSpace --> KanbanCard --> Act
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
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created() {
        this.fetchActivities();
    },
    components: {
        KanbanCard
    }
}
</script>

<style>

</style>