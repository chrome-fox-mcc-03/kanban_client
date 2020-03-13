<template>
    <div>
        <Kartu @panggil="panggilPunyabapak" v-for="task in tasks" :key="task.id" :task="task"></Kartu>
    </div>
</template>

<script>
import Kartu from './components/Kartu.vue'
export default {
    name : 'App',
    data() {
        return {
            tasks: [
                {'backlog': []}
            ]
        }
    },
    components: {
        Kartu
    },
    methods: {
        panggilPunyabapak(data) {
            alert(data)
        }
    }
}
</script>

<style>

</style>