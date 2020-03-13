<template>
    <div id="backlog-container" style="overflow: scroll;">
        <div v-for="el in onCategory(category, cards)" :key="el.id" class="card-content border-radius-card h-25 w-90 card">
            <div class="card-image">
                <i class="profpict fas fa-user-circle"></i>
            </div>
            <div class="border-radius-body card-body card-body-color" style="overflow: scroll;">
                <p class="card-text">{{ el.title }}</p>
                <div class="card-option">
                    <i @click="showDetail(el)" type="button" class="fas fa-info-circle" data-toggle="modal" data-target="#exampleModal">
                    </i>
                    <i @click="updateArrow(el, -1)" v-if="!el.firstIndex || el.lastIndex" type="button" class="fas fa-arrow-circle-left"></i>
                    <i @click="updateArrow(el, 1)" v-if="!el.lastIndex || el.firstIndex" type="button" class="fas fa-arrow-circle-right"></i>
                    <i @click="deleteTask(el)" type="button" class="fas fa-trash-alt"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {

        }
    },
    props: {
        categories: Array,
        category: String,
        cards: Array,
    },
    methods: {
        onCategory(category, array){
            return array.filter(el => {
                return el.category === category
            })
        },
        showDetail(el){
            const id = el.id
            const token = localStorage.getItem('token')
            axios({
                method: "GET",
                url: `https://ancient-stream-97435.herokuapp.com/tasks/${id}`,
                headers: {
                    token
                }
            })
                .then(response => {
                    [response.data].forEach(el => {
                        let currentIndex = this.categories.indexOf(el.category)
                        if (currentIndex === 0) {
                            el.firstIndex = true
                            el.lastIndex = false
                        } else if(currentIndex === this.categories.length - 1){
                            el.lastIndex = true
                            el.firstIndex = false
                        } else {
                            el.lastIndex = true
                            el.firstIndex = true
                        }
                    })
                    this.$emit('assignTaskDetail', response.data)
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        updateArrow(el, index){
            let obj = {
                task: el,
                index: index
            }
            this.$emit('update', obj)
        },
        deleteTask(el){
            this.$emit('delete', el)
        }
    }
}
</script>

<style>

</style>