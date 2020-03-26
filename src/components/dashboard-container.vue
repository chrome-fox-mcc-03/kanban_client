<template>
<div v-if="currentPage === 'dashboard'" class="bg-app-page container-fluid vw-100 vh-100 dashboard-page">
    <div class="row mt-4 pt-4">
        <column-container v-for="(cat, i) in categories" :key="i"
            :title="cat"
            :items="items"
            :categories="categories"
            :prioritylist="prioritylist"
            @create="create"
            @editCard="editCard"
            @deleteItem="deleteItem"
        ></column-container>
    </div>
</div>
<div v-else-if="currentPage === 'editForm'">
    <edit-form
        :editObj="editObj"
        :prioritylist="prioritylist"
        :categories="categories"
        @submitEdit="submitEdit"
        @showDashboard="showPage('dashboard')"
    ></edit-form>
</div>
</template>

<script>
import ColumnContainer from './column';
import EditForm from './editItemForm';
import axios from 'axios';

export default {
    data () {
        return {
            currentPage: 'dashboard'
        }
    },
    methods: {
        create(obj) {
            this.$emit('create', obj);
        },
        fetchItems() {
            this.$emit('fetchItems');
        },
        editCard(cardObj) {
            // console.log('editCard', cardObj)
            this.editObj = {...cardObj}
            // console.log(this.editObj)
            this.showPage('editForm')
        },
        submitEdit(editObj) {
            // console.log(editObj)
            this.$emit('submitEdit', editObj)
            this.showPage('dashboard')
        },
        showPage(pageName) {
            this.currentPage = pageName
        },
        deleteItem(id) {
            this.$emit('deleteItem', id)
        }
    },
    props: {
        items: Array,
        categories: Array,
        prioritylist: Array, 
        storage: Object,
    },
    name: 'dashboard-container',
    components: {
        'column-container': ColumnContainer,
        EditForm
    },
    mounted() {
        // console.log(this.categories);
        // console.log(this.items);
    },
}
</script>

<style>

</style>