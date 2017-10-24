<template>
  <div>
  <div class="containerCenter">
    <div class="alert alert-success" transition="success" v-if="success">Update successful.</div>
    <div v-if="mode == 'new' || mode == 'show' || mode == 'edit'">
      <div class="alert alert-danger" v-if="!isValid">
        <ul>
          <li v-show="!validation.name">Name field is required.</li>
          <li v-show="!validation.email">Input a valid email address.</li>
          <li v-show="!validation.address">Address field is required.</li>
        </ul>
      </div>
      <form action="#" @submit.prevent="AddNewUser" method="POST">
        <div class="form-group" v-for="field in fields">
          <div v-if="mode == 'show'" >
            <label :for="field.name">{{field.title || field.name}}</label>
            <el-input v-if="field.type == 'integer'" v-model="newObj[field.name]" type="number" :id="field.name" :name="field.name" disabled="true" ></el-input>
            <el-input v-if="field.type == 'boolean'" v-model="newObj[field.name]" type="checkbox" :id="field.name" disabled="true" ></el-input>
            <el-input v-if="!(field.type == 'integer' || field.type == 'boolean')" v-model="newObj[field.name]" type="text" :id="field.name" :name="field.name" disabled="true" ></el-input>
          </div>
          <div v-else>
            <div v-if="!(field.name === 'id' || field.name === 'created_at' || field.name === 'updated_at')">
              <label :for="field.name">{{field.title || field.name}}</label>
              <el-input v-if="field.type == 'integer'" v-model="newObj[field.name]" type="number" :id="field.name" :name="field.name" ></el-input>
              <el-input v-if="field.type == 'boolean'" v-model="newObj[field.name]" type="checkbox" :id="field.name" ></el-input>
              <el-input v-if="!(field.type == 'integer' || field.type == 'boolean' )" v-model="newObj[field.name]" type="text" :id="field.name" :name="field.name" ></el-input>
            </div>
          </div>
        </div>
        {{'http://localhost:3000/forgot-password/'+ newObj['pwdResetToken']}}
        <el-select v-model="newObj['area']" placeholder="各縣市單位" @change="change">
          <el-option
                  v-for="item in placeAs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
          </el-option>
        </el-select>
        <!-- <div class="form-group">
          <el-button :disabled="!isValid" class="button" type="submit" v-if="mode == 'new'">Add New {{model}}</el-button>
          <el-button :disabled="!isValid" class="button" type="submit" v-if="mode == 'edit'" @click="UpdateUser(newObj.id)">Edit {{model}}</el-button>
        </div> -->
      </form>
      <!-- <el-button class="button" @click="setMode('index')">返回</el-button> -->
    </div>
  </div>
  </div>
</template>
<script>
import moment from 'moment'
import axios from '~/plugins/axios'

