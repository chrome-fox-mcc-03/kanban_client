<template>
  <div class="main-board">
        <div class="row-4 d-flex categories">
            <div class="categories"
              v-for="category in categories"
              :key="category.id"
            > 
                <CategoryPanel
                  @editData="editData"
                  @changeActivity="changeActivity"
                  @fetchCategory="fetchCategory"
                  :category="category"
                ></CategoryPanel>
            </div>
        </div>        
    </div>
</template>

<script>
import axiosKanban from '../../config/index'
import CategoryPanel from './CategoryPanel'

export default {
    name: 'CategoriesPanel',
    data() {
        return {
            categories : []
        }
    },
    components: {
        CategoryPanel
    },
    methods: {
        fetchCategory(){
            axiosKanban({
                method: 'GET',
                url: '/categories'
            })
                .then(({data}) => {
                    this.categories = data
                    // this.$emit('changeActivity', 'list')
                })
                .catch(err => {
                    this.$vToastify.error(err.response.data.message)
                })
        },
        changeActivity(status) {
            this.$emit('changeActivity', status)
        },
        editData(id, title, description){
            this.$emit('editData', id, title, description)
        }
    },
    created(){
        this.fetchCategory()
    },
    watch: {
        categories(val){
            console.log(categories)
        }
    }


}
</script>

<style>

</style>