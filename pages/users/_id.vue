<template>
  <div>
    <div class="nuxtMainPanel">
      <section class="container">
        <h1>XXXX</h1>
        <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
        <h1 class="title">
          User
        </h1>
        <h2 class="info">
          {{ user.name }}
        </h2>
        <nuxt-link class="button" to="/">
          Users
        </nuxt-link>
      </section>
    </div>
    <div id="footerBar">
      <nuxt-link class="ftBt" to="/"><i class="icon-reply"></i> 返回</nuxt-link>
      <div class="ftBt"  @click="addYear()"><i class="icon-loupe"></i> 新增年度計畫</div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'id',
  asyncData ({ params, error }) {
    return axios.get('/api/users/' + params.id)
      .then((res) => {
        return { user: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },
  head () {
    return {
      title: `User: ${this.user.name}`
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
