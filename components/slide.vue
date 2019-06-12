<template>
    <div class="slide" :style="{ width:slideWidth }" @mouseout="runTimer" @mouseover="stopTimer">
        <div class="box" :style="{ width:boxWidth+'px', marginLeft:left+'px', transition:transition }">
            <div class="img-box" v-for="(img,i) in slideImg" :key="i" :style="{ width:imgWidth+'px' }">
                <img :src="img" alt="" width="100%">
            </div>
        </div>
        <div class="btn-group">
            <span @click="up">←</span>
            <span @click="down">→</span>
        </div>
        <ul class="dot">
            <li :style="{padding:imgWidth/50+'px'}" v-for="(v,i) in imgs.length" :class="{active:i+1==offsetIndex}" @mousemove="over(i+1)">
                <p :style="{width:imgWidth/50+'px',height:imgWidth/50+'px'}"></p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'slide',
        props:{
            imgs:{
                type: Array,
                required: true,
            },
            slideWidth:{
                type: String,
                default: '100%',
            },
            interval:{
                type: Number,
                default: 2500,
            },
        },
        data() {
            return {
                left:0,
                imgWidth:0,
                bool:false,
                timer:null,
                offsetIndex:1,
                transition:'none'
            }
        },
        computed: {
            slideImg: function() {
                return [ this.imgs[this.imgs.length-1], ...this.imgs, this.imgs[0] ];
            },
            boxWidth: function() {
                return this.imgWidth*this.slideImg.length;
            }
        },
        methods:{
            up(){
                if(this.bool) return;
                this.bool = true;
                this.ani(200);
                this.left += this.imgWidth;
                this.getIndex();
            },
            down(){
                if(this.bool) return;
                this.bool = true;
                this.ani(200);
                this.left -= this.imgWidth;
                this.getIndex();
            },
            getIndex(){
                let i = Math.round(Math.abs(this.left/this.imgWidth));
                this.offsetIndex = i==0? this.imgs.length : (i==this.slideImg.length-1 ? 1 : i);
            },
            over(i){
                if(this.bool) return;
                this.bool = true;
                this.ani(200);
                this.left = -this.imgWidth*i;
                this.offsetIndex = i;
            },
            ani(duration=500){
                this.transition = `all ${duration/1000}s`;
                setTimeout(()=>{
                    this.transition = '';
                    this.left = this.left >= 0 ? -this.imgWidth*this.imgs.length : this.left;
                    this.left = this.left <= -this.imgWidth*(this.slideImg.length-1) ? -this.imgWidth : this.left;
                    this.bool = false;
                },duration);
            },
            runTimer(){
                this.timer = setInterval(()=>{
                    this.ani();
                    this.left -= this.imgWidth;
                    this.getIndex();
                },this.interval);
            },
            stopTimer(){
                clearInterval(this.timer);
            }
        },
        mounted(){
            this.imgWidth = this.$el.offsetWidth;
            this.left = -this.imgWidth;
            this.runTimer();
        }
    }
</script>

<style lang='less' scoped>
.slide{
    position:relative;
    margin:0 auto;
    box-sizing: border-box;
    overflow-x: hidden;

    &:hover>.btn-group>span{
        background:rgba(0,0,0,.2);
        color:rgba(255,255,255,1);
    }

    .img-box{
        box-sizing: border-box;
        float:left;
    }
    .btn-group{
        width:100%;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        span{
            padding:10px;
            color:rgba(255,255,255,0);
            
        }
        span:first-child{
            float:left;
            border-radius:0 15px 15px 0;
        }
        span:last-child{
            float:right;
            border-radius:15px 0 0 15px;
        }
    }
    .dot{
        position: absolute;
        left:50%;
        bottom:0;
        transform: translateX(-50%);
        li{
            float:left;
        }
        p{
            background: #fff;
            border-radius: 50%;
        }
        .active>p{
            background:#f00;
        }
    }
}

</style>