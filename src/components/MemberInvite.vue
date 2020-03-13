<template>
  <nav id="navbar-kanban">
      <div class="navigation-content">
        <a @click="backProfileTeam"><i class="fas fa-home"></i></a>
        <a @click="inviteMember">Invite</a>
        <a @click="viewMembers">member</a>
      </div>
      <p>SweatBan</p>
      <a @click="logoutFromBoard"><i class="fas fa-sign-out-alt"></i></a>

      <b-modal id="invite-member" hide-footer>
        <div class="image-modal">
        </div>
            <div class="d-block text-center">
              <center>
                  <form @submit.prevent="addMember">
                      <h2>Invite Member</h2>
                      <br>
                      <div class="form-group">
                          <input type="email" id="name-team" class="form-control" placeholder="Masukan Email" v-model="invite.email" required>
                      </div>
                      <br><br>
                      <b-button class="mt-3 btn btn-primary" block type="submit" style="background-color:blue">Submit</b-button>
                  </form>
              </center>
          </div>
      </b-modal>

      <b-modal id="view-members" hide-footer>
        <div class="image-modal">
        </div>
            <div class="d-block text-center">
              <center>
                  <h2>All Member</h2>
                  <br>
                  <div class="board-members">
                    <div class="card-member">
                      <ul>
                        <li v-for="member in members" :key="member.id">{{member.User.name}}</li>
                      </ul>
                    </div>
                    <div>
                  </div>
                  <br><br>
              </center>
          </div>
      </b-modal>
  </nav>
</template>

<script>
import Toastify from 'toastify-js'
import axios from 'axios'

export default {
  name: 'MemberInvite',
  props : [],
  data () {
    return {
      invite : {
        email : ''
      },
      members : []
    }
  },
  methods: {
    inviteMember () {
      this.$bvModal.show(`invite-member`)
    },
    addMember () {
      let TeamId = localStorage.TeamId
      this.addMember()
    },
    addMember (payload) {
      axios({
        url: 'http://localhost:3000/invite/' + localStorage.TeamId,
        method: 'POST',
        data : {
          email : this.invite.email
        },
        headers : {
          access_token : localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.$bvModal.hide(`invite-member`)
          Toastify({
            text: 'Invite member is successfully',
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            className: "info",
          }).showToast();
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    viewMembers () {
      this.$bvModal.show(`view-members`)
      this.fetchMember()
    },
    fetchMember () {
      axios({
        url: 'http://localhost:3000/members/' + localStorage.TeamId,
        method: 'GET',
        headers: {
          access_token : localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.members = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    backProfileTeam () {
      let statusProfileTeam = false
      this.$emit('backProfileTeam', statusProfileTeam)
    },
    logoutFromBoard () {
      this.$emit('logoutFromBoard')
      Toastify({
        text: 'Thanks You :)',
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        className: "info",
      }).showToast();
    }
  }
}
</script>

<style>

</style>