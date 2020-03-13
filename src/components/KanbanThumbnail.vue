<template>
   <div class="board col-3 col" 
    v-bind:style="{'background-image':'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3) ), url(' + bgUrl + ')'}" 
    @click.prevent="showBoard">
        <h3 class="display-6">{{title}}</h3>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        bgUrl: String,
        boardId: Number
    },
    methods: {
        showBoard(){
            this.$emit('showBoard', {
                bgUrl: this.bgUrl,
                title: this.title,
                id: this.boardId
            })
        }
    }
}
</script>

<style>

</style>