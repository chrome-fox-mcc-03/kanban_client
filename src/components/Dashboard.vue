<template>
      <div id="pg-dashboard" v-show="isLogin">

      <h3 class="header">MY TASKS</h3>


      <class="crate-projects" v-for="(category, index) in categories" :key="index">
          <!-- <Box 
          v-for="(category, index) in categories" 
          :key="index"
          :tasks="tasks.category"
          >
          
          </Box> -->

        <!-- <div id="box-" v-bind:id="category">
          <div>

          </div>
        </div> -->

<!-- 
        <div id="box-done" class=column>
          <h4 class="subheader">DONE</h4>
          <p class="tbl-tasks">

            <ul class="task-entry">
              <li>1</li>
              <li v-for="(task, idx) in tasks" :key="idx"> {{ task.id }} </li>
              <li>
                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editTaskModal">
                  EDIT
                </button>

                <button type="button" class="btn btn-danger" v-on:click="deleteTask(taskId, event)">DELETE</button>
              </li>
            </ul>
          </p>
        </div> -->


        

      <!-- </div> -->


      <!-- <span v-model="printSuccessMsg()" class="msg-success"> {{msgSuccess}} </span>
      <span v-model="printErrorMsg()" class="msg-error"> {{msgError}} </span> -->
    </div>
</template>

<script>
//IMPORT BOX
export default {
    name: "Dashboard",
    data: {
        function() {
            return {

            }
        }
    },
    methods: {

        editTask() {
            // this.$emit("editTaskById", this.taskCreds)
        }

    },
    props: ['categories', 'tasks'],
    components: {
        Box
    }
}
</script>

<style>

</style>