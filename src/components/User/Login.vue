<template>
  <div class="login">
    <div class="column">
      <sui-form class="ui large form" method="post">
        <h1 class="ui teal header">
          <div class="content">
            Login into QanbaN
          </div>
        </h1>
        <sui-form-field>
          <label>Email</label>
          <div class="ui left icon input">
            <i class="envelope icon"></i>
            <input type="email" name="email" placeholder="Email">
          </div>
        </sui-form-field>
        <sui-form-field>
          <label>Password</label>
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password"  placeholder="Password">
          </div>
        </sui-form-field>
        <div class="ui fluid large teal submit button" type="submit">Login</div>
      </sui-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>

</style>