<template>
  <div class="add-div">
    <form @submit.prevent="addNewAct()" class="add-act">
      <input v-model="newActivity" type="text" placeholder="New Activity" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddForm",
  data: function() {
    return {
        newActivity: ""
    }
  },
  methods: {
    addNewAct() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/activities',
        data: {
          title: this.newActivity
        },
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          //fetch lagi
          this.fetchActivities();
          console.log('New activity successfully added!', data);
          this.newActivity = '';
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  props: [ 
    'fetchActivities' 
  ]
}
</script>

<style>
</style>