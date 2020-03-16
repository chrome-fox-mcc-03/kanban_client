<template>
<div class="bg-app-page container-fluid vw-100 vh-100 dashboard-page">
    <div class="row mt-4 pt-4">
        <column-container v-for="(cat, i) in categories" :key="i"
            :title="cat"
            :items="items"
            :prioritylist="prioritylist"
            @create="create"
        ></column-container>
    </div>
</div>
</template>

<script>
import ColumnContainer from './column';
import axios from 'axios';

export default {
    methods: {
        create(obj) {
            this.$emit('create', obj);
        },
        fetchItems() {
            this.$emit('fetchItems');
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
    },
    mounted() {
        console.log(this.categories);
        console.log(this.items);
    },
}
</script>

<style>

</style>