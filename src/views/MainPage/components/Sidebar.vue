<template>
  <section>
    <div class="sidebar">
      <b-form id="invite-user" @submit.prevent="invite">
        <b-form-group
            label="Invite Others"
            label-for="select-user"
          >  
          <b-form-select 
            id="select-user" 
            v-model="selected" 
            :options="users"
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
      selected: null,
      users: [
          { value: null, text: 'Choose a user' },
          { value: 'id-1', text: 'ane' },
          { value: 'id-2', text: 'ana' },
          { value: 'id-3', text: 'ani' },
          { value: 'id-4', text: 'anoa'}
        ]
    }
  },
  methods: {
    invite (){
      console.log(this.selected)
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