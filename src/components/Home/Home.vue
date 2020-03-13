<template>
  <div class="home">
    <temp v-for="{ id, category } in categories" :key="id" :category="category" :categoryId="id" :groupId="idGroup"></temp>
    <sui-dimmer :active="active">
      <sui-loader indeterminate>Please wait...</sui-loader>
    </sui-dimmer>
  </div>
</template>

<script>
import Temp from '../Card/Template'
export default {
  name: 'Home',
  data() {
    return {
      categories: [],
      idGroup: 0,
      active: false
    };
  },
  components: {
    Temp
  },
  methods: {
    fetchCategory () {
      this.active = true
      axios({
        method: 'get',
        url: 'http://localhost:3000/category'
      })
        .then(({ data }) => {
          this.categories = data.data
        })
        .catch(err => {
          console.log(err, 'error slur')
        })
        .finally(_ => {
          this.active = false
        })
    }
  },
  created () {
    this.fetchCategory()
    this.idGroup = this.groupId
  },
  props: {
    groupId: Number
  }
};
</script>