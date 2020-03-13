<template>
    <!-- REGISTER Modal -->
      <div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">NEW USER? LET'S SIGNUP!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="signup-form">
                Email<br>
                <input v-model="userCreds.email" type="email" class="form-control" id="email-signup"
                  aria-describedby="emailHelp" placeholder="Enter email">
                <br>
                Password<br>
                <input v-model="userCreds.password" type="password" class="form-control" id="password-signup"
                  placeholder="Password">
                <br>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" form="signup-form"
                v-on:click.prevent="signup()">SIGNUP</button>
            </div>
          </div>
        </div>
        <!-- <span v-model="printSuccessMsg(event)" class="msg-success"> {{msgSuccess}} </span>
        <span v-model="printErrorMsg(event)" class="msg-error"> {{msgError}} </span> -->
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>