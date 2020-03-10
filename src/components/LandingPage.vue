<template>
  <div>
      <LoginPanel></LoginPanel>
      <RegisterPanel></RegisterPanel>
  </div>
</template>

<script>
import LoginPanel from '../components/LoginPanel'
import RegisterPanel from '../components/RegisterPanel'

export default {
    name: 'LandingPage',
    components: {
        LoginPanel,
        RegisterPanel
    }
}
</script>

<style>

</style>