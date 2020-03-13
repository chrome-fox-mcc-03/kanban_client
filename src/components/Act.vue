<template>
    <div class="act">

        <!-- left button -->
        <div class="option-space" @click="moveLeft(activity.id)">
            <i class="fas fa-angle-left fa-sm"></i>
        </div>
        <!-- left button -->
    
        <p class="actTitle" @click="showDetails">{{ activity.title }}</p>

        <!-- right button -->
        <div class="option-space" @click="moveRight(activity.id)">
            <i class="fas fa-angle-right fa-sm"></i>
        </div>
        <!-- right button -->

    </div>
</template>

<script>
export default {
    name: 'Act',
    props: [
        'activity'
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
        showDetails() {
            console.log('show details senpai');
            this.$emit('showDetails')
        }
    }
}
</script>

<style scoped>
    .actTitle:hover {
        color: rgb(246, 144, 125);
    }
</style>