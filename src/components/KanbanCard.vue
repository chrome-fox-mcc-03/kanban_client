<template>
    <div class="kanban-card">
        <div class="title-and-act">
            <div class="card-title">{{ category }}</div>
            <Act 
                @moveLeft="moveLeft" 
                @moveRight="moveRight" 
                v-for="activity in filtered" :key="activity.id" 
                :activity="activity"
                @showDetails="showDetails"
                :category="category">
            </Act>
        </div>
        <AddForm 
            v-if="category === 'Backlog'"
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
        showDetails(activity) {
            this.$emit('changeSubPage', 'detailsSubPage')
            this.$emit('getDetail',activity)
        }
    }
}
</script>

<style>

</style>