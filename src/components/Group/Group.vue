<template>
  <div class="group">
    <div class="content" id="list-group">
      <h1 class="ui black header">
        List Group
      </h1>
    </div>
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
    <sui-table basic="very" id="table">
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>No</sui-table-header-cell>
          <sui-table-header-cell>Group Name</sui-table-header-cell>
          <sui-table-header-cell>Join</sui-table-header-cell>
          <sui-table-header-cell>Invite</sui-table-header-cell>
          <sui-table-header-cell>Delete</sui-table-header-cell>
        </sui-table-row>
      </sui-table-header>
      <sui-table-body v-for="({ Group }, i) in groups" :key="i">
        <sui-table-row>
          <sui-table-cell>{{i + 1}}</sui-table-cell>
          <sui-table-cell>{{ Group.group_name }}</sui-table-cell>
          <sui-table-cell>
            <sui-button color="green" content="Join" style="font-size: smaller;" @click="join(Group.id)" />
          </sui-table-cell>
          <sui-table-cell>
            <sui-button color="blue" content="Invite" style="font-size: smaller;" @click="invite(Group.id)" />
          </sui-table-cell>
          <sui-table-cell>
            <sui-button color="red" content="Delete" style="font-size: smaller;" @click.native="toggle(Group.id)" />
          </sui-table-cell>
          <sui-modal v-model="open">
            <sui-modal-header>Are you sure want to delete this group?</sui-modal-header>
            <sui-modal-actions style="display: flex; justify-content: center;">
              <sui-button positive @click.native="toggle">
                Cancel
              </sui-button>
              <sui-button negative @click="destroy">
                Delete
              </sui-button>
            </sui-modal-actions>
          </sui-modal>
        </sui-table-row>
      </sui-table-body>
    </sui-table>
    <sui-dimmer :active="active">
      <sui-loader indeterminate>Please wait...</sui-loader>
    </sui-dimmer>
  </div>
</template>

<script>
export default {
  name: 'group',
  data () {
    return {
      active: false,
      groups: [],
      visible: this.msg.action,
      title: this.msg.title,
      message: this.msg.message,
      open: false,
      groupId: 0
    }
  },
  methods: {
    listGroup () {
      this.active = true
      axios({
        method: 'get',
        url: 'https://ancient-dawn-78678.herokuapp.com/group',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.groups = data.data
        })
        .catch(err => {
          this.visible = true
          this.title = 'ERROR!'
          this.message = 'ERROR load list group'
        })
        .finally(_ => {
          this.active = false
        })
    },
    join (id) {
      this.$emit('groupId', id)
      this.changePage('home')
    },
    invite (id) {
      this.$emit('groupId', id)
      this.changePage('invite')
    },
    changePage (page) {
      this.$emit('changePage', page)
    },
    handleDismiss() {
      this.visible = false
      this.$emit('clearMsg')
    },
    destroy() {
      this.active = true

      axios({
        method: 'delete',
        url: `https://ancient-dawn-78678.herokuapp.com/group/${this.groupId}`,
        headers: {
          token: localStorage.getItem('token'),
          groupId: this.groupId
        }
      })
        .then(_ => {
          this.listGroup()
          this.toggle()
        })
        .finally(_ => {
          this.active = false
        })
    },
    toggle(id) {
      this.groupId = id
      this.open = !this.open;
    }
  },
  created () {
    this.listGroup()
  },
  props: {
    msg: Object
  }
}
</script>

<style>

</style>