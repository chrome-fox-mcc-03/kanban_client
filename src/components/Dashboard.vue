<template>
  <div>
      <NavbarPanel></NavbarPanel>
      <TasksPanel></TasksPanel>
  </div>
</template>

<script>
import NavbarPanel from './NavbarPanel'
import TasksPanel from './TasksPanel'

export default {
    name: 'Dashboard',
    components: {
        NavbarPanel,
        TasksPanel
    }
}
</script>

<style>

</style>