<template>
            <div class="card-body">
                {{list.id}}
                <div class="card mb-3 bg-light">
                    <div class="card-body p-3">
                        <p>{{list.description}}</p>
                        <div class="float-right mr-n1">
                            <button class="btn" @click="deleteTask(list.id)"><i class="fa fa-trash"></i></button>
                        </div>
                        <div class="float-left mr-n1">
                            <button class="btn" v-on:click="edit(list.id)"><i class="fa fa-pencil"></i></button>
                        </div>
                        <div class="p-0 text-center">
                            <button class="btn" v-on:click="move(list.id, list.description, list.CategoryId-1)" v-if="list.CategoryId-1 > 0"><i class="fa fa-angle-double-left"></i></button>
                            <button class="btn" v-on:click="move(list.id, list.description, list.CategoryId+1)" v-if="list.CategoryId+1 < 5"><i class="fa fa-angle-double-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- v-for="list in data" :key="list.id" -->
</template>

<script>
export default {
    name: "Card",
    props: ['list'],
    methods: {
        edit(id) {
            this.$emit('edit', id)
        },
        move(id, description, CategoryId) {
            // alert('masuk')
            // console.log(id, description, CategoryId, "------");
            
            this.$emit('move', id, description, CategoryId)
        },
        deleteTask(id) {
            this.$emit('deleteTask', id)
        }
    }

}
</script>

<style>

</style>