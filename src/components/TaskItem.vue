<template>
    <div class="item row">
        <div class="col-10">
            <div class="item-content">
                <p class="item-title">{{ card.title }}</p>
                <p class="item-description">{{ card.description }}</p>
            </div>
            <div class="item-btn">
                <div @click="update(card.id, taskList[index - 1])" class="left">
                    <!-- <p v-if="index != 0"><i class="fas fa-chevron-left"></i><i class="fas fa-chevron-left"></i></p> -->
                    <span v-if="index != 0"><i class="fas fa-chevron-left"></i><i class="fas fa-chevron-left"></i></span>
                </div>
                <div @click="update(card.id, taskList[index + 1])" class="right">
                    <!-- <p v-if="index != taskList.length - 1"><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i>
                    </p> -->
                    <span v-if="index != taskList.length - 1"><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i>
                    </span>
                </div>
            </div>
        </div>
        <div @click="deleteCard(card.id)" class="col-2 delete-card">
            <span aria-hidden="true"><i class="far fa-trash-alt"></i></span>
        </div>
    </div>
</template>

<script>
export default {
    props: [ "taskList", "index", "card" ],
    methods: {
        update(id, statement) {
            let obj = {
                id: id,
                statement: statement.toLowerCase()
            }
            this.$emit('editCard', obj)
        },
        deleteCard(id) {
            this.$emit('deleteCard', id)
        }
    }
}
</script>

<style>

</style>