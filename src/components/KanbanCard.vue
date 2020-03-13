<template>
    <div class="kanban-card">
        <div class="title-and-act">
            <div class="card-title">{{ category }}</div>
            <Act 
                @moveLeft="moveLeft" 
                @moveRight="moveRight" 
                v-for="activity in filtered" :key="activity.id" 
                :activity="activity"
                @showDetails="showDetails">
            </Act>
        </div>
        <AddForm 
            :fetchActivities="fetchActivities">
        </AddForm>
    </div>
</template>

<script>
import Act from './Act';
import AddForm from './AddForm';
export default {
    props: [
        'category',
        'activities',
        'fetchActivities'
    ],
    name: 'KanbanCard',
    data: function() {
        return {
            // backlogs: [ //dummy aja ini
            //     {id: 1, title: 'Book flight to Vietnam', category: 'Backlog'},
            //     {id: 2, title: 'Recruit new member', category: 'Backlog'},
            //     {id: 3, title: 'Read Narnia', category: 'Backlog'},
            //     {id: 4, title: 'Birthday gift for Dre', category: 'Backlog'},
            //     {id: 5, title: "Reply Youtube comments", category: 'Backlog'},
            //     {id: 6, title: "Reply followers' tweets", category: 'On Progress'},
            //     {id: 7, title: "January report", category: 'On Progress'},
            //     {id: 8, title: "Reply followers' tweets", category: 'Needs Review'},
            // ]
        }
    },
    computed: {
        filtered: function() {
            console.log('FILTER ================= >>>>>', this.activities);
            
            // console.log('====FILTER====>', this.activities.data);
            
            return this.activities.filter(activity => activity.category === this.category)
        }
    },
    components: {
        Act,
        AddForm
    },
    methods: {
        moveLeft(id) {
            let obj = {
                id,
                category: this.category
            }
            this.$emit('moveLeft', obj)
        },
        moveRight(id) {
            let obj = {
                id,
                category: this.category
            }
            this.$emit('moveRight', obj)
        },
        showDetails() {
            this.$emit('changeSubPage', 'detailsSubPage')
        }
    }
}
</script>

<style>

</style>