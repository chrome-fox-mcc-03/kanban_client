<template>
  <section>
    <div class="sidebar">
      <b-form v-if="mainPage === 'tasks'" id="invite-user" @submit.prevent="invite">
        <b-form-group
            label="Invite Others"
            label-for="select-user"
          >  
          <b-form-select 
            id="select-user" 
            v-model="selected" 
            :options="options"
            required
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="warning" pill>Invite</b-button>
      </b-form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      selected: null
    }
  },
  props: {
    mainPage: String,
    members: Array
  },
  computed: {
    options () {
      let options = [
        { value: null, text: 'Choose a user' }
      ]
      this.members.forEach(member => {
        options.push({ value: member.id, text: member.username })
      })
      return options
    }
  },
  methods: {
    invite (){
      console.log('Not available at this moment')
    }
  }

}
</script>

<style scoped>
  .sidebar {
  margin: 0;
  padding: 0;
  width: 12vw;
  background-color: #f1f1f1;
  /* position: fixed; */
  height: 75vh;
  overflow: auto;
}

/* Sidebar links */
.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
</style>