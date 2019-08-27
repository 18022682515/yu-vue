<template>
<div class="shapeY">
    <div ref="box" class="box" :style="{ transformOrigin: `50% 50% -${height/2}px` }">
        <div class="img" v-for="val,i in 4" :key="val" :style="getStyle(i)">
            <img v-if="(index-1)%4===i" :src="nimgs[index-1]" alt="" width="100%" height="auto">
            <img v-else-if="index%4===i" :src="nimgs[index]" alt="" width="100%" height="auto">
            <img v-else-if="(index+1)%4===i" :src="nimgs[index+1]" alt="" width="100%" height="auto">
            <img v-else :src="nimgs[nimgs.length-1]" alt="" width="100%" height="auto">
        </div>
        <div class="img">
            <img :src="nimgs[0]" alt="" width="100%" height="auto" @load="load">
        </div>
    </div>
    <div class="up-next">
        <span class="up" @click="up">←</span>
        <span class="next" @click="next">→</span>
    </div>
    <div class="dot">
        <span v-for="img,i in imgs" :class="{ active:activeIndex===i+1 }" @mouseenter="index=i+1"></span>
    </div>
</div>
</template>

<script>
import { animate } from 'yu-front';

export default {
    name:"shapeY",
    props:{
        imgs:{
            type:Array,
            required:true
        }
    },
    watch:{
        index(n,o){
            if((o===0 && n===this.nimgs.length-2) || (o===this.nimgs.length-1 && n===1)) return;
            
            if(n===0){
                let index = this.nimgs.length-2;
                this.activeIndex = index;
                animate(this.box,[{ transform:{ rotateX:n*90 } },{ duration:260 }]).then(()=>{
                    animate(this.box,[{ transform:{ rotateX:index*90 } },{ duration:0 }]).then(()=>{
                        this.index = index;
                        this.bool = false;
                    });
                });
                return;
            }else if(n===this.nimgs.length-1){
                let index = 1;
                this.activeIndex = index;
                animate(this.box,[{ transform:{ rotateX:n*90 } },{ duration:260 }]).then(()=>{
                    
                    animate(this.box,[{ transform:{ rotateX:index*90 } },{ duration:0 }]).then(()=>{
                        this.index = index;
                        this.bool = false;
                    });
                });
                return;
            }
            this.activeIndex = n;
            animate(this.box,[{ transform:{ rotateX:n*90 } },{ duration:260 }]).then(()=>{
                this.bool = false;
            });
        }
    },
    data(){
        return {
            bool:false,
            box:null,
            index:0,
            activeIndex:1,
            height:0
        }
    },
    methods:{
        load(){
            this.height = this.$el.offsetHeight;
        },
        getStyle(i){
            if(i===1){
                return { transformOrigin: "center bottom",transform:`translateZ(-${this.height}px) rotateX(-90deg)` };
            }else if(i===2){
                return { transform:`translateZ(-${this.height}px) rotateZ(180deg) rotateY(180deg)` };
            }else if(i===3){
                return { transformOrigin: "center top",transform:`translateZ(-${this.height}px) rotateX(90deg)` };
            }
        },
        up(){
            if(this.bool) return;
            this.bool = true;
            this.index--;
        },
        next(){
            if(this.bool) return;
            this.bool = true;
            this.index++;
        }
    },
    computed:{
        nimgs(){
            return [this.imgs[this.imgs.length-1],...this.imgs,this.imgs[0]];
        }
    },
    mounted(){
        this.box = this.$refs.box;
        animate(this.box,[{ transform:{ rotateX:(this.nimgs.length-1)*90 } },{ duration:0 }]).then(()=>{
            this.index = this.nimgs.length-1;
        });
    }
}
</script>

<style lang="less" scoped>
.shapeY{
    display:inline-block;
    perspective: 800px;
    .box{
        position:relative;
        transform-style:preserve-3d;
        
        .img{
            position:absolute;
            top:0;
            left:0;
            width:100%;
        }
        >.img:last-child{
            position:static;
            opacity:0;
        }
    }
    &:hover>.up-next{
        opacity:1;
    }
    .up-next{
        user-select:none;
        opacity:0;
        position:absolute;
        top:50%;
        left:0;
        width:100%;
        transform:translateY(-50%);
        >*{
            padding:10px;
            color:#FFF;
            background: rgba(0,0,0,.2);
        }
        .up{
            float:left;
        }
        .next{
            float:right;
        }
    }
    .dot{
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        text-align: center;
        >*{
            display:inline-block;
            width:10px;
            height:10px;
            padding:1px;
            border:1px solid #999;
            border-radius: 50%;
        }
        >*:not(:last-child){
            margin-right:10px;
        }
        .active{
            background: #f00;
            background-clip: content-box;
        }
    }
}
</style>