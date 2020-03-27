<template>
  <sui-container text-align="center" style="display: flex; justify-content: space-around;">
    <sui-button-group>
      <sui-button animated style="background: none;" @click="fetchEdit">
        <sui-button-content visible>
          <sui-icon color="blue" name="edit" />
        </sui-button-content>
        <sui-button-content style="color: #2185d0!important;" hidden>Edit</sui-button-content>
      </sui-button>
      <sui-button animated style="background: none;" @click.native="toggle">
        <sui-button-content visible>
          <sui-icon color="red" name="trash alternate" />
        </sui-button-content>
        <sui-button-content style="color: red;" hidden>Delete</sui-button-content>
      </sui-button>
    </sui-button-group>
    <sui-dimmer :active="active">
      <sui-loader indeterminate>Please wait...</sui-loader>
    </sui-dimmer>
    <sui-modal v-model="open">
      <sui-modal-header>Are you sure want to delete this task?</sui-modal-header>
      <sui-modal-actions style="display: flex; justify-content: center;">
        <sui-button positive @click.native="toggle">
          Cancel
        </sui-button>
        <sui-button negative @click="destroy">
          Delete
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </sui-container>
</template>

<script>
export default {
  name: 'Option Card',
  data () {
    return {
      active: false,
      open: false,
    }
  },
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    },
    fetchEdit () {
      this.active = true
      axios({
        method: 'get',
        url: `https://ancient-dawn-78678.herokuapp.com/task/${this.payload.id}`,
        headers: {
          token: localStorage.getItem('token'),
          categoryid: this.payload.idCategory,
          groupid: this.payload.idGroup
        }
      })
        .then(({data}) => {
          this.$emit('payloadEdit', data.data)
          this.changePage('edit')
        })
        .catch(err => {
          this.notification(err.response.data.message, this.payload.idCategory)
        })
        .finally(_ => {
          this.active = false
        })
    },
    destroy () {
      this.active = true

      axios({
        method: 'delete',
        url: `https://ancient-dawn-78678.herokuapp.com/task/${this.payload.id}`,
        headers: {
          token: localStorage.getItem('token'),
          categoryid: this.payload.idCategory,
          groupid: this.payload.idGroup
        }
      })
        .then(({data}) => {
          this.toggle()
          this.notification(data.message, this.payload.idCategory)
        })
        .catch(err => {
          this.notification(err.response.data.message, this.payload.idCategory)
        })
        .finally(_ => {
          this.active = false
        })
    },
    toggle() {
      this.open = !this.open;
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
    payload: Object
  },
  computed: {
    right() {
      if(this.payload.idCategory === 1) {
        return 'Todo'
      } else if(this.payload.idCategory === 2) {
        return 'Done'
      } else if(this.payload.idCategory === 3) {
        return 'completed'
      }
    },
    left() {
      if(this.payload.idCategory === 2) {
        return 'Backlog'
      } else if(this.payload.idCategory === 3) {
        return 'Todo'
      } else if(this.payload.idCategory === 4) {
        return 'Done'
      }
    }
  }
}
</script>

<style>

</style>