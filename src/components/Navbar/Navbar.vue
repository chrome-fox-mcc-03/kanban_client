<template>
  <div class="ui inverted menu" id="navbar">
    <div class="left menu">
      <sui-button animated="vertical" style="background:none;" >
        <sui-button-content style="color: green;" hidden>Create</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="pencil alternate" color="green" style="background:none;" />
        </sui-button-content>
      </sui-button>
    </div>
    <a class="header item" style="padding-left: 40vw" id="logo"><p>QanbaN</p></a>
    <div class="right menu">
      <sui-button animated="vertical" style="background:none;" >
        <sui-button-content style="color: red;" hidden>Logout</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="sign-out" color="red" style="background:none;" />
        </sui-button-content>
      </sui-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>