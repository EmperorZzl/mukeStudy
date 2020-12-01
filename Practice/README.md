# 实践 社区功能

## 登录模块

- [session和Token验证的区别](https://blog.csdn.net/whl190412/article/details/90024671)
- [session和Token验证的区别2](https://www.cnblogs.com/eret9616/p/9661314.html)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125152735855.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125153510603.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201125153633807.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

## 创建工程

- vue create front
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127104746357.png#pic_center)
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127104851345.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127104930244.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127105009408.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127105050727.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127105137967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)
- ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127105218734.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3poYW9zdHJvbmc=,size_16,color_FFFFFF,t_70#pic_center)

- 进入项目目录 cd front
- 打开public index.html  通过link标签 加入layui的样式

```javascript
 <link rel="stylesheet" href="https://www.layuicdn.com/layui/css/layui.css">
  </link>
```

- 修改app.vue

## 记录问题

- 在创建好了vue项目之后，用vscode打开，默认情况下vscode 不支持.vue文件的，所以需要安装**Vetur**插件。
- 安装完成之后运行yarn serve 一切正常，但是当修改文件之后，在格式化代码，发现每次格式化代码完之后，} 后面会追加逗号, 在运行yarn serve 则报错。原因是与eslint 冲突。需要在配置下Vetur 插件如下：
  - 打开首选项——设置——找到settings.json 添加如下代码：
  
  ```javascript
    "vetur.format.defaultFormatterOptions": {
    // "js-beautify-html": {
    //   // #vue组件中html代码格式化样式
    //   "wrap_attributes": "force-aligned", //也可以设置为“auto”，效果会不一样
    //   "wrap_line_length": 200,
    //   "end_with_newline": false,
    //   "semi": true,
    //   "singleQuote": true
    // },
    "prettier": {
      //设置分号
      "semi": true,
      //双引号变成单引号
      "singleQuote": true,
      //禁止随时添加逗号,这个很重要。找了好久
      "trailingComma": false
    }
  },

  ```

  - 需要等一段时间才会生效，估计几分钟，之后在格式化就不会自动添加逗号到末尾的}后。
  - 另外这个 js-beautify-html 是美化工具
  - VeeValidate 表单校验工具
