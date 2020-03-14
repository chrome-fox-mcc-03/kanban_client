<template>
    <div v-if="isLoading" id="loading">
        <img id="loading-img" src="../img/loading.gif" alt="loading">
    </div>
</template>

<script>
export default {
    props: [ 'isLoading' ]
}
</script>

<style>

</style>