<template>
<div class="touchY">
    <div class="box" @touchstart="start" @touchend="end" :style="{ height,transform:`translateY(${offsetY}px)` }">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name:"touchY",
    props:{
        value:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            x:0,
            y:0,
            offsetY:0,
            speeds:[],
            last:0,
            maxHeight:0,
            count:0,
            timer:null,
        }
    },
    watch:{
        value(n,o){
            this.homing(80,n);
        },
        offsetY(n,o){
            this.offsetY = n>0 ? 0 : (n<-this.maxHeight ? -this.maxHeight : n);
        }
    },
    computed:{
        height(){
            let length = this.$slots.default ? this.$slots.default.length : 0;
            return length*100+'%';
        }
    },
    methods:{
        cancel(){
            document.body.removeEventListener('touchmove',this.move);
        },
        move(e){
            let x = e.changedTouches[0].clientX;
            let y = e.changedTouches[0].clientY;
            let valX = x-this.x;
            let val = y-this.y;
            if(this.count<1 && Math.abs(valX)>Math.abs(val)){
                this.cancel();
                return;
            }
            this.count++;
            this.offsetY += val;
            if( this.speeds.length>0 && !((this.speeds[0]>0 && val>0) || (this.speeds[0]<0 && val<0)) ){
                this.speeds.splice(0);
            }
            this.speeds.push(val);
            this.y = y;
            this.last = Date.now();
        },
        start(e){
            this.bool = true;
            this.count = 0;
            this.speeds.splice(0);
            clearTimeout(this.timer);
            this.x = e.changedTouches[0].clientX;
            this.y = e.changedTouches[0].clientY;
            document.body.addEventListener('touchmove',this.move);
        },
        end(e){
            this.bool = false;
            document.body.removeEventListener('touchmove',this.move);
            if(this.speeds.length<1 || Date.now()-this.last>8){
                let height = this.$el.offsetHeight;
                let index = Math.abs(Math.round(this.offsetY/height));
                if(index!==this.value){
                    this.$emit('input',index);
                }else{
                    this.homing(80,index);
                }
                return;
            }
            
            let speed = this.speeds.reduce((sum,val)=>sum+val)/this.speeds.length;
            let height = this.$el.offsetHeight;
            let y = this.offsetY%height;

            let _this = this, count = 0, sum = 0;
            (function fn(){
                sum += speed/8;
                _this.offsetY += speed/8;
                if(_this.bool || count>80 || y+sum<=-height || sum>=Math.abs(y)){
                    let height = _this.$el.offsetHeight;
                    let index = Math.abs(Math.round(_this.offsetY/height));
                    if(index!==_this.value){
                        _this.$emit('input',index);
                    }else{
                        _this.homing(80,index);
                    }
                    return;
                }
                count++;
                setTimeout(fn,0);
            })();
        },
        homing(speed,index){
            clearTimeout(this.timer);
            let height = this.$el.offsetHeight;
            let target = -index*height;

            let _this = this;
            speed = target<this.offsetY ? -speed : speed;
            (function fn(){
                _this.offsetY += speed/10;
                if(_this.bool){
                    return;
                }else if((speed<0 && _this.offsetY<=target) || (speed>0 && _this.offsetY>=target)){
                    _this.offsetY = target;
                    return;
                }
                _this.timer = setTimeout(fn,0);
            })();
        }
    },
    mounted(){
        this.maxHeight = this.$el.querySelector('.box').offsetHeight - this.$el.offsetHeight;
    }

}
</script>

<style lang="less" scoped>
.touchY{
    height:100%;
    overflow-y:hidden;
    .box{
        display:flex;
        flex-direction: column;
        >*{
            flex:1;
            overflow-y: hidden;
            border:1px solid #EEE;
            color:#FFF;
            >*{
                padding:10px;
            }
        }
        >*:nth-child(1){
            background: #123;
        }
        >*:nth-child(2){
            background: #987;
        }
        >*:nth-child(3){
            background: #234;
        }
        >*:nth-child(4){
            background: #876;
        }
        >*:nth-child(5){
            background: #345;
        }
    }
}
</style>