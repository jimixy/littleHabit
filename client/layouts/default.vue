<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import Vue from 'vue';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-design-icons/iconfont/material-icons.css'

import VeeValidate from 'vee-validate'

Vue.use(VueMaterial)
Vue.use(VeeValidate)

export default {
  components: {},
  computed: {},
  methods: {}
}
</script>