# yu-vue

*vue组件库*

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

### 手机端：侧边栏
```html
//左侧边栏
<yu-left v-model="show" size="50%"></yu-left>
//右侧边栏
<yu-right v-model="show" size="100%"></yu-right>
//上侧边栏
<yu-top v-model="show" size="50%"></yu-top>
//下侧边栏
<yu-bottom v-model="show" size="50%"></yu-bottom>

show:true
```

### 手机端：横向滑动切换页面
```html
<yu-touch-x v-model="index">
    <div class="page1">1</div>
    <div class="page2">2</div>
    <div class="page3">3</div>
    <div class="page4">4</div>
</yu-touch-x>

index:0,  //当前显示页面索引(.page1)
```

### 手机端：纵向滑动切换页面
```html
<yu-touch-y v-model="index">
    <div class="page1">1</div>
    <div class="page2">2</div>
    <div class="page3">3</div>
    <div class="page4">4</div>
</yu-touch-y>

index:0,  //当前显示页面索引(.page1)
```

### 手机端：下拉刷新、上拉加载
```html
<yu-pull @pull-down="downFn" :downCount="downCount" @pull-up="upFn" :upCount="upCount">
    <p>1</p>
    <p>2</p>
    <p>3</p>
    <p>4</p>
</yu-pull>

@pull-down  //当用户下拉刷新时，触发事件
downCount:0,   //用来触发子组件的函数，可以设置为任意不同的数字
downFn(e){
    ajax('/api').then(res=>{
        this.downCount++;   //当后台响应回请求时，设置downCount为任意不同的数字，即会触发子组件的函数。
    });
},

@pull-up    //当用户上拉加载时，触发事件
upCount:0,   //用来触发子组件的函数，可以设置为任意不同的数字
upFn(e){
    ajax('/api').then(res=>{
        this.upCount++;   //当后台响应回请求时，设置upCount为任意不同的数字，即会触发子组件的函数。
    });
}
```

### 导航栏
```html
<yu-nav :options="options"></yu-nav>

options:[ 
    { title:"首页" },
    { title:"a页", menu:[1,2,3,4] },
    { title:"b页", menu:[1,2,3,4] },
    { title:"c页", menu:[1,2,3,4] },
]
//title是每项导航的标题,
//menu是每项导航的下拉菜单
```

### 纵向切换页面
```html
<yu-screen-y v-model="index" height="100%" :ms="2000">
    <div class="screen-1">screen-1</div>
    <div class="screen-2">screen-2</div>
    <div class="screen-3">screen-3</div>
</yu-screen-y>

index:1,  //当前显示的屏索引，显示.screen-1
height:'100%|*px',   //屏高度
ms:2000,   //间隔2000毫秒播放下一屏
```

### 立方体轮播图(x轴旋转)
```html
<yu-shape-x :imgs="imgs"></yu-shape-x>

imgs:[ require('./img/1.jpg'),require('./img/2.jpg'),require('./img/3.jpg') ]
```

### 立方体轮播图(y轴旋转)
```html
<yu-shape-y :imgs="imgs"></yu-shape-y>

imgs:[ require('./img/1.jpg'),require('./img/2.jpg'),require('./img/3.jpg') ]
```

### 轮播图
```html
//第一种(无限左右滑动)：
<yu-slide :imgs="imgs" slideWidth="300px" :ms="ms"></yu-slide>

imgs:[ require('图片1'), require('图片2'), require('图片3'), …… ],
slideWidth是轮播图的宽度,
ms:2000,  //轮播间隔时间（毫秒）

//第二种(无限左右滑动，可自定义轮播项)：
<yu-slide-x :ms="ms">
    <div v-for="img in imgs">
        <img :src="img" alt="" width="100%">
    </div>
</yu-slide-x>

ms:2000,  //轮播间隔时间（毫秒）
imgs:[ require('./1.jpg'),require('./2.jpg') ]

//第三种(无限上下滑动，可自定义轮播项)：
<yu-slide-y :ms="ms" height="300px">
    <div v-for="img in imgs">
        <img :src="img" alt="" width="100%">
    </div>
</yu-slide-y>

ms:2000,  //轮播间隔时间（毫秒）
height:'300px',  //轮播项的高度
imgs:[ require('./1.jpg'),require('./2.jpg') ]

//第四种(透明度切换)：：
<yu-slide-opacity :ms="ms">
    <div v-for="img in imgs">
        <img :src="img" alt="" width="100%">
    </div>
</yu-slide-opacity>

ms:2000,  //轮播间隔时间（毫秒）
imgs:[ require('./1.jpg'),require('./2.jpg') ]
```

### 用户注册框
```html
<yu-signin v-model="show" userUrl="/user" svgUrl="/getCaptcha" signinUrl="/signin"></yu-signin>

show:true|false,   //注册框的显示或隐藏
userUrl:服务器端地址,   //验证用户名是否已存在
svgUrl:服务器端地址,    //获取验证码,服务器端响应回的是svg标签
signinUrl:服务器端地址,    //用户填写完，提交到服务器端注册用户名
```

### 用户登录框
```html
<yu-login v-model="obj" userUrl="/user" loginUrl="/login"></yu-login>

obj:{ show:false,user:'' },   //show是登录框是否显示,user是成功验证用户名和密码后返回的用户名
userUrl:服务器端地址,   //验证用户名是否存在
loginUrl:服务器端地址,    //验证用户名和密码是否正确
```

### 日历
```html
<yu-calendar @date-click=""></yu-calendar>

@date-click是点击每日触发事件
```

