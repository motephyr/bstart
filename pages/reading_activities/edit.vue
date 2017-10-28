<template>
  <div>
    <table class="gTable sminputW80">
      <!--<colgroup>-->
        <!--<col style="background-color:red">-->
      <!--</colgroup>-->
      <tbody>
      <tr v-for="(x, ix) in reading_activities_edit.xaxio" :key="x.id">
        <td>{{x.value}}<el-button @click="showHide(x.id)">Show/Hide</el-button></td>
      </tr>
      </tbody>
    </table>
    <el-button @click="add('reading_activities_1')">Add</el-button>
    <el-input type="text" v-model="xaxio_name"></el-input>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  props: ['reading_activities_edit'],
  data () {
    return {
      reading_activities_1: {
        xaxio: [],
        yaxio: [],
        value: []
      },
      xaxio_name: ''
    }
  },
  methods: {
    add (name) {
      axios.post('/api/table_field_xs/' + name, {xaxio_name: this.xaxio_name, year: this.$store.state.year}).then((res) => {
        this.$router.replace('/reading_activities?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    },
    showHide (id) {
//      axios.patch('/api/table_field_xs/' + id).then((res) => {
      axios.patch('/api/table_field_xs/showHide/' + id).then((res) => {
        this.$router.replace('/reading_activities?' + Math.random())
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
