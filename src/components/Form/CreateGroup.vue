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
              Create Group
            </div>
          </h1>
          <sui-form-field>
            <label>Group Name</label>
            <div class="ui left icon input">
              <i class="building outline icon"></i>
              <input type="text" max=10 name="groupName" placeholder="Group Name" v-model="groupName">
            </div>
          </sui-form-field>
          <div class="ui fluid large teal submit button" type="submit" @click="createGroup">Create Group</div>
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
  name: 'create group',
  data () {
    return {
      groupName: '',
      active: false,
      visible: false,
      title: '',
      message: ''
    }
  },
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    },
    createGroup() {
      this.active = true
      axios({
        method: 'post',
        url: 'https://ancient-dawn-78678.herokuapp.com/group',
        data: {
          group_name: this.groupName
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.groupName = ''
          this.changePage('group')
          this.notification(data.message)
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
    notification(message) {
      this.$emit('notification', {
        action: true,
        title: 'Success',
        message
      })
    }
  }
}
</script>

<style>

</style>