### 日历（滑动选择）
```html
<yu-slide-calendar v-model="date"></yu-slide-calendar>

date:'2019/7/12'
```

### 图片盒子
```html
<yu-img :img="img" height="300px">
    <div>图片描述</div>
</yu-img>

img:require('./img/1.jpg'),
height 设置图片高度
```

### 图片放大镜
```html
<yu-scale :img="img" :url="url"></yu-scale>

img:require('../img/1.jpg'),  //需要被放大的图片
url:require('../img/lens.png'),  //放大框的背景图片
```

### 滑动选中的选项卡
```html
<yu-tab :titles="titles">
    <div class="content" v-for="title in titles">{{title}}</div>
</yu-tab>

titles:["标题1","标题2","标题3","标题4"],
//注意：.content元素的数量一定要和titles.length相等

```

### 选项卡
```html
<yu-tabs v-model="index">
    <yu-tabs-item value="标题1">
        <p>内容1</p>
        <p>内容2</p>
    </yu-tabs-item>
    <yu-tabs-item value="标题2">
        <p>内容1</p>
        <p>内容2</p>
    </yu-tabs-item>
</yu-tabs>

index:0  //当前选中的选项卡
```

### 文本选项卡
```html
<yu-text-tabs :tabs="tabs"></yu-text-tabs>

tabs:[ 
    { title:'选项1', content:['内容1','内容2'] },
    { title:'选项2', content:['内容1','内容2'] }
]
```

### 下拉菜单
```html
<yu-select :options="options" v-model="value"></yu-select>

options:["选项1","选项2","选项3"],
value:'请选择'
```

### 弹框
```html
<yu-alert text="提示内容" v-model="show"></yu-alert>
text:'内容',    //弹框的提示内容
show:true|false,  //弹框的显示或隐藏

<yu-confirm :content="content" v-model="show" @cancel="" @confirm=""></yu-confirm>
content:{title:'标题',text:'我是内容'},
show:true|false,  //弹窗是否显示
@cancel   //点击弹窗的取消按钮触发事件
@confirm  //点击弹窗的确定按钮触发事件
```

### 折叠面板
```html
<yu-fold title="一级菜单" :open="open">
    <p>1</p>
    <p>2</p>
    <p>3</p>
</yu-fold>

open:true|false,  //是否开启折叠功能，默认true
```

### 进度条
```html
//条状进度条
<yu-progress :percent="percent" color="#0f0" @finish="finish"></yu-progress>

//圆形进度条
<yu-circle :percent="percent" color="#0f0" @finish="finish"></yu-circle>

percent:100,  //当前进度（百分比）
color:'#00f',   //进度条颜色
finish(){}  //进度条达到100时，触发函数
```

### 页码
```html
<yu-page-code v-model="pageCode" :sum="sum"></yu-page-code>

pageCode:1,  //当前页码
sum:22,  //总页数
```

### 按钮
```html
<yu-button color="#abc" @btn-click="">按钮名</yu-button>

color是按钮的背景色
@btn-click是点击按钮触发事件
```

### 输入框
```html
<yu-input type="text" name="user" v-model="value"></yu-input>

value:'输入框中的内容'
```

### 单选框
```html
<yu-radio name="user" value="a" v-model="str">选项1</yu-radio>
<yu-radio name="user" value="b" v-model="str">选项2</yu-radio>

str:"a" //"a"表示选中value值为"a"的选择框
```

### 多选框
```html
<yu-checkbox name="user" value="a" v-model="arr">选项1</yu-checkbox>
<yu-checkbox name="user" value="b" v-model="arr">选项2</yu-checkbox>

arr:["a","b"] //表示选中value值为"a"和"b"的选择框
```

### 本元素出现在可视区域时（包括滚动后），触发事件
```html
<yu-view-box @client-enter="" @client-leave="">
    //子元素
</yu-view-box>

client-enter   //本元素只要出现在可视区域时（包括滚动后），触发事件
client-leave   //本元素离开可视区域时（滚动后才会触发），触发事件
```

### 滚动事件元素（滚动事件、滚动停止事件）
```html
<yu-scroll @scroll="" @scroll-stop="">
    //子元素
</yu-scroll>

scroll  //本元素滚动时，触发事件
scroll-stop  //本元素滚动停止时，触发事件
```

### 文字提示
```html
<yu-hint :show="show" type="left">提示文字</yu-hint>

show:false|true,   //是否显示提示
type:'top|bottom|left|right'   //提示的方向
```

### svg图标动画
```html
<yu-svg>
    <yu-path :duration="1" d="M829.013333 572.544a20.096 20.096 0 0 0-23.338666 16.298667 320.64 320.64 0 0 1-316.16 264.490666c-177.152 0-321.237333-144.085333-321.237334-321.194666A321.066667 321.066667 0 0 1 489.472 210.944a321.28 321.28 0 0 1 316.202667 264.533333 20.181333 20.181333 0 0 0 39.68-7.082666A361.386667 361.386667 0 0 0 489.472 170.666667 361.386667 361.386667 0 0 0 128 532.138667C128 731.477333 290.176 893.610667 489.472 893.610667a360.789333 360.789333 0 0 0 355.84-297.728 20.096 20.096 0 0 0-16.298667-23.338667"></yu-path>
</yu-svg>
```

### 瀑布流布局
```html
<!-- imgs是图片路径数组, padding是单张图片的css内填充 -->
<yu-falls :imgs="imgs" :padding="10"></yu-falls>

imgs:[ require('图片1'), require('图片2'), require('图片3'), …… ]
```

### 数字排列
```html
<yu-num-list></yu-num-list>
```