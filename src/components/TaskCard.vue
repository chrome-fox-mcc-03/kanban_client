<template>
  <div class="cards">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{unitTask.id}}</h5>
        <h5 class="card-title">{{unitTask.title}}</h5>
        <!-- <h6 class="card-subtitle mb-2 text-muted">{{unitTask.description}}</h6> -->
        <h6 class="card-subtitle mb-2 text-muted">{{unitTask.due_date}}</h6>
        <!-- <button
              type="button"
              class="btn btn-warning"
              data-toggle="modal"
              data-target="#editTaskModal"
            >
              Edit
              Task
        </button>-->
        <!-- <a href="#" class="card-link" @click="editTask(unitTask.id)">Edit</a> -->
        <button type="button" class="btn btn-warning" @click="getTaskDetails0">
          Edit
          Task
        </button>

        <button type="button" class="btn btn-danger" @click="deleteTaskById0">
          Delete
          Task
        </button>
      </div>
    </div>
    <!-- <p>{{unitTask.id}}</p> -->
    <!-- <p>{{unitTask.title}}</p>
    <p>{{unitTask.description}}</p>
    <p>{{unitTask.due_date}}</p>-->
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["unitTask"],
  methods: {
    getTaskDetails0() {
      console.log("THE GREAT-GRANDCHILD OF TASKCARD GET TASK DETAILS");
      console.log(this.unitTask, "-------------------------");

      this.$emit("getTaskDetails1", this.unitTask);
      
    },

    deleteTaskById0() {
      console.log("THE GREAT-GRANDCHILD OF TASKCARD DELETE TASK, CHAIN 0");
      this.$emit("deleteTaskById1", this.unitTask.id)
    }
  },
  components: {}
};
</script>

<style scoped>
.card-body {
  color: black;
}
</style>
