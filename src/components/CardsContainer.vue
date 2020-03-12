<template>
    <div id="cards-container">
        <h1 class="title">Tasks </h1>
        <div id="main-cards-container">          
            <div v-for="(category,index) in categories" :key="index" class="cards-section">
                <div class="card-header-div">
                    <p class="card-header-word">{{ category }}</p>
                </div>
                    <cards @reGetCards="getCards" :categories="categories" :cards="cards" :category="category"></cards>
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

        }
    },
    components: {
        Cards
    },
    props: {
        cards: Array,
        categories: Array
    },
    methods: {
        getCards() {
            this.$emit('getCards')
        }
    }
}
</script>

<style>

</style>