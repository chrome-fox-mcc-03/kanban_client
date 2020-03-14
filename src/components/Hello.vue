<template>
    <div>
        <h1>{{msg}}</h1>
        <button @click="panggil">click</button>
    </div>
</template>

<script>
export default {
    name : 'Hello',
    props : ['msg'],
    methods: {
        panggil () {
            this.$emit('panggil','ini dari hello')
        }
    }
}
</script>

<style>

</style>