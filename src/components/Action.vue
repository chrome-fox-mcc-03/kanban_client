<template>
<div>
    <div v-if="data.name_box !== 'Backlog' && data.name_box !== 'Done'">
        <button class="btn btn-light" style="width:20px;padding:0" @click="leftAction(data)"> < </button>
        <button class="btn btn-light" style="width:20px;padding:0" @click="rightAction(data)"> > </button>
    </div>
    <div v-if="data.name_box == 'Done'">
        <button class="btn btn-light" style="width:20px;padding:0" @click="leftAction(data)"> < </button>
    </div>
    <div v-if="data.name_box == 'Backlog'">
        <button class="btn btn-light" style="width:20px;padding:0" @click="rightAction(data)"> > </button>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            payload: {}
        }
    },
    props: ['data'],
    methods: {
        leftAction (data) {
            const payload = this.payload
            if(data.name_box == 'Done') {
                const newBox = 'Product'
                this.$emit('leftAction',payload,newBox)
            }else if(data.name_box == 'Product') {
                const newBox = 'Development'
                this.$emit('leftAction',payload,newBox)
            } else {
                const newBox = 'Backlog'
                this.$emit('leftAction',payload,newBox)
            }
        },
        rightAction (data) {
            const payload = this.payload
            if(data.name_box == 'Backlog') {
                const newBox = 'Development'
                this.$emit('rightAction',payload,newBox)
            }else if(data.name_box == 'Development') {
                const newBox = 'Product'
                this.$emit('rightAction',payload,newBox)
            } else {
                const newBox = 'Done'
                this.$emit('rightAction',payload,newBox)
            }
        }
    },
    created () {
        this.payload = this.data
    }
}
</script>

<style>

</style>