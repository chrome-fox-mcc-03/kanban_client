<template>
  <div class="down-bar">
    <div class="title">
      <p>Teams</p>
      <a @click="showFormAddTeam"><i class="fas fa-plus"></i></a>
    </div>
    <div class="teams">
      <TeamCollection 
        v-for="team in teams" 
        :key="team.id" 
        :team="team"
        ></TeamCollection>
    </div>
    <b-modal id="add-team" hide-footer>
      <div class="image-modal">
      </div>
          <div class="d-block text-center">
            <center>
                <form @submit.prevent="addTeam">
                    <h2>Add Team</h2>
                    <br>
                    <div class="form-group">
                        <label for="title">Name of Team</label>
                        <input type="text" id="name-team" class="form-control" v-model="nameTeam" required>
                    </div>
                    <br><br>
                    <b-button class="mt-3 btn btn-primary" block type="submit" style="background-color:blue">Submit</b-button>
                </form>
            </center>
        </div>
        <!-- <b-button class="mt-3" block @click="$bvModal.hide(`register`)" style="background-color:red">Cancel</b-button> -->
    </b-modal>
  </div>
</template>

<script>
import TeamCollection from './TeamCollection'

export default {
  name: 'BoardTeam',
  props: ['teams'],
  data () {
    return {
      nameTeam : ''
    }
  },
  components : {
    TeamCollection
  },
  methods : {
    showFormAddTeam () {
      this.$bvModal.show(`add-team`)
    },
    addTeam () {
      console.log('MASUK >>>>>>>')
      let payload = {
        name: this.nameTeam
      }
      this.$emit('addTeam', payload)
    }
  }
}
</script>

<style>

</style>