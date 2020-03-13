<template>
  <div>
    <!-- <h1>Halaman Login</h1> -->

    <!-- <label>Email</label>
      <input type="text" v-model="email" placeholder="johndoe@gmail.com" />
      <br />
      <label>Password</label>
      <input type="text" v-model="password" placeholder="********" />
      <br />
    <button>Login</button>-->
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Sign In</h3>
          </div>
          <div class="card-body">
            <form v-on:submit.prevent="login()">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
                </div>
                <input type="text" class="form-control" v-model="email" placeholder="email" />
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="password"
                />
              </div>
              <div class="row align-items-center remember">
                <input type="checkbox" />Remember Me
              </div>
              <div class="form-group">
                <input type="submit" value="Login" class="btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              Don't have an account?
              <a href="#">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data: () => {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submitForm: () => {
      console.log("Submitted");
    },
    login() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.$emit("login", data);
    }
  }
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Numans");

html,
body {
  background-image: url("http://getwallpapers.com/wallpaper/full/4/5/3/29327.jpg");
  /* background-image: url("https://id.pinterest.com/pin/743656957198657070/"); */
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  font-family: "Numans", sans-serif;
}

.container {
  height: 100%;
  align-content: center;
}

.card {
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: rgba(243, 174, 174, 0.932) !important;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #db7928;
}
scoped .social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color:#db7928;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #db7928;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>

