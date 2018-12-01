<template>
  <section class="container">
    <div class="wrapper">
      <div class="tc footer w80">
        <md-button
          class="md-raised md-primary w100 mg0"
          @click.prevent="getList"
        >测试</md-button>
      </div>

      <div class="phone-viewport">
        <md-bottom-bar md-type="shift">
          <md-bottom-bar-item id="bottom-bar-item-home" md-label="Home" md-icon="home"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-pages" md-label="Pages" md-icon="pages"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-posts" md-label="Posts" md-icon="/assets/icon-whatshot.svg"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-favorites" md-label="Favorites" md-icon="favorite"></md-bottom-bar-item>
        </md-bottom-bar>
      </div>

      <!-- <md-bottom-bar
        class="md-accent"
        md-type="shift"
        @md-changed="checkNewPosts"
      >
        <md-bottom-bar-item
          md-label="Home"
          md-icon="home"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          md-label="Pages"
          md-icon="pages"
        ></md-bottom-bar-item>

        <md-bottom-bar-item
          id="item-posts"
          @click="clearNewPosts"
        >
          <md-icon
            class="md-bottom-bar-icon"
            md-src="/assets/icon-whatshot.svg"
          ></md-icon>
          <span class="md-bottom-bar-label">Posts</span>
          <i
            v-if="newPosts"
            class="badge"
          >{{ newPosts }}</i>
        </md-bottom-bar-item>

        <md-bottom-bar-item
          md-label="Favorites"
          md-icon="favorite"
        ></md-bottom-bar-item>
      </md-bottom-bar> -->

    </div>

  </section>
</template>

<script>
import { getAllHabit } from '~/api/user'

export default {
  data: () => ({
    newPosts: 0,
    checkInterval: null
  }),
  created() {
    this.getList()
  },
  methods: {
    clearCheckPosts() {
      window.clearInterval(this.checkInterval)
      this.checkInterval = null
    },
    clearNewPosts() {
      this.clearCheckPosts()
      this.newPosts = 0
    },
    checkNewPosts(activeItem) {
      if (activeItem !== 'item-posts' && !this.checkInterval) {
        this.checkInterval = window.setInterval(() => {
          if (this.newPosts === 99) {
            this.newPosts = '99+'
            this.clearCheckPosts()
          } else {
            this.newPosts++
          }
        }, 1000)
      }
    },
    getList() {
      getAllHabit().then(res => {
        console.log('getAllHabit', res)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .phone-viewport {
    width: 322px;
    height: 200px;
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
  }
</style>
