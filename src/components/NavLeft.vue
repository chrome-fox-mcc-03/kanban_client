<template>
  <nav class="nav-left">
    <form v-show="!appStatus" class="reg-log-form" @submit.prevent="reglogSubmit">
      <label for="email">EMAIL</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Type Your Email"
        v-model="input.email"
      />
      <label for="password">PASSWORD</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Type Your Password"
        v-model="input.password"
      />
      <button v-show="!appStatus" @click.prevent="register" class="nav-btn hover">Register</button>
      <button v-if="!appStatus" @click.prevent="login" class="nav-btn">Login</button>
    </form>
    <button v-if="appStatus" @click.prevent="logout" class="nav-btn logout">Logout</button>
  </nav>
</template>

<script>
export default {
  name: "NavLeft",
  props: ["appStatus"],
  data() {
    return {
      isLogout: true,
      input: {
        email: "",
        password: ""
      },
      payload: {
        email: "",
        password: ""
      }
    };
  },
  components: {},
  methods: {
    reglogSubmit() {
      if (!this.appStatus) {
        register();
        login();
      }
    },
    register() {
      this.payload.email = this.input.email;
      this.payload.password = this.input.password;
      this.$emit("toRegister", this.payload);
      if (this.appStatus) {
        this.isLogout = false;
      }
      this.input.email = "";
      this.input.password = "";
    },
    login() {
      this.payload.email = this.input.email;
      this.payload.password = this.input.password;
      this.$emit("toLogin", this.payload);
      if (this.appStatus) {
        this.isLogout = false;
      }
    },
    logout() {
      this.input.email = "";
      this.input.password = "";
      localStorage.removeItem("access_token");
      this.isLogout = true;
      this.$emit("toLogout", false);
    }
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
  font-family: "Raleway", Arial, sans-serif;
  border: none;
  background-color: #20638f;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  padding: 0 1rem;
  display: inline-block;
  margin: 0.6rem;
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
  content: "";
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
  content: "";
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

.reg-log-form {
  color: cornsilk;
  font-size: 0.7rem;
}
.reg-log-form input {
  margin: 0 0.3rem;
  padding: 0.3rem;
  border-radius: 5px;
}

.reg-log-form label {
  margin: 0 0.2rem;
}
</style>
