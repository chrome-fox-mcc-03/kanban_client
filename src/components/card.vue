<template>
<div class="card-container m-1 rounded"
    v-if="card.status === title"
>
    <div class="card-header">
        <div class="m-1 rounded" style="height:2em;"
            :class="priorityColor"
        >
            <p class="font-weight-bold p-1">{{ card.priority }}</p>
        </div>
        <div class="card-header-user text-center">
            <img :src="card.User.avaurl" class="rounded" alt="avatar.jpg">
            <p class="font-weight-bold">{{ card.User.name }}</p>
        </div>
    </div>
    <div class="card-body">
        <div>{{ card.description }}</div>
        <div class="small">Due date : {{ card.due_date.split("T")[0] }}</div>
    </div>
    <div class="card-footer">
        <div class="btn btn-sm btn-outline-warning"
            @click="toLeft(card.id)"
        >
            <i class="fas fa-caret-square-left text-dark"></i>
        </div>
        <div class="btn btn-sm btn-outline-warning text-dark"
            @click="editCard"
        >
            Edit
        </div>
        <div v-if="toggleConfirm" class="btn btn-sm btn-outline-danger"
            @click="toggleDel"
        >
            Delete
        </div>
        <div v-else class="d-flex">
            <div class="btn btn-sm btn-danger"
                @click="deleteItem"
            >
                Yes
            </div>
            <div class="btn btn-sm btn-warning"
                @click="toggleDel"
            >
                No
            </div>
        </div>
        <div class="btn btn-sm btn-outline-warning"
            @click="toRight(card.id)"
        >
            <i class="fas fa-caret-square-right text-dark"></i>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            toggleConfirm: true
        }
    },
    methods: {
        toLeft (id) {
            console.log('left', id)
        },
        toRight (id) {
            console.log('right', id)
        },
        editCard () {
            const cardObj = {
                id: this.card.id,
                description: this.card.description,
                due_date: this.card.due_date,
                status: this.card.status,
                priority: this.card.priority
            }
            this.$emit('editCard', cardObj)
        },
        toggleDel () {
            this.toggleConfirm = !this.toggleConfirm
        },
        deleteItem () {
            this.$emit('deleteItem', this.card.id)
            this.toggleDel()
        }
    },
    computed: {
        priorityColor: function() {
            let color = 'bg-info'
            if (this.card.priority === 'Important') color = 'status-yellow'
            if (this.card.priority === 'Urgent') color = 'status-red'
            if (this.card.priority === 'Done') color = 'status-green'
            return color
        }
    },
    props: {
        card: Object,
        title: String
    },
    name: 'card-container',
    created () {
    }
}
</script>

<style>

</style>