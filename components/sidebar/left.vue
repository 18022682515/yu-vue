<template>
    <div class="left" @touchstart="start" @touchend="end" :style="{ width:size,transform:`translateX(${left}px)` }">
        <slot></slot>
    </div>
</template>

<script>
import { animate } from 'yu-front';
export default {
    props:{
        size:{
            type:[String,Number],
            default:'100%'
        },
        value:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            left:0,
            x:0,
            width:0,
            speeds:[],
        }
    },
    watch:{
        value(n,o){
            this.ani(n);
        },
        left(n,o){
            n>0 && (this.left = 0);
        }
    },
    methods:{
        ani(bool){
            if(bool){
                animate(this.$el,[{ transform:{ translateX:0 } },{ duration:300 }]).then(()=>{
                    this.left = 0;
                });
            }else{
                animate(this.$el,[{ transform:{ translateX:-this.width } },{ duration:300 }]).then(()=>{
                    this.left = -this.width;
                });
            }
        },
        move(e){
            let x = e.changedTouches[0].clientX;
            let val = x-this.x;
            this.left += val
            if( this.speeds.length>0 && ((this.speeds[0]>0 && val<0) || (this.speeds[0]<0 && val>0)) ){
                this.speeds.splice(0);
            }
            this.speeds.push(val);
            this.x = x;
        },
        start(e){
            this.$el.style.transition = "";
            this.x = e.changedTouches[0].clientX;
            document.body.addEventListener('touchmove',this.move);
        },
        end(e){
            document.body.removeEventListener('touchmove',this.move);
            if(this.left<-this.width*0.2){
                if(!this.value){
                    this.ani(false);
                }else{
                    this.$emit('input',false);
                }
                
            }else{
                
                if(this.value){
                    this.ani(true);
                }else{
                    this.$emit('input',true);
                }
            }
            
        }
    },
    mounted(){
        this.width = this.$el.offsetWidth;
    }
}
</script>

<style lang="less" scoped>
.left{
    position:absolute;
    left:0;
    height:100%;
    background: #abc;
}
</style>