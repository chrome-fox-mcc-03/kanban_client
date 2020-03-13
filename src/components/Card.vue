<template>
  <div class="box">
    <div class="media-content">
      <div class="content">
        <div class="delete-div">
          <span>{{filterTask.title}}</span>
          <button class="delete" aria-label="delete"></button>
        </div>
      </div>
    </div>
    <div class="footer-todo">
      <span>
        <!-- <i class="fas fa-pen fa-lg tombol"></i> -->
      </span>
      <span>
        <i class="fas fa-caret-square-left fa-lg tombol"></i>
        <i class="fas fa-caret-square-right fa-lg tombol"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["filterTask", "category"],
  methods: {}
};
</script>

<style>
</style>