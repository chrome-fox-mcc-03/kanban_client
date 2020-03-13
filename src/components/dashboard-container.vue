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

export default {
    methods: {
        create(obj) {
            // console.log(obj, "create");
            this.$emit('create', obj);
        }
    },
    props: {
        items: Array,
        categories: Array,
        prioritylist: Array, 
    },
    name: 'dashboard-container',
    components: {
        'column-container': ColumnContainer,
    },
}
</script>

<style>

</style>