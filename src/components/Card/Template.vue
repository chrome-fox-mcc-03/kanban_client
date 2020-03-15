<template>
  <div class="template">
    <div class="title">
      <h1>{{category}}</h1>
    </div>
    <div class="category">
      <transition name="fade">
        <sui-message
          v-if="visible && categoryId === catId"
          :header=title
          :content=message
          dismissable
          @dismiss="handleDismiss"
          id="message"
          style=":color:color"
        />
      </transition>
      <card
        @notification="notification"
        @payloadEdit="edit"
        @changePage="changePage"
        :categoryId="categoryId"
        :groupId="groupId"
      ></card>
    </div>
    <sui-dimmer :active="active">
      <sui-loader indeterminate>Please wait...</sui-loader>
    </sui-dimmer>
  </div>
</template>

<script>
import Card from './Card'

export default {
  Name: 'Card',
  components: {
    Card
  },
  data () {
    return {
      active: false,
      visible: this.msg.action,
      title: this.msg.title,
      message: this.msg.message,
      catId: this.msg.catId
    }
  },
  props: {
    category: String,
    groupId: Number,
    categoryId: Number,
    msg: Object
  },
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    },
    edit (payload) {
      this.$emit('payloadEdit', payload)
    },
    handleDismiss() {
      this.visible = false
      this.$emit('clearMsg')
    },
    notification(payload) {
      this.visible = payload.action
      this.title = payload.title
      this.message = payload.message
      this.catId = payload.catId
    }
  }
}
</script>

<style>

</style>