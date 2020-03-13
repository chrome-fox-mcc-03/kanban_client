<template>
  <div id="OuterBoard" class="container" > 
            <!-- DIV KANBANBOARD DALAM -->
            <img src="../img/golden-wooden-frame_f12rhYqu_SB_PM.jpg" class="frame">
            <div id="KanbanBoard">
                
            <!-- template insideboard -->
                <div id="InsideBoard">
                    <taskboard @updatethis="updatethis" @deletethis="deletethis" v-for = "(category, i) in categories" :key="i" :category="category" :tasks="SelectCategories(category)" ></taskboard>
                </div>



            </div>
            <!-- Div Dashboard Kanban End -->

        </div>

</template>

<script>
import taskboard from './taskboard.vue'

export default {
    props: ['backlog', 'development', 'product', 'done', 'categories'],
    data() {
        return {
            tasks: [this.backlog, this.product, this.development, this.done],
        }
        
    },
    methods: {
        SelectCategories(categories) {
            switch (categories) {
                case "Backlog":
                    return this.backlog
                    break;
                case "Product":
                    return this.product
                    break;
                case "Development":
                    return this.development
                    break;
                case "Done":
                    return this.done
                    break;
            
                default:
                    break;
            }
        },
        deletethis(data) {
            this.$emit('deletethis', data)
        },
        updatethis(data) {
            this.$emit('updatethis', data)
        }
    },
    components: {
        taskboard,
        // task
    } 
}
</script>

<style>

</style>