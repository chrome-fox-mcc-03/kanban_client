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
                            <div v-if="todos[0]">
                                <div class="card-list mb-3" v-for="todo in todos[0]" :key="todo.id">
                                    <div class="card-list-header">
                                        <div class="card-list-title">
                                            <span class="labels" v-for="label in todo.Labels" :key="label.id" :style="{background:label.color}">{{label.name}}</span>
                                        </div>
                                        <button class="content-delete-button" @click="deleteTodo(todo.id)">
                                            x
                                        </button>
                                    </div>
                                    <div class="card-list-body" data-target="#exampleModal" data-toggle="modal" @click="getTodo(todo.id)">
                                        {{todo.description}}
                                    </div>
                                </div>
                            </div>
                            <div class="empty-card" style="text-align: center;" v-else>
                                <span>Card is empty.</span>
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
                            <div v-if="todos[1]">
                                <div class="card-list mb-3" v-for="todo in todos[1]" :key="todo.id">
                                    <div class="card-list-header">
                                        <div class="card-list-title">
                                            <span class="labels" v-for="label in todo.Labels" :key="label.id" :style="{background:label.color}">{{label.name}}</span>
                                        </div>
                                        <button class="content-delete-button" @click="deleteTodo(todo.id)">
                                            x
                                        </button>
                                    </div>
                                    <div class="card-list-body" data-target="#exampleModal" data-toggle="modal" @click="getTodo(todo.id)">
                                        {{todo.description}}
                                    </div>
                                </div>
                            </div>
                            <div class="empty-card" style="text-align: center;" v-else>
                                <span>Card is empty.</span>
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
                            <div v-if="todos[2]">
                                <div class="card-list mb-3" v-for="todo in todos[2]" :key="todo.id">
                                    <div class="card-list-header">
                                        <div class="card-list-title">
                                            <span class="labels" v-for="label in todo.Labels" :key="label.id" :style="{background:label.color}">{{label.name}}</span>
                                        </div>
                                        <button class="content-delete-button" @click="deleteTodo(todo.id)">
                                            x
                                        </button>
                                    </div>
                                    <div class="card-list-body" data-target="#exampleModal" data-toggle="modal" @click="getTodo(todo.id)">
                                        {{todo.description}}
                                    </div>
                                </div>
                            </div>
                            <div class="empty-card" style="text-align: center;" v-else>
                                <span>Card is empty.</span>
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
                            <div v-if="todos[3]">
                                <div class="card-list mb-3" v-for="todo in todos[3]" :key="todo.id">
                                    <div class="card-list-header">
                                        <div class="card-list-title">
                                            <span class="labels" v-for="label in todo.Labels" :key="label.id" :style="{background:label.color}">{{label.name}}</span>
                                        </div>
                                        <button class="content-delete-button" @click="deleteTodo(todo.id)">
                                            x
                                        </button>
                                    </div>
                                    <div class="card-list-body" data-target="#exampleModal" data-toggle="modal" @click="getTodo(todo.id)">
                                        {{todo.description}}
                                    </div>
                                </div>
                            </div>
                            <div class="empty-card" style="text-align: center;" v-else>
                                <span>Card is empty.</span>
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
        <!-- MODAL UPDATE -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update Todo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <span>Label:</span>
                        <div class="temp-label">
                            <span class="labels labels-hover" v-for="label in filteredTodos.Labels" :key="label.id" :style="{background:label.color}" >
                                {{label.name}}
                                <button class="label-delete-button" @click.prevent="deleteLabel(label.id)">x</button>
                            </span> 
                        </div>
                        <br>
                        <input type="text" class="form-update-input" style="text-align: left;" placeholder="Add Label" v-model="inputAddLabel">
                        <select class="custom-select" v-model="selectColorLabel">
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                        </select>
                        <button class="btn  btn-outline-warning" @click.prevent="addLabel(filteredTodos.id)">Add Label</button> <br>
                        <span>Description</span> <br>
                        <input type="text" class="form-update-input" style="text-align: left;" placeholder="Desctiption" v-model="description">
                        <button class="btn btn-outline-dark" @click.prevent="updateTodo(filteredTodos.id)">Update</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NavbarDashboard from './NavbarDashboard'
export default {
    name:"pageDashboard",
    data() {
        return {
            isLogin:true,
            userId:localStorage.getItem('userId'),
            email:'',
            password:'',
            inputAdd: ['','','',''],
            token: localStorage.getItem('token'),
            selectColorLabel:'',
            inputAddLabel:'',
            description: '',
            name_box: '',
            filteredTodos: {}
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
        getTodo(todoId) {
            let filterTodo = {}
            this.todos.forEach(element => {
                element.forEach(element2 => {
                    if(element2.id == todoId) {
                        filterTodo = element2
                    }
                })
            });
            this.filteredTodos = filterTodo
            this.description = this.filteredTodos.description;
            this.name_box = this.filteredTodos.name_box
        },
        deleteLabel(labelId) {
            this.$emit('deleteLabel',labelId)
        },
        addLabel(todoId) {
            let inputAddLabel = this.inputAddLabel
            let selectColorLabel = this.selectColorLabel
            let payload = {inputAddLabel,selectColorLabel,todoId}
            this.$emit('addLabel',payload)
            this.inputAddLabel = ''
            this.selectColorLabel = ''
        },
        updateTodo(todoId) {
            let description = this.description
            let payload = {description,todoId}
            this.$emit('updateTodo',payload)
        }
    },
    components: {
        NavbarDashboard
    }
}
</script>

<style>

</style>