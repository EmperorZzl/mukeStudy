<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="title"
              v-model="username"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input
              type="password"
              name="title"
              v-model="password"
              required
              lay-verify="required"
              placeholder="请输入密码"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              v-model="captcha"
              required
              lay-verify="required"
              placeholder="请输入验证码"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div
            class="layui-form-mid svg"
            v-html="svg"
            @click="getCatcha()"
          ></div>
        </div>
        <button type="button" class="layui-btn" @click="checkForm">点击登录</button>
        <router-link :to="{name:'About'}"  class="imooc-link">忘记密码</router-link>
      </form>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'app',
  data() {
    return {
      svg: '',
      username: '',
      password: '',
      captcha: '',
      errorMsg: []
    };
  },
  mounted() {
    this.getCatcha();
  },
  methods: {
    getCatcha() {
      axios.get('http://localhost:3001/getCaptcha').then((res) => {
        if (res.status === 200) {
          const obj = res.data;
          if (obj.code === 200) {
            this.svg = obj.data;
          }
        }
      });
    },
    checkForm() {
      this.errorMsg = [];
      if (!this.username) {
        this.errorMsg.push('用户名为空！');
      }
      if (!this.password) {
        this.errorMsg.push('密码为空');
      }
      if (!this.captcha) {
        this.errorMsg.push('验证码为空');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  width: 190px;
}
.imooc-link {
  margin-left: 10px;
  &:hover {
    color: blue;
  }
}

.svg {
  position: relative;
  top: -15px;
}
</style>
