<template>
    <section id="page-dashboard" v-if="currentPage === 'dashboardPage'">
        <navbar-dashboard @logout="logout"> </navbar-dashboard>
        <div class="container-fluid ml-3">
            <div class="row">
                <div class="col-3">
                    <div class="row bg-custom">
                        <div class="card-title" style="width: 100%;">
                            <span class="card-list-title">Backlog</span>
                        </div>
                        <div class="content-wrapper">
                            <div class="empty-card" style="text-align: center;" v-if="todos[0].length < 1 || todos[0] == undefined">
                                <span>Card is empty.</span>
                            </div>
                            <div v-if="todos[0]">
                                <Todos :data="todos[0]" 
                                @deleteTodo="deleteTodo" 
                                @updateTodo="updateTodo" 
                                @addLabel="addLabel"
                                @deleteLabel="deleteLabel"
                                @rightAction="rightAction"
                                @leftAction="leftAction"> </Todos>
                            </div>
                        </div>
                    </div>
                    <div class="row card-bottom">
                        <input type="text" class="form-control mr-1" style="width: 75%;" placeholder="Add Card ...." v-model="inputAdd[0]">
                        <button class="add-button btn btn-primary" @click="btnAdd(0)">+ Add</button>
                    </div>
                </div>
                
                <div class="col-3">
                    <div class="row bg-custom">
                        <div class="card-title" style="width: 100%;">
                            <span class="card-list-title">Development</span>
                        </div>
                        <div class="content-wrapper">
                            <div class="empty-card" style="text-align: center;" v-if="todos[1].length < 1 || todos[1] == undefined">
                                <span>Card is empty.</span>
                            </div>
                            <div v-if="todos[1]">
                                <Todos :data="todos[1]" 
                                @deleteTodo="deleteTodo" 
                                @updateTodo="updateTodo" 
                                @addLabel="addLabel"
                                @deleteLabel="deleteLabel"
                                @rightAction="rightAction"
                                @leftAction="leftAction"> </Todos>
                            </div>
                        </div>
                    </div>
                    <div class="row card-bottom">
                        <input type="text" class="form-control mr-1" style="width: 75%;" placeholder="Add Card ...." v-model="inputAdd[1]">
                        <button class="add-button btn btn-primary" @click="btnAdd(1)">+ Add</button>
                    </div>
                </div>

                <div class="col-3">
                    <div class="row bg-custom">
                        <div class="card-title" style="width: 100%;">
                            <span class="card-list-title">Product</span>
                        </div>
                        <div class="content-wrapper">
                            <div class="empty-card" style="text-align: center;" v-if="todos[2].length < 1 || todos[2] == undefined">
                                <span>Card is empty.</span>
                            </div>
                            <div v-if="todos[2]">
                                <Todos :data="todos[2]" 
                                @deleteTodo="deleteTodo" 
                                @updateTodo="updateTodo" 
                                @addLabel="addLabel"
                                @deleteLabel="deleteLabel"
                                @rightAction="rightAction"
                                @leftAction="leftAction"> </Todos>
                            </div>
                        </div>
                    </div>
                    <div class="row card-bottom">
                        <input type="text" class="form-control mr-1" style="width: 75%;" placeholder="Add Card ...." v-model="inputAdd[2]">
                        <button class="add-button btn btn-primary" @click="btnAdd(2)">+ Add</button>
                    </div>
                </div>
                
                <div class="col-3">
                    <div class="row bg-custom">
                        <div class="card-title" style="width: 100%;">
                            <span class="card-list-title">Done</span>
                        </div>
                        <div class="content-wrapper">
                            <div class="empty-card" style="text-align: center;" v-if="todos[3].length < 1 || todos[3] == undefined">
                                <span>Card is empty.</span>
                            </div>
                            <div v-if="todos[3]">
                                <Todos :data="todos[3]" 
                                @deleteTodo="deleteTodo" 
                                @updateTodo="updateTodo" 
                                @addLabel="addLabel"
                                @deleteLabel="deleteLabel"
                                @rightAction="rightAction"
                                @leftAction="leftAction"> </Todos>
                            </div>
                        </div>
                    </div>
                    <div class="row card-bottom">
                        <input type="text" class="form-control mr-1" style="width: 75%;" placeholder="Add Card ...." v-model="inputAdd[3]">
                        <button class="add-button btn btn-primary" @click="btnAdd(3)">+ Add</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavbarDashboard from './NavbarDashboard'
import Todos from './Todos'
export default {
    name:"pageDashboard",
    data() {
        return {
            inputAdd: ['','','',''],
        }
    },
    props: ["currentPage","todos"],
    methods: {
        btnAdd(index) {
            let input = this.inputAdd[index]
            this.$emit('btnAdd',{index,input})
            this.inputAdd[index] = ''
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
        Todos
    }
}
</script>

<style>

</style>