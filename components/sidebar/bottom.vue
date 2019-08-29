<template>
    <div class="bottom" @touchstart="start" @touchend="end" :style="{ height:size,transform:`translateY(${bottom}px)` }">
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
            bottom:0,
            y:0,
            height:0,
            speeds:[],
        }
    },
    watch:{
        value(n,o){
            this.ani(n);
        },
        bottom(n,o){
            n<0 && (this.bottom = 0);
        }
    },
    methods:{
        ani(bool){
            if(bool){
                animate(this.$el,[{ transform:{ translateY:0 } },{ duration:300 }]).then(()=>{
                    this.bottom = 0;
                });
            }else{
                animate(this.$el,[{ transform:{ translateY:this.height } },{ duration:300 }]).then(()=>{
                    this.bottom = this.height;
                });
            }
        },
        move(e){
            let y = e.changedTouches[0].clientY;
            let val = y-this.y;
            this.bottom += val
            if( this.speeds.length>0 && ((this.speeds[0]>0 && val<0) || (this.speeds[0]<0 && val>0)) ){
                this.speeds.splice(0);
            }
            this.speeds.push(val);
            this.y = y;
        },
        start(e){
            this.$el.style.transition = "";
            this.y = e.changedTouches[0].clientY;
            document.body.addEventListener('touchmove',this.move);
        },
        end(e){
            document.body.removeEventListener('touchmove',this.move);
            if(this.bottom>this.height*0.2){
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
        this.height = this.$el.offsetHeight;
    }
}
</script>

<style lang="less" scoped>
.bottom{
    position:absolute;
    bottom:0;
    width:100%;
}
</style>