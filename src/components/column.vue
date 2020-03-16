<template>
<div class="col-3 app-column-container"
    v-if="showDash"
>
    <div class="column-header">
        <span class="is-my-link column-title">{{ title }}</span>
    </div>
    <div class="column-body">
        <!--  -->
        <card v-for="(card, i) in items" :key="i"
            v-if="card.status === title"
            :card="card"
        ></card>
    </div>
    <div class="column-footer mt-1 mb-4">
        <div @click.prevent="toggleForm" class="d-inline status-green is-my-link p-1 rounded"
            v-if="title==='Backlog'"
        >
            Add New
        </div>
    </div>
</div>
<div v-else>
    <div class="bg-app-page vw-100 vh-100 register-form-container">
        <div class="bg-app-nav m-2 p-2 rounded text-center">
            <form>
                <div class="form-group">
                    <input v-model="description" type="text" class="form-control">
                    <small class="form-text text-white">Description</small>
                </div>
                <div class="form-group">
                    <input v-model="date" type="date" class="form-control">
                    <small class="form-text text-white">Date</small>
                </div>
                <div class="form-group">
                    <select v-model="priority" class="form-control" >
                        <option v-for="(opt, i) in prioritylist" :key="i" :value="opt">{{ opt }}</option>
                    </select>
                    <small class="form-text text-white">Priority</small>
                </div>
                <div id="register-message"></div>
                <input @click.prevent="create" type="submit" class="btn status-green" value="Create">
                <input @click.prevent="toggleForm" type="submit" class="btn status-green" value="Back">
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Card from './card';
export default {
    methods: {
        create() {
            let obj = {
                date: this.date,
                description: this.description,
                priority: this.priority
            }
            this.date = '';
            this.description = '';
            this.priority = '';
            console.log(obj);
            this.toggleForm();
            this.$emit('create', obj);
        },
        log(a) {
            console.log("test", a);
        },
        toggleForm() {
            this.showDash = !this.showDash
        }
    },
    props: {
        title: String,
        items: Array,
        prioritylist: Array,
    },
    data() {
        return {
            showDash: true,
            description: '',
            date: '',
            priority: '',
        }
    },
    components: {
        'card': Card
    },
    name: "column-container"
}
</script>

<style>

</style>