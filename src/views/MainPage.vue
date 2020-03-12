<template>
    <div id="main-page">
        <NavBar @changePage="changePage"></NavBar>
        <MainSpace></MainSpace>
        <!-- KanbanCard   -->
        <!-- Navbar -->
    </div>
</template>

<script>
import NavBar from '../components/NavBar';
import MainSpace from '../components/MainSpace';
export default {
    name: 'MainPage',
    methods: {
        changePage(page) {
            this.$emit('changePage', page)
        }
    },
    components: {
        NavBar,
        MainSpace
    }
}
</script>

<style>

</style>