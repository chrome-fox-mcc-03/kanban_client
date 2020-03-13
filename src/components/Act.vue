<template>
    <div class="act">
        <!-- left button -->
        <div v-if="category !== 'Backlog'" class="option-space" @click="moveLeft(activity.id)">
            <i class="fas fa-angle-left fa-sm"></i>
        </div>
        <!-- left button -->
    
        <p class="actTitle" @click="showDetails(activity)">{{ activity.title }}</p>

        <!-- right button -->
        <div v-if="category !== 'Finished'" class="option-space" @click="moveRight(activity.id)">
            <i class="fas fa-angle-right fa-sm"></i>
        </div>
        <!-- right button -->

    </div>
</template>

<script>
export default {
    name: 'Act',
    props: [
        'activity',
        'category'
    ],
    methods: {
        moveLeft(id) {
            console.log('move left');
            this.$emit('moveLeft', id)
        },
        moveRight(id) {
            console.log('move right');
            this.$emit('moveRight', id)
        },
        showDetails(data) {
            console.log('show details senpai');
            this.$emit('showDetails', data)
        }
    }
}
</script>

<style scoped>
    .actTitle:hover {
        color: rgb(246, 144, 125);
    }
</style>