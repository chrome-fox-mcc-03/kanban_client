<template>
    <div class="act">

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
    name: 'Act',
    props: [
        'title'
    ]
}
</script>

<style>

</style>