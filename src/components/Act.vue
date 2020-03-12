<template>
    <div class="act" @click="showEditForm()">

        <!-- left button -->
        <div class="option-space">
            <i class="fas fa-angle-left fa-sm"></i>
        </div>
        <!-- left button -->

        <p>{{ title }}</p>

        <!-- right button -->
        <div class="option-space">
            <i class="fas fa-angle-right fa-sm"></i>
        </div>
        <!-- right button -->

    </div>
</template>

<script>
export default {
    props: ['title'],
    name: 'Act'
}
</script>

<style>

</style>