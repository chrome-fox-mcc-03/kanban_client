<template>
  <div>
    <div class="register">
      <div class="column">
        <transition name="fade">
          <sui-message
            v-if="visible"
            :header=title
            :content=message
            dismissable
            @dismiss="handleDismiss"
            id="message"
            style=":color:color"
          />
        </transition>
        <sui-form class="ui large form" method="post">
          <h1 class="ui teal header">
            <div class="content">
              Edit Task
            </div>
          </h1>
          <sui-form-field>
            <label>Title</label>
            <div class="ui left icon input">
              <i class="clipboard icon"></i>
              <input type="text" max=10 name="title" placeholder="Title" v-model="titleTask">
            </div>
          </sui-form-field>
          <sui-form-field>
            <label>Description</label>
            <textarea type="text" name="description" placeholder="Description" style="resize: none;" v-model="description" ></textarea>
          </sui-form-field>
          <div class="ui fluid large teal submit button" type="submit" @click="updateTask">Edit</div>
        </sui-form>
      </div>
    </div>
    <sui-dimmer :active="active">
      <sui-loader indeterminate>Please wait...</sui-loader>
    </sui-dimmer>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data () {
    return {
      titleTask: '',
      description: '',
      active: false,
      idGroup: 0,
      message: '',
      title: '',
      visible: false
    }
  },
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    },
    updateTask() {
      const id = this.payloadEdit.id
      this.active = true
      
      axios({
        method: 'put',
        url: `https://ancient-dawn-78678.herokuapp.com/task/${id}`,
        headers: {
          token: localStorage.getItem('token'),
          groupid: this.idGroup
        },
        data: {
          title: this.titleTask,
          description: this.description
        }
      })
        .then(({data}) => {
          this.notification(data.message, data.catId)
          this.changePage('home')
        })
        .catch(err => {
          this.visible = true
          this.title = 'ERROR!'
          this.message = err.response.data.message
        })
        .finally(_ => {
          this.active = false
        })
    },
    handleDismiss() {
      this.visible = false
    },
    notification(message, catId) {
      this.$emit('notification', {
        action: true,
        title: 'Success',
        message,
        catId
      })
    }
  },
  props: {
    groupId: Number,
    payloadEdit: Object
  },
  created () {
    this.idGroup = this.groupId
    this.titleTask = this.payloadEdit.title
    this.description = this.payloadEdit.description
  }
}
</script>

<style>

</style>