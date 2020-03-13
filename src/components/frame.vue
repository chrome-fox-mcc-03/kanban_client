<template>
  <div class="container-fluid">
    <div class="row at-row flex-center">
      <div class="backlog col-md-5  sm-12">
        <div class="title">BACK LOG
        </div>
        <div class="at-box-row bg-c-brand-dark" v-for="{id,title,description,StatusId} in backlog" :key="id" style="margin-top:20px">
          <at-card :style="{ width: '250px' }">
            <h4 slot="title">{{title}}</h4>
            <div slot="extra">
              <at-dropdown>
                <span><i class="icon icon-settings"></i></span>
                <at-dropdown-menu slot="menu">
                  <at-dropdown-item name="edit"><a @click="edit({id,title,description})">Edit</a></at-dropdown-item>
                  <at-dropdown-item><a @click="deleted(id)">Delete</a></at-dropdown-item>
                </at-dropdown-menu>
              </at-dropdown>
            </div>
            <div>
              {{description}}
              <div class="row flex-between" style="margin-top:20px;">
                <at-button type="success" disabled><i class="icon icon-chevron-left" ></i></at-button>
                <at-button type="error" @click.prevent="foward(id,StatusId)"><i class="icon icon-chevron-right"></at-button>
              </div>
            </div>
          </at-card>
        </div>
      </div>
      <div class="To Do col-md-5 sm-col-12">
        <div class="title">To Do</div>
        <div class="at-box-row bg-c-brand-dark" v-for="{id,title,description,StatusId} in Todo" :key="id" style="margin-top:20px">
        <at-card :style="{ width: '250px' }">
            <h4 slot="title">{{title}}</h4>
            <div slot="extra">
              <at-dropdown>
                <span><i class="icon icon-settings"></i></span>
                <at-dropdown-menu slot="menu">
                  <at-dropdown-item name="edit"><a @click="edit({id,title,description})">Edit</a></at-dropdown-item>
                  <at-dropdown-item><a @click="deleted(id)">Delete</a></at-dropdown-item>
                </at-dropdown-menu>
              </at-dropdown>
            </div>
            <div>
              {{description}}
              <div class="row flex-between" style="margin-top:20px;">
                <at-button type="success" @click.prevent="rewind(id,StatusId)"><i class="icon icon-chevron-left"></i></at-button>
                <at-button type="error" @click.prevent="foward(id,StatusId)" ><i class="icon icon-chevron-right"></at-button>
              </div>
            </div>
        </at-card>
        </div>
      </div>
      <div class="Doing col-md-5 sm-col-12" >
        <div class="title">Doing</div>
        <div class="at-box-row bg-c-brand-dark" v-for="{id,title,description,StatusId} in Doing" :key="id" style="margin-top:20px">
        <at-card :style="{ width: '250px' }">
            <h4 slot="title">{{title}}</h4>
            <div slot="extra">
              <at-dropdown>
                <span><i class="icon icon-settings"></i></span>
                <at-dropdown-menu slot="menu">
                  <at-dropdown-item name="edit"><a @click="edit({id,title,description})">Edit</a></at-dropdown-item>
                  <at-dropdown-item><a @click="deleted(id)">Delete</a></at-dropdown-item>
                </at-dropdown-menu>
              </at-dropdown>
            </div>
            <div>
              {{description}}
              <div class="row flex-between" style="margin-top:20px;">
                <at-button type="success" @click.prevent="rewind(id,StatusId)"><i class="icon icon-chevron-left"></i></at-button>
                <at-button type="error" @click.prevent="foward(id,StatusId)"><i class="icon icon-chevron-right"></at-button>
              </div>
            </div>
        </at-card>
        </div>
      </div>
      <div class="Done col-md-5 sm-col-12">
        <div class="title">Done</div>
        <div class="at-box-row bg-c-brand-dark" v-for="{id,title,description,StatusId} in done" :key="id" style="margin-top:20px">
        <at-card :style="{ width: '250px' }">
            <h4 slot="title">{{title}}</h4>
            <div slot="extra">
              <at-dropdown>
                <span><i class="icon icon-settings"></i></span>
                <at-dropdown-menu slot="menu">
                  <at-dropdown-item name="edit"><a @click="edit({id,title,description})">Edit</a></at-dropdown-item>
                  <at-dropdown-item><a @click="deleted(id)">Delete</a></at-dropdown-item>
                </at-dropdown-menu>
              </at-dropdown>
            </div>
            <div>
              {{description}}
              <div class="row flex-between" style="margin-top:20px;">
                <at-button type="success" @click="rewind(id,StatusId)"><i class="icon icon-chevron-left"></i></at-button>
                <at-button type="error" disabled><i class="icon icon-chevron-right"></at-button>
              </div>
            </div>
        </at-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data : () => {
    return {
      task : [],
    }
  },
  methods : {
    changePage (event) {
      this.$emit('changePage',event)
    },
    edit (data) {
      this.$emit('edited',data)
      this.changePage('edit')
    },
    deleted (id) {
      this.start()
      axios({
        url : "http://localhost:3000/kanban/" +id,
        method: "delete",
        headers: {
          token : localStorage.token
        }
      })
        .then(data => {
          this.finish()
          this.fetch()
          this.open('delete success', 'success')
        })
        .catch(err => {
          this.error()
          this.open('delete faild', 'warning')
        })
    },
    fetch () {
      this.start()
      axios({
        url : "http://localhost:3000/",
        method : "get",
        headers : {
          token : localStorage.token
        }
      })
        .then(({data}) => {
          this.finish()
          this.task = data
        })
        .catch(err => {
          this.error()
        })
    },
    foward (id,StatusId) {
        StatusId++
        axios({
        url: "http://localhost:3000/kanban/" + id,
        method : "patch",
        headers  : {
          token : localStorage.token
        },
        data : {
          StatusId
        }
      })
        .then(data => {
          this.fetch()
        })
        .catch(err => {
          console.log(err)
        })
    },
    rewind (id,StatusId) {
        StatusId--
        axios({
        url: "http://localhost:3000/kanban/" + id,
        method : "patch",
        headers  : {
          token : localStorage.token
        },
        data : {
          StatusId
        }
      })
        .then(data => {
          console.log("JALAN GAN")
          this.fetch()
        })
        .catch(err => {
          console.log(err)
        })
    },
    start () {
      this.$Loading.start()
    },
    finish () {
      this.$Loading.finish()
    },
    error () {
      this.$Loading.error()
    },
    open (title,type) {
      this.$Notify({
        title,
        type
      })
    }
  },
  computed : {
    backlog () {
      const data = this.task.filter(el => el.StatusId =='1')
      return data
    },
    Todo () {
      const data = this.task.filter(el => el.StatusId =='2')
      return data
    },
    Doing () {
      const data = this.task.filter(el => el.StatusId =='3')
      return data
    },
    done () {
      const data = this.task.filter(el => el.StatusId == '4')
      return data
    }
  },
  created () {
    if(!localStorage.token) {
      this.changePage('login')
    }else{
      this.fetch()
    }
  }
}
</script>

<style>
  .title {
    margin-top: 60px;
    margin-bottom: 30px;
    border: 1px;
    border-style: none;
  }
</style>