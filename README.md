# yu-vue

*pc端vue组件库*

### 安装
```
cnpm install yu-vue --save
```

### 入口文件main.js引入插件
```javascript
import Vue from 'vue';
import Plugin from 'yu-vue';   
Vue.use(new Plugin());              //引入
```



### 引入阿里图标库（支持多色图标）
```javascript
/* 在引入本插件时，传阿里图标项目的symbol地址 */
Vue.use(new Plugin('//at.alicdn.com/t/font_1139100_rlq2wt5r6z.js')); 

/* 使用： */
<yu-icon icon="icon-taobao"></yu-icon>
/* "icon-taobao" 是某个图标的名称 */
```



### 图片懒加载：img元素出现在可视区域时才开始加载，兼容ie9
```html
<img v-lazy="src">

src:require('./xxx.jpg')
/* 
如果浏览器不支持IntersectionObserver，则默认启用window的scroll事件；
如果你的根滚动元素不是window,而是id为'#xxx'的元素；
可以在引入本插件时，提供你的根滚动元素id。
该元素也可以是vue组件中的元素，不用担心元素是否已在浏览器渲染的问题。
提供根滚动元素id，举例：Vue.use(new Plugin(),{ root:'#xxx' }) 
*/
```


### 轮播图
```html
<!-- 水平方向 -->
<yu-slide :imgs="imgs" width="300px" ></yu-slide>

imgs:[ require('./1.jpg'), require('./2.jpg') ],  //轮播图片数组
width:"300px"   //轮播窗口的宽度

<!-- 垂直方向 -->
<yu-slide y :imgs="imgs" width="300px"></yu-slide>
```



### vue的过渡动画
```html
<yu-transition name="left" :duration="600">
	<div v-show="show"></div>
</yu-transition>

name:'left'|'right'|'left-right'|'right-left'|'opacity'|'top'|'bottom'|'top-bottom'|'bottom-top', //元素进入和离开的过渡动画
duration:"600"		//过渡动画持续600毫秒，duration的可选值:'300','600','1000','1500','2000','3000','5000','8000'
```



### 组件缓存（封装了keep-alive和transition）
```html
<yu-cache name="left">
	<v-test v-if="show"></v-test>
</yu-cache>

import vTest from './test.vue'
components:{ vTest },
show:true|false		//控制vTest组件激活或停用，会触发vTest的勾子函数activated或deactivated
```



### 路由页面渲染（加了过渡动画的router-view）
```html
<!-- 过渡：left进入和离开 -->
<yu-view transition="left"></yu-view>   

transition:'left'|'right'|'left-right'|'right-left'|'opacity'|'top'|'bottom'|'top-bottom'|'bottom-top', //页面进入和离开的过渡动画

<!-- 如果是命名视图 -->
<yu-view name="a"></yu-view>
name:'a',   //{path:"/",components:{ a:a组件 }},渲染a组件

<!-- 绝对定位占满父元素 -->
<yu-view fill></yu-view>   

<!-- 显示在视图最前面，z-index:1 -->
<yu-view front></yu-view>
```



### 遮罩层(透明黑色)
```html
<yu-shade v-model="show"></yu-shade>

show:true|false
```



### 按钮
```html
<yu-button background="#000" color="#FFF">按钮</yu-button>
```


### 输入框
```html
<yu-input type="text" v-model="value" name="" width="300px"><yu-input>

value:''
```



### 单选框
```html
<yu-radio v-model="item" name="" value="1"><yu-radio>
<yu-radio v-model="item" name="" value="2"><yu-radio>

item:'1'		//当前选中value="1"
```



### 复选框
```html
<yu-checkbox v-model="checked" name="" value="1"><yu-checkbox>
<yu-checkbox v-model="checked" name="" value="2"><yu-checkbox>

checked:['1']		//当前选中value="1"
```