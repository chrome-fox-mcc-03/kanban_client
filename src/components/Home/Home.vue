<template>
  <div class="home">
    <temp
      v-for="{ id, category } in categories"
      @clearMsg="clearMsg"
      :msg="msg"
      @payloadEdit="edit"
      @changePage="changePage"
      :key="id"
      :category="category"
      :categoryId="id"
      :groupId="idGroup"
    ></temp>
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
        url: 'https://ancient-dawn-78678.herokuapp.com/category'
      })
        .then(({ data }) => {
          this.categories = data.data
        })
        .finally(_ => {
          this.active = false
        })
    },
    changePage (page) {
      this.$emit('changePage', page)
    },
    edit (payload) {
      this.$emit('payloadEdit', payload)
    },
    clearMsg () {
      this.$emit('clearMsg')
    }
  },
  created () {
    this.fetchCategory()
    this.idGroup = this.groupId
  },
  props: {
    groupId: Number,
    msg: Object
  }
};
</script>