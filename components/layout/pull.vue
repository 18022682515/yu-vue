<template>
<div class="pull">
    <div class="box" @touchstart="start" @touchend="end" :style="{ transform:`translateY(${offsetY}px)` }">
        <div class="down">
            <div class="icon">
                <yu-arrows-down v-if="offsetY<50"></yu-arrows-down>
                <yu-load v-else-if="offsetY==50"></yu-load>
                <yu-arrows-up v-else></yu-arrows-up>
            </div>
            {{downText}}
        </div>
        <slot></slot>
        <div v-if="getType(upCount)!=='Number'?false:true" class="up">
            <div class="icon">
                <yu-load v-if="offsetY==-height"></yu-load>
                <yu-arrows-up v-else></yu-arrows-up>
            </div>
            {{upText}}
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import { getType } from 'yu-util';

export default {
    name:"pull",
    props:{
        downCount:{
            type:[Number,Boolean],
            default:false
        },
        upCount:{
            type:[Number,Boolean],
            default:false
        }
    },
    data(){
        return {
            x:0,
            y:0,
            count:0,
            height:0,
            offsetY:0,
            speeds:[],
            bool:false,
            time:0,
            run:false,
            downText:"下拉刷新",
            upText:"上拉加载",
            last:0
        }
    },
    watch:{
        downCount(n,o){
            this.homing(-40,0);
            Vue.nextTick(()=>{
                this.height = this.$el.querySelector('.box').offsetHeight - this.$el.offsetHeight;
            });
        },
        upCount(n,o){
            Vue.nextTick(()=>{
                this.height = this.$el.querySelector('.box').offsetHeight - this.$el.offsetHeight;
            });
        },
        offsetY(n,o){
            if(n===50){
                this.$emit('pull-down',{ sum: this.$slots.default.length });
                this.downText = "加载中";
            }else if(n<50){
                this.downText = "下拉刷新";
            }else{
                this.downText = "释放更新";
            }
            if(n<=-this.height){
                this.upText = "加载中";
                if(Date.now()-this.last>1000){
                    this.$emit('pull-up',{ sum:this.$slots.default.length });
                    this.last = Date.now();
                }
            }else{
                this.upText = "上拉加载";
            }
            this.offsetY = n<-this.height ? -this.height : n;
        }
    },
    methods:{
        getType,
        cancel(){
            this.run = true;
            document.body.removeEventListener('touchmove',this.move);
        },
        move(e){
            let x = e.changedTouches[0].clientX;
            let y = e.changedTouches[0].clientY;
            let valX = x-this.x;
            let val = y-this.y;
            this.count++;
            if(this.count===1 && Math.abs(valX)>Math.abs(val)){
                this.cancel();
                return;
            }
            if(this.offsetY>0 && val>0){
                this.offsetY += val/5;
            }else{
                this.offsetY += val;
            }
            if( !((val>0 && this.speeds[0]>0) || (val<0 && this.speeds[0]<0)) ){
                this.speeds.splice(0);
            }
            this.speeds.push(val);
            this.y = y;
            this.time = Date.now();
            this.bool = false;
        },
        start(e){
            this.bool = true;
            this.run = false;
            this.count = 0;
            this.speeds.splice(0);
            this.x = e.changedTouches[0].clientX;
            this.y = e.changedTouches[0].clientY;
            document.body.addEventListener('touchmove',this.move);
        },
        end(e){
            document.body.removeEventListener('touchmove',this.move);
            if(this.speeds.length<1 || Date.now()-this.time>10){
                if(this.offsetY<=0){
                    return;
                }
                if(this.offsetY>50){
                    this.homing(-40,50);
                }else{
                    this.homing(-40,0);
                }
                return;
            }
            let speed = this.speeds.reduce((sum,val)=>sum+val)/this.speeds.length;
            let _this = this;
            (function fn(){
                _this.offsetY += speed/4;
                speed = speed*0.99;
                console.log(speed);
                if(_this.bool || Math.abs(speed)<0.5 || _this.offsetY>0 || _this.offsetY<=-_this.height){
                    if(_this.offsetY<=0) return;
                    if(_this.offsetY>50){
                        _this.homing(-40,50);
                    }else{
                        _this.homing(-40,0);
                    }
                    return;
                }
                setTimeout(fn,0);
            })();
        },
        homing(speed,target){
            let _this = this;
            (function fn(){
                _this.offsetY += speed/20;
                if(_this.offsetY<=target){
                    _this.offsetY = target;
                    return;
                }
                setTimeout(fn,0);
            })();
        }
    },
    mounted(){
        this.height = this.$el.querySelector('.box').offsetHeight - this.$el.offsetHeight;
    }
}
</script>

<style lang="less" scoped>
.pull{
    height:100%;
    overflow-y: hidden;
    background: #EEE;

    .box{
        position: relative;;
        background: #FFF;
        .down{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            transform:translateY(-100%);
            text-align: center;
            &:after{
                content:"";
                display:inline-block;
                vertical-align: middle;
                height:100%;
            }
            .icon{
                display:inline-block;
                vertical-align: middle;
                width:20px;
                height:20px;
                margin:15px 5px;
            }
        }
        .up{
            border-top:1px solid #EEE;
            text-align: center;
            &:after{
                content:"";
                display:inline-block;
                vertical-align: middle;
                height:100%;
            }
            .icon{
                display:inline-block;
                vertical-align: middle;
                width:20px;
                height:20px;
                margin:5px;
            }
        }
    }
}
</style>