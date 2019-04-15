# yu-vue

*本模块是vue插件：主要收集.vue组件*

### 安装
```
cnpm install yu-vue --save
```

### 使用
**falls组件：瀑布流布局**
```
//vue的入口文件main.js
import Vue from 'vue';
import yu from 'yu-vue';   //引入
Vue.use(yu);              //使用插件

//app.vue
<template>
    <div id="app">
        //imgs是图片路径数组, padding是单张图片的css内填充
        <falls :imgs="imgs" padding="10"></falls>
    </div>
</template>
<script>
    export default {
        name:'app',
        data(){
            return {
                imgs:[ require('图片路径1'), require('图片路径2'), require('图片路径3') ]
            }
        }
    }
</script>
```
