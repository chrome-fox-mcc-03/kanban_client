<template>
    <div class="main-space">
        <KanbanCard v-for="(kanbanCard, i) in kanbanCards" :key="i" :category="kanbanCard"></KanbanCard>
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
            activities: []
        }
    },
    methods: {
        fetchActivities() {
            axios.get('http://localhost:3000/activities/')
                .then(activities => {
                    console.log(activities);
                    this.activities = activities;
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created() {
        fetchActivities();
    },
    components: {
        KanbanCard
    }
}
</script>

<style>

</style>