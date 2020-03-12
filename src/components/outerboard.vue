<template>
  <div id="OuterBoard" class="container" > 
            <!-- DIV KANBANBOARD DALAM -->
            <img src="../img/golden-wooden-frame_f12rhYqu_SB_PM.jpg" class="frame">
            <div id="KanbanBoard">
                
            <!-- template insideboard -->
                <div id="InsideBoard">
                    <taskboard v-for = "(category, i) in categories" :key="i" :category="category" :tasks="SelectCategories(category)" ></taskboard>
                </div>



            </div>
            <!-- Div Dashboard Kanban End -->

        </div>

</template>

<script>
import taskboard from './taskboard.vue'

export default {
    props: ['isProject'],
    data() {
        return {
            project: '',
            backlog: [],
            product: [],
            development: [],
            categoryname: '',
            categories: ["Backlog", "Product", "Development", "Done"],
            tasks: [this.backlog, this.product, this.development, this.done],
            done: [],
            users: [],//Kanban Board
            data: {
                title: '',
                content: '',
                category: '',
                due_date: '',
                userid: '',
                projectid: '',
                //Task Satuan Modal
            },
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
                    return this.Development
                    break;
                case "Done":
                    return this.Done
                    break;
            
                default:
                    break;
            }
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