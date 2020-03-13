<template>
    <div class="col-sm-6 col-md-4 col-xl-3">
        <div id="container" class="card bg-light">
            <div class="card-body">
                <div class="title">
                    <h5 class="card-title text-uppercase text-truncate py-2">{{ title }}<a
                    v-if="title === 'backlog'" href="#"
                    @click="$bvModal.show('task-create')"
                    ><i class="fas fa-plus-circle"></i></a></h5>
                </div>
                <div class="items border border-light">
                    <CardTask
                    v-for="task in filter" :key="task.id"
                    :task="task"
                    @fetchData="fetchData"
                    @fetchTask="fetchTask"
                    >
                    </CardTask>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardTask from "./CardTask"

export default {
    name: 'ContainerTask',
    props: ['tasks', 'title'],
    data () {
        return {
            list: [],
            
        }
    },
    components: {
        CardTask
    },
    methods: {
        fetchData() {
            this.$emit('fetchData')
        },
        toRight(data) {
            this.$emit('toRight', data)
        },
        showModal() {
            this.$emit('show', true)
        },
        fetchTask (data) {
            this.$emit('fetchTask', data)
        }
    },
    computed: {
        filter: function () {
            let data = this.tasks.filter(task => task.category === this.title)
            this.list.push(data)
            return data
        }
    }
}
</script>

<style>

</style>