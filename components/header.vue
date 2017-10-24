<template>
  <div class="nav-list">
    <nuxt-link class="button" to="/" >Homepage</nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    place: {
      get: function () {
        return $store.state.place
      },
      set: function (val) {
        this.$store.dispatch('setPlace', val)
      }
    },
    year: {
      get: function () {
        return $store.state.year
      },
      set: function (val) {
        this.$store.dispatch('setYear', val)
      }
    }
  },
  methods: {
    getYearPlaceId () {
      this.$store.dispatch('getYearPlaceId', {
        place: this.$store.state.place,
        year: this.$store.state.year
      })
    }
  }
  // ,
  // data () {
  //   return {
  //     xaxio: ['一月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '二月', '十二月'],
  //     yaxio: ['經常門', '資本門']
  //   }
  // }
}
</script>

<style>
  .nav-list{
    background-color: #BDEEFF;
  }
</style>
