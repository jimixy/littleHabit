<template>
  <section class="container">
    <md-list v-for="(value,idx) in habitList" :key="value.id" class="md-triple-line md-dense">
      <md-divider v-if="idx!=0" class="md-inset"></md-divider>
      <md-list-item>
        <md-avatar>
          <img :src="'https://placeimg.com/40/40/people/1?t='+value.id" alt="People">
        </md-avatar>
        <div class="md-list-item-text" @click="routerChange('/habbitDetail', { id: value.id })">
          <span>{{ value.title }}</span>
          <span>{{ value.period }}</span>
          <p>{{ value.desc }}</p>
        </div>
        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">play_arrow</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </section>
</template>

<script>
import { getAllHabit, postHabit } from '~/api/user'

export default {
  data: () => ({
    habitList: [],
  }),
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getAllHabit().then(res => {
        if(!res.error_code){
          this.habitList = res.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  
</style>
