<template>
    <div id="main-page">
        <NavBar></NavBar>
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
    components: {
        NavBar,
        MainSpace
    }
}
</script>

<style>

</style>