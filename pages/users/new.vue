<template>
  <div>
    <div class="nuxtMainPanel">
      <div class="pd20">
        <vue-form :fields="fields"
        mode="new"
        model="user"
        api-url="/api/users/"
        ref="vueForm"></vue-form>
      </div>
    </div>
    <div id="footerBar">
      <nuxt-link class="ftBt" to="/users/list"><i class="icon-chevron-thin-left"></i> 返回</nuxt-link>
      <div class="ftBt"  @click="addNewUser()">確定</div>
    </div>
  </div>
</template>

<script>
import VueForm from '../../components/VueForm'
// fields definition
var tableColumns = [
  {
    name: 'name',
    type: 'string',
    title: '姓名'
  },
  {
    name: 'email',
    type: 'string',
    title: '電子郵件'
  },
  {
    name: 'account',
    type: 'string',
    title: '帳號'
  },
  {
    name: 'phone',
    type: 'string',
    title: '電話'
  },
  {
    name: 'mobile',
    type: 'string',
    title: '行動'
  }
]

export default {
  created () {
    this.$store.dispatch('setIsTitle', {
      is_title: "新增帳號"
    })
  },
  name: 'users',
  components: {
    VueForm
  },
  data () {
    return {
      pagetitle: "tableColumns",
      fields: tableColumns
    }
  },
  methods: {
    addNewUser (id) {
      this.$refs.vueForm.AddNewUser()
    }
  }
}
</script>
