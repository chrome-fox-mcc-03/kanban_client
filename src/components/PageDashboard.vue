<template>
    <section id="page-dashboard" v-if="currentPage === 'dashboardPage'">
        <navbar-dashboard @logout="logout"> </navbar-dashboard>
        <div class="container-fluid ml-3">
            <div class="row">
                <div class="col-3" v-for="(todos,index) in todos" :key="index">
                    <Kanban :todos="todos" :index="index"
                    @btnAdd="btnAdd"
                    @deleteTodo="deleteTodo" 
                    @updateTodo="updateTodo" 
                    @addLabel="addLabel"
                    @deleteLabel="deleteLabel"
                    @rightAction="rightAction"
                    @leftAction="leftAction"> </Kanban>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavbarDashboard from './NavbarDashboard'
import Kanban from './Kanban'
export default {
    name:"pageDashboard",
    props: ["currentPage","todos"],
    methods: {
        btnAdd(payload) {
            this.$emit('btnAdd',payload)
        },
        logout(objKosong) {
            this.$emit('logout',objKosong)
        },
        deleteTodo(todoId) {
            this.$emit('deleteTodo',todoId)
        },
        deleteLabel(labelId) {
            this.$emit('deleteLabel',labelId)
        },
        addLabel(payload) {
            this.$emit('addLabel',payload)
        },
        updateTodo(payload) {
            this.$emit('updateTodo',payload)
        },
        rightAction(data,newBox) {
            this.$emit('rightAction',data,newBox)
        },
        leftAction(data,newBox) {
            this.$emit('leftAction',data,newBox)
        }
    },
    components: {
        NavbarDashboard,
        Kanban
    }
}
</script>

<style>

</style>