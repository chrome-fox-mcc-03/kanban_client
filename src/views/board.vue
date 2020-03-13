<template>
  <div id="main">

    <board-header></board-header>
    <info-bar></info-bar>
    <category-board></category-board>
  </div>
</template>

<script>
import axios from 'axios';
import BoardHeader from '../components/boardHeader';
import InfoBar from '../components/infobar';
import CategoryBoard from '../components/category';
export default {
  components: {
    BoardHeader,
    InfoBar,
    CategoryBoard,
  },
  data() {
    return {
      tes: '123'
    }
  },
  beforeRouteEnter: function (to, from, next) {
    if (localStorage.getItem('access_token')) {
      console.log('masuk ada token beforeRouteEnter');
      next();
    } else {
      console.log('masuk di tidak ada token beforeRouteEnter');
          console.log(to);
    }
  },
  created() {
  },
}
</script>

<style>

</style>