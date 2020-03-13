<template>
<div class="sign_up_container">
  <signup-form @showTask="showTask" @signup="signup"></signup-form>
  <signup-text @showLogin="showLogin"></signup-text>
</div>
</template>

<script>
import SignupForm from './components/signup-form';
import SignupText from './components/signup-text';

export default {
    name: 'Signup',
    components: {
        SignupForm,
        SignupText
    },
    methods: {
      showLogin(page) {
        this.$emit('showLogin', page);
      },
      signup(token) {
        this.$emit('signup', token);
      },
      showTask() {
        this.$emit('showTask');
      }
    }
}
</script>

<style>

</style>