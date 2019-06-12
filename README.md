# yu-vue

*本模块是vue插件：主要收集.vue组件*

### 安装
```
cnpm install yu-vue --save
```

### 入口文件main.js引入插件
```javascript
import Vue from 'vue';
import yu from 'yu-vue';   
Vue.use(yu);              //引入
```

### 扩展Vue的静态函数，作用：一个vue组件替换一个dom元素
```javascript
//比如：xxx.html里有一个id为'slide'的div，用vue组件直接替换它
<div id="slide"></div>

//Vue.mount('元素选择器','组件名'|组件对象,props对象);
import vSlide from '路径/slide.vue';
Vue.mount('#slide',vSlide，{ imgs:[require('图片1')], slideWidth:"300px",interval:2000 });

//或者直接引用插件里的vue组件名，比如引用本插件里的其中一个组件yu-slide
Vue.mount('#slide','yu-slide'，{ imgs:[require('图片1')], slideWidth:"300px",interval:2000 });
```

### 插件包含的组件：yu-slide, yu-falls, yu-my-transition, yu-num-list

### 使用插件：
**轮播图：yu-slide组件**
```html
//*.vue
<template>
    <div id="*">
        <!-- imgs是图片路径数组，slideWidth是轮播图的宽度，interval是轮播的间隔毫秒 -->
        <yu-slide :imgs="imgs" slideWidth="300px" :interval="2000"></yu-slide>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgs:[ require('图片1'), require('图片2'), require('图片3'), …… ]
            }
        }
    }
</script>
```
**瀑布流布局: yu-falls组件**
```html
//*.vue
<template>
    <div id="*">
        <!-- imgs是图片路径数组, padding是单张图片的css内填充 -->
        <yu-falls :imgs="imgs" :padding="10"></yu-falls>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imgs:[ require('图片1'), require('图片2'), require('图片3'), …… ]
            }
        }
    }
</script>
```
### 数字排列： yu-num-list组件
```html
//*.vue
<template>
    <div id="*">
        <yu-num-list></yu-num-list>
    </div>
</template>
```