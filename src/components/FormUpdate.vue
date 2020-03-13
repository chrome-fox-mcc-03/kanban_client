<template>
    <div> 
        <h2 style="color: black">Update Task</h2>
        <b-form @submit.prevent="updateTask(task.id)">
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
            <b-button @click="$bvModal.hide(`task-update${task.id}`)" type="submit" variant="primary" style="background-color:9FCAE2">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
import Axios from 'axios'

export default {
    name: 'FormTask',
    props: ['task'],
    data () {
        return {
            form: {
                title: this.task.title,
                description: this.task.description
            }
        }
    },
    methods :{
        updateTask(id) {
            Axios({
                method: "patch",
                url: `https://serene-waters-25786.herokuapp.com/task/${id}`,
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