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
              Invite User
            </div>
          </h1>
          <sui-form-field>
            <label>Email</label>
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="email" name="Email" placeholder="Email" v-model="email">
            </div>
          </sui-form-field>
          <div class="ui fluid large teal submit button" type="submit" @click="invite">Invite User</div>
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
  name: 'Invite form',
  data () {
    return {
      active: false,
      visible: false,
      title: '',
      message: '',
      email: '',
      id: 0
    }
  },
  methods: {
    invite () {
      this.active = true
      axios({
        method: 'post',
        url: `https://ancient-dawn-78678.herokuapp.com/group/invite/${this.id}`,
        data: {
          email: this.email
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.email = ''
          this.notification(data.message)
          this.changePage('group')
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
    changePage (page) {
      this.$emit('changePage', page)
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
  },
  props: {
    groupId: Number
  },
  created () {
    this.id = this.groupId
  }
}
</script>

<style>

</style>