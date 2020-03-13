<template>
    <div class="error-message">
        <p v-for="(message, index) in messages" :key="index">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name : 'MessageError',
    props : ['messages'],
    data () {
        return {

        }
    }

}
</script>

<style>

</style>