<template>
    <div id="cards-container">
        <h1 class="title">{{ fullName() }} Tasks </h1>
        <div id="main-cards-container">          
            <div v-for="(category,index) in categories" :key="index" class="cards-section">
                <div class="card-header-div">
                    <p class="card-header-word">{{ category }}</p>
                </div>
                    <cards @delete="deleteTask" @update="update" @assignTaskDetail="assignTaskDetail" @reGetCards="getCards" :categories="categories" :cards="cards" :category="category"></cards>
                <div class="card-footer-div">
                    <p class="card-footer-word">Add a card...</p>
                </div>
            </div>
        </div>
    </div>     
</template>

<script>
import Cards from './Cards.vue'
export default {
    data: function () {
        return {
            full_name: '',
        }
    },
    components: {
        Cards
    },
    props: {
        cards: Array,
        categories: Array,
        first_name: String,
        last_name: String
    },
    methods: {
        getCards() {
            this.$emit('getCards')
        },
        assignTaskDetail(data){
            this.$emit('assignTaskDetail', data)
        },
        update(obj){
            this.$emit('update', obj)
        },
        deleteTask(obj){
            this.$emit('deleteTask', obj)
        },
        fullName() {
            if (this.first_name) {
                const arrFirstName = this.first_name.split('')
                const first_name_firstCap = arrFirstName[0].toUpperCase()
                arrFirstName[0] = first_name_firstCap
                const capFirstName = arrFirstName.join('')
                const arrLastName = this.last_name.split('')
                const last_name_firstCap = arrLastName[0].toUpperCase()
                arrLastName[0] = last_name_firstCap
                const capLastName = arrLastName.join('')
                console.log(arrFirstName)
                return this.full_name = capFirstName +' '+ capLastName + "'s"   
            } else {
                return 
            }
        }
    }
}
</script>

<style>

</style>