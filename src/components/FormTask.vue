<template>
    <div> 
        <h2 style="color: black">Create Task</h2>
        <b-form @submit.prevent="createTask()">
            <b-form-group
                id="input-group-1"
                label="Title :"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.title"
                type="text"
                required
                placeholder="Enter title"
                ></b-form-input>
            <b-form-group
                id="input-group-1"
                label="Description :"
                label-for="input-2"
            >
                <b-form-input
                id="input-2"
                v-model="form.description"
                size="lg"
                type="text"
                required
                placeholder="Enter description"
                ></b-form-input>
            </b-form-group>
            <b-button @click="$bvModal.hide('task-create')" type="submit" variant="primary" style="background-color:9FCAE2">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
import Axios from 'axios'

export default {
    name: 'FormTask',
    data () {
        return {
            form: {
                title: '',
                description: ''
            }
        }
    },
    methods :{
        createTask() {
            Axios({
                method: "post",
                url: 'https://serene-waters-25786.herokuapp.com/task',
                headers: {
                    token: localStorage.token
                },
                data: {
                    title: this.form.title,
                    description: this.form.description
                }
            })
                .then(_ => {
                    this.$emit('successCreate', {name: 'goToTask', val:'taskPage'})
                    this.$emit('fetchData')
                })
                .err(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>