<template>
    <div class="kanban-content-card"
    @click="showCard">
        <div class="row row-cols-2">
            <div class="col-2">
                <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/16882276531582004488-256.png" alt="">
            </div>
            <div class="col-10">
                <p :style="{'color': `${isItPassed()}`}">{{parsedDueDate}}</p>
            </div>
            
        </div>
        <div class="row cols-1">
            <p class="kanban-card-title" >{{card.title}}</p>
        </div>
        <div class="row cols-1">
            <p class="kanban-card-desc">{{card.description}}</p>
        </div>
        <div class="row justify-content-center icon-div">
        <div class="col col-4" v-if="!(card.category=='backlog')" @click="moveLeft">
            <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1959125971582004485-256.png" alt="" class="bottom-icon">
        </div>
        <div class="col col-4" v-if="!(card.category=='done')" @click="moveRight">
            <img  src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/4609047631582004492-256.png" alt="" class="bottom-icon">
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            isPassed: false
        }
    },
    props: {
        card: Object,
        category: String
    },
    methods: {
        showCard(){
            this.$emit('editCard', this.card)
        },
        moveLeft(){
            this.$emit('moveLeft', this.card)
        },
        moveRight(){
            this.$emit('moveRight', this.card)
        },
        isItPassed(){
            if(this.isPassed) {
                return 'rgba(153, 8, 8)'
            } else{
                return 'black'
            }
        }
    },
    computed: {
        parsedDueDate(){
            const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            return new Date(this.card.due_date).getUTCDate()
                + ' ' + months[new Date(this.card.due_date).getUTCMonth()]
                + ' ' + new Date(this.card.due_date).getUTCFullYear()
        },
    },
    created(){
        if(new Date(this.card.due_date) < new Date()){
            this.isPassed = true
        }
    }
}
</script>

<style>
.kanban-content-card {
    cursor: pointer;
}
</style>