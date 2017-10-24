<template>
  <div class="container pd20">
    <div class="containerCenter">
    <!--<h1>Please login to see the secret content</h1>-->
    <form v-if="!$store.state.authUser" @submit.prevent="login" class="form-group">
      <p class="error" v-if="formError">{{ formError }}</p>
      <!--<p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>-->
      <label>Username<el-input type="text" v-model="formUsername" name="username" ></el-input></label>
      <label>Password<el-input type="password" v-model="formPassword" name="password" ></el-input></label>
      <el-button type="submit">登入</el-button>
    </form>
    <div v-else>
      {{ $store.state.authUser.username }} 您好!
      <p>I am the secret content, I am shown only when the use is connected.</p>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <el-button @click="logout">登出</el-button>
    </div>
    <p><nuxt-link to="/secret">Super secret page</nuxt-link></p>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "管理首頁"
    })
  },
  data () {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        username: this.formUsername,
        password: this.formPassword
      }).then(() => {
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      }).catch((e) => {
        this.formError = e.message
      })
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
  /*background-color: #456;*/
  h1{
    color: #32C9FF;
    /*transform: rotate(30deg);*/
  }
}
.error {
  color: red;
}
.containerCenter{
  max-width: 280px;
  margin: 0 auto;
}
.el-select {
  width: 100%;
}
.form-group{
  label{
    color: #939DAF;
    display: block;
    padding: 6px 0 6px 0;
    font-size: 15px;
  }
}
.form-group {
  margin-bottom: 0.5rem;
}
</style>