export default {
  name: 'vue-form',
  props: {
    mode: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    model: {
      required: true,
      type: String,
      default: null
    },
    apiUrl: {
      type: String,
      required: true
    },
    isPagination: {
      type: String,
      default: 'false'
    },
    httpOptions: {
      type: Object,
      default: function() {
        return {}
      }
    },
    appendParams: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data () {
    return {
      newObj: {},
      comFields: [],

      success: false,

      paginationPath: '',
      dataPath: '',
      searchForColumn: '',
      searchFor: '',
      placeAs: [{
        value: '0',
        label: '中央'
      }, {
        value: '1',
        label: '基隆市'
      }, {
        value: '2',
        label: '台北市'
      }, {
        value: '3',
        label: '新北市'
      }, {
        value: '4',
        label: '桃園市'
      }, {
        value: '5',
        label: '新竹市'
      },{
        value: '6',
        label: '新竹縣'
      }, {
        value: '7',
        label: '苗栗縣'
      }, {
        value: '8',
        label: '台中市'
      }, {
        value: '9',
        label: '南投縣市'
      }, {
        value: '10',
        label: '彰化縣市'
      }, {
        value: '11',
        label: '雲林縣市'
      }, {
        value: '12',
        label: '嘉義市'
      }, {
        value: '13',
        label: '嘉義縣'
      }, {
        value: '14',
        label: '台南市'
      }, {
        value: '15',
        label: '高雄市'
      },{
        value: '16',
        label: '屏東縣市'
      }, {
        value: '17',
        label: '台東縣市'
      }, {
        value: '18',
        label: '花蓮縣市'
      }, {
        value: '19',
        label: '宜蘭縣市'
      }, {
        value: '20',
        label: '澎湖縣'
      }, {
        value: '21',
        label: '金門縣'
      }, {
        value: '22',
        label: '連江縣'
      }]
    }
  },
  methods: {
    change: function(value) {
      this.newObj['area'] = value
    },
    formatDate: function (value, fmt) {
      if (value == null) return ''
      fmt = (typeof fmt === 'undefined') ? 'D MMM YYYY' : fmt
      return moment(value).format(fmt)
    },
    transToImage: function (value) {
      if (value) return '<img src="' + value + '"/>'
      return value
    },
    setMode: function (mode) {
      //this.mode = mode
      this.$router.replace('/users/list?' + Math.random())
    },

    fetchUser: function () {
      if (this.mode !== 'new') {
        var self = this
        axios.get(this.apiUrl).then((res) => {
          self.newObj = res.data

          if (this.isPagination === 'true') {
            this.dataPath = 'collection'
            this.paginationPath = 'pagination'
          }
        })
      }
    },

    RemoveUser: function (id) {
      var ConfirmBox = window.confirm('Are you sure, you want to delete this ' + this.model + '?')

      if (ConfirmBox) {
        const self = this
        axios.delete(this.apiUrl, this.httpOptions).then(() => {
          self.success = true
          self.setMode('')
          setTimeout(() => {
            self.setMode('index')
            self.success = false
          }, 1000)
        })
      }
    },

    UpdateUser: function (id) {
      var user = this.newObj
      var self = this
      axios.patch(this.apiUrl + id, user, this.httpOptions).then((data) => {
        self.newObj = data.body
        this.$router.replace('/')

        // self.setMode('show')
      })
    },

    ShowUser: function (id, callback) {
      var self = this
      axios.get(this.apiUrl + id).then((data) => {
        self.newObj = data.body
        callback()
      })
    },

    AddNewUser: function () {
      // User input
      var user = this.newObj

      // Send post request
      var self = this

      axios.post(this.apiUrl, user).then((data) => {
        // Clear form input
        self.newObj = {}

        // Show success message
        self.success = true
        setTimeout(() => {
          self.success = false
        }, 1000)
      }).then(() => {
        // Reload page
        self.setMode('index')
      })
    },
    setFilter: function () {
      this.appendParams = {
        'filter_column': this.searchForColumn,
        'filter': this.searchFor
      }
      this.$nextTick(function () {
      })
    },
    resetFilter: function () {
      this.searchFor = ''
      this.setFilter()
    },
    onCellClicked (data, field, event) {
      console.log('cellClicked: ', field.name)
    }
  },
  computed: {
    validation: function () {
      return {
        // name: !!this.newObj.name.trim(),
        // email: emailRE.test(this.newObj.email),
        // address: !!this.newObj.address.trim()
      }
    },

    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every((key) => {
        return validation[key]
      })
    }
  },
  created: function () {
    this.fetchUser()
    if (this.fields !== undefined) {
      this.comFields = Object.assign([], this.fields)
      this.comFields.push({
        name: 'created_at',
        title: '建立時間',
        type: 'datetime',
        callback: 'formatDate|Y/MM/D'
      })
      this.comFields.push({
        name: 'updated_at',
        title: '修改時間',
        type: 'datetime',
        callback: 'formatDate|Y/MM/D'
      })

      this.comFields.push({
        name: '__component:custom-actions'
      })
    }
  }
}
</script>
<style>
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
  /*.page-enter-active, .page-leave-active {*/
    /*transition: all .1s;*/
  /*}*/
  /*.page-enter, .page-leave-active {*/
    /*opacity: 1;*/
    /*transform: translateX(0);*/
  /*}*/
</style>