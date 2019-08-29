<template>
<div class="slide" @mouseenter="close" @mouseleave="run">
    <div ref="box" class="box" :style="{ width:100*nimgs.length+'%' }">
        <div class="img" v-for="img,i in nimgs">
            <img :src="img" alt="" width="100%">
        </div>
    </div>
    <div class="up-next">
        <p class="up" @click="up">←</p>
        <p class="next" @click="next">→</p>
    </div>
    <div class="dot">
        <span v-for="img,i in imgs" :class="{ active:activeIndex===i+1 }" @mouseenter="index=i+1"></span>
    </div>
</div>
</template>

<script>
import { animate } from 'yu-front';
export default {
    name:"slide",
    props:{
        imgs:{
            type:Array,
            required:true
        },
        ms:{
            type:Number,
            default:2500
        }
    },
    data(){
        return {
            box:null,
            index:1,
            activeIndex:1,
            bool:false,
            timer:null,
        }
    },
    watch:{
        index(n,o){
            let max = this.nimgs.length-2;
            let last = this.nimgs.length-1;
            if((o===0 && n===max) || (o===last && n===1)) return;

            let val = 100/this.nimgs.length;
            if(n===0){
                this.activeIndex = max;
                animate(this.box,[{ transform:{ translateX:-val*n+'%' } },{duration:300}]).then(()=>{
                    animate(this.box,[{ transform:{ translateX:-val*max+'%' } },{duration:0}]).then(()=>{
                        this.index = max;
                        this.bool = false;
                    });
                });
            }else if(n===last){
                this.activeIndex = 1;
                animate(this.box,[{ transform:{ translateX:-val*n+'%' } },{duration:300}]).then(()=>{
                    animate(this.box,[{ transform:{ translateX:-val*1+'%' } },{duration:0}]).then(()=>{
                        this.index = 1;
                        this.bool = false;
                    });
                });
            }else{
                this.activeIndex = n;
                animate(this.box,[{ transform:{ translateX:-val*n+'%' } },{duration:300}]).then(()=>{
                    this.bool = false;
                });
            }
        }
    },
    methods:{
        up(){
            if(this.bool) return;
            this.bool = true;
            this.index--;
        },
        next(){
            if(this.bool) return;
            this.bool = true;
            this.index++;
        },
        run(){
            this.timer = setInterval(()=>{
                this.index++;
            },this.ms);
        },
        close(){
            clearInterval(this.timer);
        }
    },
    computed:{
        nimgs(){
            return [this.imgs[this.imgs.length-1], ...this.imgs, this.imgs[0]];
        }
    },
    mounted(){
        this.box = this.$refs.box;
        animate(this.box,[{ transform:{ translateX:-100/this.nimgs.length*this.index+'%' } },{duration:0}]);
        this.run();
    }
}
</script>

<style lang="less" scoped>
.slide{
    position:relative;
    overflow: hidden;

    &:hover>.up-next{
        opacity: 1;
    }
}
.box{
    display:flex;
    >*{
        flex:1;
    }
}
.up-next{
    opacity: 0;
    position:absolute;
    top:50%;
    left:0;
    width:100%;
    transform:translateY(-50%);
    >*{
        background: rgba(0,0,0,.3);
        padding:10px;
        color:#FFF;
    }
    .up{
        float:left;
    }
    .next{
        float:right;
    }
    &:after{
        content:"";
        height:0;
        clear:both;
    }
}
.dot{
    position:absolute;
    bottom:0;
    left:50%;
    transform:translateX(-50%);
    >*{
        display:inline-block;
        width:10px;
        height:10px;
        padding:1px;
        background: #FFF;
        border:1px solid #999;
        border-radius: 50%;
    }
    >*:not(:last-child){
        margin-right:10px;
    }
    .active{
        background: rgba(182,0,0,.8);
        background-clip: content-box;
    }
}
</style>