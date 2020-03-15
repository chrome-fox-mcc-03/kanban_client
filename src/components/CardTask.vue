<template>
    <div>
        <div class="card-body p-2">
            <a @click="$bvModal.show(`task-update${task.id}`)" href="#" style="color: black; text-decoration: none;">
                <div class="card-title" style="text-align: center">
                    <h5>{{ task.title }}</h5>
                </div>
                <p>{{ task.description }}</p>
            </a>
            <div class="mt-3">
                <h4
                v-if="task.category != 'backlog'"
                >
                <a href="#" @click.prevent="toLeft(task.id, task.category)" style="color: #D5A57E; text-decoration: none;"><i class="fas fa-arrow-alt-circle-left"></i></a></h4>
                <h4><a href="#" @click.prevent="deleteTask(task.id)" style="color: #F37E7C; text-decoration: none;"><i class="far fa-trash-alt"></i></a></h4>
                <h4
                v-if="task.category != 'complete'"
                ><a href="#" @click.prevent="toRight(task.id, task.category)" style="color: #D5A57E; text-decoration: none;"><i class="fas fa-arrow-alt-circle-right"></i></a></h4>
            </div>
        </div>
        <b-modal :id="'task-update'+ task.id" hide-footer>
            <FormUpdate
            :task="task"
            @fetchData="fetchData"
            id="formCreate"
            >
            </FormUpdate>
        </b-modal>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Axios from 'axios'
import FormUpdate from './FormUpdate'

export default {
    name: 'CardTask',
    props: ['task'],
    data () {
        return {
            categories: ['backlog', 'product', 'development', 'complete'],
            form: {
                title: '',
                description: '',
            }
        }
    },
    components :{
        draggable,
        FormUpdate
    },
    methods: {
        fetchData() {
            this.$emit('fetchData')
        },
        fetchTask (id) {
            Axios({
                method: 'get',
                url: `https://serene-waters-25786.herokuapp.com/task/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    this.$emit('fetchTask', data)
                })
                .err(err => {
                    console.log(err)
                })
        },
        toRight(id, category) {
            let i = this.categories.findIndex(el => el == category)
            let right = this.categories[i + 1]
            Axios({
                method: 'patch',
                url: `https://serene-waters-25786.herokuapp.com/task/${id}`,
                headers: {
                    token: localStorage.token
                },
                data: {
                    category: right
                }
            })
                .then(_ => {
                    this.$emit('fetchData')
                })
                .catch(err => console.log(err))
        },
        deleteTask(id) {
            Axios({
                method: 'delete',
                url: `https://serene-waters-25786.herokuapp.com/task/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(_ => {
                    this.$emit('fetchData')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        toLeft(id, category) {
            let i = this.categories.findIndex(el => el == category)
            let right = this.categories[i - 1]
            Axios({
                method: 'patch',
                url: `https://serene-waters-25786.herokuapp.com/task/${id}`,
                headers: {
                    token: localStorage.token
                },
                data: {
                    category: right
                }
            })
                .then(_ => {
                    this.$emit('fetchData')
                })
                .catch(err => console.log(err))
        }
    }
}
</script>

<style>
</style>