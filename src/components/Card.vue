<template>
        <div class="card-body">
            <div class="card card-hover mb-3 bg-light">
                <div class="card-body p-3 moveTo">
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
                     <div class="reveal bg-light p-0 text-center">
                        draggable here
                    </div>
                </div>
            </div>
        </div>
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
            this.$emit('move', id, description, CategoryId)
        },
        deleteTask(id) {
            this.$emit('deleteTask', id)
        }
    }

}
</script>

<style scoped>

.card-hover .reveal {
    visibility: hidden;
    opacity: 0;
    height: 0;
    padding: 0;
}

.card-hover:hover .reveal {
    height: auto;
    visibility: visible;
    opacity: 10;
    transition: opacity 1s ease;
}
</style>