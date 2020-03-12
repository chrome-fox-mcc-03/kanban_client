<template>
  <section>
    <div class="nav-menu">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>
                Kanbanian
                <img src="../../img/logo1.svg" alt />
              </strong>
            </p>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <!-- <p class="level-item"><strong>All</strong></p>
                        <p class="level-item"><a>Published</a></p>
                        <p class="level-item"><a>Drafts</a></p>
          <p class="level-item"><a>Deleted</a></p>-->
          <p class="level-item">
            <a v-on:click="logout()" class="button is-dark">logout</a>
          </p>
        </div>
      </nav>
    </div>
    <div class="container list-content">
      <div class="columns">
        <!-- column 1 -->
        <div class="column layout-column">
          <div class="header">Backlog</div>

          <div class="layout-box">
            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>
            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>
            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>
            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- Column 2 -->
        <div class="column layout-box">
          <div class="header">Todo</div>
          <div class="layout-box">
            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>

            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>

            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>
            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>
            <div class="box">
              <div class="media-content">
                <div class="content">
                  <div class="delete-div">
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                </div>
              </div>
              <div class="footer-todo">
                <span>
                  <i class="fas fa-pen fa-lg tombol"></i>
                </span>
                <button class="delete" aria-label="delete"></button>
                <span>
                  <i class="fas fa-caret-square-right fa-lg tombol"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- Column 3 -->
        <div class="column layout-box">
          <div class="header">On Progress</div>
        </div>
        <!-- Column 4 -->
        <div class="column layout-box">
          <div class="header">Completed</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    logout() {
      this.$emit("logoutBtn");
    }
  }
};
</script>

<style>
</style>