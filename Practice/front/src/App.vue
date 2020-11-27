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
        <button type="button" class="layui-btn">点击登录</button>
        <a href="http://www.layui.com" class="imooc-link">忘记密码</a>
      </form>
    </div>
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
      axios.get("http://localhost:3001/getCaptcha").then((res) => {
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
