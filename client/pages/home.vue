<template>
  <section class="container">
    <div class="wrapper">
      
      <!-- 内容 -->
      <div class="home-contain">
        <nuxt/>
      </div>

      <!-- 新增按钮 -->
      <md-speed-dial class="md-bottom-right" md-event="click" >
        <md-speed-dial-target @click.native="showHabit">
          <md-icon>add</md-icon>
        </md-speed-dial-target>
      </md-speed-dial>

      <!-- 底部导航栏 -->
      <md-bottom-bar
      >
        <md-bottom-bar-item
          md-label="我的微习惯"
          md-icon="home"
          @click.native="routerChange('/home/myHabbit')"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          md-label="个人中心"
          md-icon="perm_identity"
          @click.native="routerChange('/home/personCenter')"
        ></md-bottom-bar-item>
      </md-bottom-bar>

      <!-- 新增习惯弹框 -->
      <md-dialog :md-active.sync="showDialog" :md-fullscreen="false">
        <md-dialog-title>新增习惯</md-dialog-title>
        <md-dialog-content>
          <form class="add-form" data-vv-scope="addForm">

            <md-field :class="{'md-invalid': errors.has('addForm.title')}">
              <label>标题</label>
              <md-input v-validate="'required|min:1|max:24'" v-model.trim="addForm.title" name="title" />
              <span v-show="errors.has('addForm.title')" class="md-error">标题输入有误!</span>
            </md-field>

            <md-field :class="{'md-invalid': errors.has('addForm.desc')}">
              <label>描述</label>
              <md-textarea v-validate="'required|min:1|max:500'" v-model.trim="addForm.desc" name="desc" md-autogrow md-counter="500"></md-textarea>
              <span v-show="errors.has('addForm.desc')" class="md-error">描述输入有误!</span>
            </md-field>

            <md-field :class="{'md-invalid': errors.has('addForm.period')}">
              <label>周期</label>
              <md-input v-validate="'required|numeric|between:25,60'" v-model.number="addForm.period" type="number" name="period" />
              <span v-show="errors.has('addForm.period')" class="md-error">周期输入有误!</span>
            </md-field>

            <md-field :class="{'md-invalid': errors.has('addForm.remark')}">
              <label>备注</label>
              <md-textarea v-validate="'max:500'" v-model.trim="addForm.remark" name="remark" md-autogrow md-counter="500"></md-textarea>
              <span v-show="errors.has('addForm.remark')" class="md-error">长度输入有误!</span>
            </md-field>

          </form>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">关闭</md-button>
          <md-button class="md-primary" @click.native="sbHabit">确定</md-button>
        </md-dialog-actions>
      </md-dialog>

    </div>
  </section>
</template>

<script>
import { getAllHabit, postHabit } from '~/api/user'
import { showToast  } from '~/components/toast'

export default {
  data: () => ({
    showDialog:false,
    addForm: {
      title: '',
      desc: '',
      period: 25,
      remark: ''
    }
  }),
  methods: {
    routerChange(path,query){
      this.$router.push({
        path,
        query: query
      });
    },
    showHabit(){
      this.showDialog = true;
    },
    sbHabit(){
      this.$validator.validateAll('addForm').then(result => {
        if (!result) {
          return
        }
        postHabit(this.addForm).then(res => {
          if (!res.error_code) {
            this.showDialog = false;
            showToast('新增习惯成功');
            this.getList();
          } else {
            showToast('新增习惯失败');
          }
        })
      })
    },
    
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper {
    width: 100vw;
    height: 100vh;
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
    .md-speed-dial.md-bottom-right{
      bottom: 85px;
    }
    .home-contain{
      position: absolute;
      top: 0;
      left: 0;
      height: calc(100% - 56px);
      width: 100%;
      overflow-y: scroll;
      padding: 4px;
      .md-card {
        width: 100%;
        display: inline-block;
        vertical-align: top;
      }
    }
    
  }
</style>
