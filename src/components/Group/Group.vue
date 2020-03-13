<template>
  <div class="group">
    <div class="content" id="list-group">
      <h1 class="ui black header">
        List Group
      </h1>
    </div>
    <sui-table basic="very" id="table">
      <sui-table-header>
        <sui-table-row>
          <sui-table-header-cell>No</sui-table-header-cell>
          <sui-table-header-cell>Group Name</sui-table-header-cell>
          <sui-table-header-cell>Join</sui-table-header-cell>
          <sui-table-header-cell>Invite</sui-table-header-cell>
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
      groups: []
    }
  },
  methods: {
    listGroup () {
      this.active = true
      axios({
        method: 'get',
        url: 'http://localhost:3000/group',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.groups = data.data
          console.log(data, 'success list group')
        })
        .catch(err => {
          console.log(err.response.data.message, 'error register')
        })
        .finally(_ => {
          this.active = false
        })
    },
    join (id) {
      this.$emit('groupId', id)
      this.changePage('home')
      console.log('join', id)
    },
    invite (id) {
      this.$emit('groupId', id)
      this.changePage('invite')
    },
    changePage (page) {
      this.$emit('changePage', page)
    }
  },
  created () {
    this.listGroup()
  }
}
</script>

<style>

</style>