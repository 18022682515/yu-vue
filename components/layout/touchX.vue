<template>
<div class="touchX">
    <div class="box" @touchstart="start" @touchend="end" :style="{ width,transform:`translateX(${offsetX}px)` }">
        <slot></slot>
    </div>
</div>
</template>

<script>
import { getType } from 'yu-util';
export default {
    name:"touchX",
    props:{
        value:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            length:0,
            x:0,
            y:0,
            offsetX:0,
            time:0,
            timer:null,
            speeds:[],
            bool:false,
            offsetWidth:0,
            meanVal:0,
            count:0
        }
    },
    watch:{
        value(n,o){
            this.homing(50*Math.abs(n-o),n);
        },
        offsetX(n,o){
            let max = -this.meanVal*(this.length-1);
            this.offsetX = n>0 ? 0 : (n<max ? max : n);
        }
    },
    computed:{
        width(){
            let vNodes = this.$slots.default;
            vNodes.forEach(vNode=>{
                vNode.tag && this.length++;
            });
            return 100*this.length+'%';
        }
    },
    methods:{
        cancel(){
            document.body.removeEventListener('touchmove',this.move);
        },
        move(e){
            let x = e.changedTouches[0].clientX;
            let y = e.changedTouches[0].clientY;
            let val = x-this.x;
            let valY = y-this.y;
            this.count++;
            if(this.count===1 && Math.abs(valY)>Math.abs(val)){
                this.cancel();
                return;
            }
            if( !((val>0 && this.speeds[0]>0) || (val<0 && this.speeds[0]<0)) ){
                this.speeds.splice(0);
            }
            this.speeds.push(val);
            this.offsetX += val;
            this.x = x;
            this.time = Date.now();
        },
        start(e){
            this.bool = true;
            clearTimeout(this.timer);
            this.count = 0;
            this.speeds.splice(0);
            this.x = e.changedTouches[0].clientX;
            this.y = e.changedTouches[0].clientY;
            document.body.addEventListener('touchmove',this.move);
        },
        end(e){
            this.bool = false;
            document.body.removeEventListener('touchmove',this.move);
            if(this.speeds.length<1 || Date.now()-this.time>3){
                
                let index = Math.round(Math.abs(this.offsetX/this.meanVal));
                if(index!==this.value){
                    this.$emit('input',index);
                }else{
                    this.homing(50,index);
                }
                return;
            }
            let speed = this.speeds.reduce((sum,val)=>sum+val)/this.speeds.length;
            let _this = this, count = 0,sum = 0;
            let x = this.offsetX%(this.offsetWidth/this.length);
            (function fn(){
                sum += speed/10;
                _this.offsetX += speed/10;
                if(count>60 || _this.bool || Math.abs(x+sum)>_this.offsetWidth/_this.length || sum>Math.abs(x)){
                    let index = Math.round(Math.abs(_this.offsetX/_this.meanVal));
                    if(index!==_this.value){
                        _this.$emit('input',index);
                    }else{
                        _this.homing(50,index);
                    }
                    return;
                }
                count++;
                setTimeout(fn,0);
            })();
        },
        homing(speed,index){
            clearTimeout(this.timer);
            index = getType(index)==='Number' ? index : Math.round(Math.abs(this.offsetX/this.meanVal));
            let target = -index*this.meanVal;
            speed = Math.abs(speed);
            speed = target>this.offsetX ? speed : -speed;
            let _this = this;
            (function fn(){
                _this.offsetX += speed/10;
                if(_this.bool){
                    return;
                }else if(speed>0 && _this.offsetX>=target){
                    _this.offsetX = target;
                    return;
                }else if(speed<0 && _this.offsetX<=target){
                    _this.offsetX = target;
                    return;
                }
                _this.timer = setTimeout(fn,0);
            })();
        },
        init(){
            this.offsetWidth = this.$el.querySelector('.box').offsetWidth;
            this.meanVal = this.offsetWidth/this.length;
            this.offsetX = -this.meanVal*this.value;
        }
    },
    mounted(){
        this.init();
    }
}
</script>

<style lang="less" scoped>
.touchX{
    height:100%;
    overflow-x: hidden;

    .box{
        height:100%;
        display:flex;

        >*{
            flex:1;
        }
    }
}
</style>