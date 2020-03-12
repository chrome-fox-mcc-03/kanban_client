<template>
  <nav class="nav-left">
    <button class="nav-btn hover">Register</button>
    <button class="nav-btn">Login</button>
    <button class="nav-btn logout">Logout</button>
  </nav>
</template>

<script>
export default {
  name: 'NavLeft',
  data() {
    return {};
  }
};
</script>

<style scope>
nav {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
}
.nav-left {
  flex-basis: 69%;
}


.nav-btn {
  font-family: 'Raleway', Arial, sans-serif;
  border: none;
  background-color: #20638f;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  padding: 0 1rem;
  display: inline-block;
  margin: 1rem;
  text-transform: uppercase;
  line-height: 2.5rem;
  font-weight: 600;
  outline: none;
  position: relative;
  font-size: 0.7rem;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.logout {
  background-color: red !important;
}

.nav-btn:after {
  content: '';
  position: absolute;
  height: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.15);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.nav-btn:before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  background-color: inherit;
  border-radius: 10px;
  z-index: -1;
  box-shadow: inset 0 -6px 10px rgba(0, 0, 0, 0.75);
}
.nav-btn:hover:after,
.nav-btn.hover:after {
  height: 100%;
}
</style>
