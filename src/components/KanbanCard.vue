<template>
    <div class="kanban-card">
        <div class="title-and-act">
            <div class="card-title">{{ category }}</div>
            <Act v-for="backlog in backlogs" :key="backlog.id" :title="backlog.title"></Act>
        </div>
        <AddForm></AddForm>
    </div>
</template>

<script>
import Act from './Act';
import AddForm from './AddForm';
export default {
    props: [
        'category'
    ],
    name: 'KanbanCard',
    data: function() {
        return {
            backlogs: [
                {id: 1, title: 'Book flight to Vietnam', category: 'backlog'},
                {id: 2, title: 'Recruit new member', category: 'backlog'},
                {id: 3, title: 'Read Narnia', category: 'backlog'},
                {id: 4, title: 'Birthday gift for Shu', category: 'backlog'},
                {id: 5, title: "Reply followers' tweets", category: 'backlog'},
            ],
            newActivity: ''
        }
    },
    components: {
        Act,
        AddForm
    }
}
</script>

<style>

</style>