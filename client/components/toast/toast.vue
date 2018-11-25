<template>
  <div class="wrap" v-if="show">{{text}}</div>
</template>

<script>
// import { login  } from '~/api/user'

// export default {
//   components: {},
//   data() {
//     return {
//       loginForm: {
//         type: 100,
//         nickname: '',
//         account: '',
//         secret: ''
//       },
//     }
//   },
// }
// </script>
<style scoped>
  .wrap {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    top: 0;
    font-size: 16px;
    background: rgba(233, 85, 82, .9);
    /*padding: 10px;*/
    color: #fff;
  }
</style>