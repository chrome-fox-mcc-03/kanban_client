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
              Create new task
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
          <div class="ui fluid large teal submit button" type="submit" @click="createTask">Create</div>
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
    createTask() {
      this.active = true
      axios({
        method: 'post',
        url: 'https://ancient-dawn-78678.herokuapp.com/task',
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
          this.notification(data.message, 1)
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
    groupId: Number
  },
  created () {
    this.idGroup = this.groupId
  }
}
</script>

<style>

</style>