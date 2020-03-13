<template>
  <div class="lists">
    <div class="list-label">BACKLOG</div>
    <div class="tasks">
      <list-task></list-task>
    </div>
  </div>
</template>

<script>
import Task from './Task';
export default {
  data() {
    return {};
  },
  components: {
    'list-task': Task
  }
};
</script>

<style scope>
.lists {
  flex-direction: column;
  margin: 0.5rem;
  justify-content: flex-start;
  border-radius: 5px;
  min-height: fit-content;
}

.list-label {
  text-align: center;
  width: 100%;
  padding: 0.8rem 2rem;
  background: rgba(0, 0, 0, 0.514);
  color: cornsilk;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

</style>
