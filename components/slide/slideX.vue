<template>
<div class="slideX" @mouseenter="close" @mouseleave="run">
    <div ref="box" class="box" :style="{ width }">
        <slot></slot>
    </div>
    <div class="point">
        <span v-for="i in length" @mouseenter="enter(i)" :class="{ active:index===i }"></span>
    </div>
</div>
</template>

<script>
import { animate } from 'yu-front';

export default {
    name:"slideX",
    props:{
        ms:{
            type:Number,
            default:2000
        }
    },
    data(){
        return {
            timer:null,
            index:1,
            eles:[],
            length:0,
            bool:false
        }
    },
    computed:{
        width(){
            let length = this.eles.length;
            return 100*length+'%';
        },
        meanValue(){
            return 100/this.eles.length;
        }
    },
    methods:{
        enter(i){
            this.index = i;
            animate(this.$refs.box,[{ transform:{ translateX:-this.meanValue*this.index+'%' } }]);
        },
        up(){
            if(this.bool) return;
            this.bool = true;
            let index = this.index-1;
            this.index = index<0 ? this.eles.length-2 : index;
            if(this.index==0){
                let i = this.index;
                this.index = this.eles.length-2;
                animate(this.$refs.box,[{ transform:{ translateX:-this.meanValue*i+'%' } }]).then(()=>{
                    animate(this.$refs.box,[{ transform:{ translateX:-this.meanValue*this.index+'%' } },{ duration:0 }]).then(()=>{
                        this.bool = false;
                    });
                });
                return;
            }
            animate(this.$refs.box,[{ transform:{ translateX:-this.meanValue*this.index+'%' } }]).then(()=>{
                this.bool = false;
            });
        },
        next(){
            if(this.bool) return;
            this.bool = true;
            let index = this.index+1;
            this.index = index>this.eles.length-1 ? 1 : index;
            if(this.index==this.eles.length-1){
                let i = this.index;
                this.index = 1;
                animate(this.$refs.box,[{ transform:{ translateX:-this.meanValue*i+'%' } }]).then(()=>{
                    animate(this.$refs.box,[{ transform:{ translateX:-this.meanValue*this.index+'%' } },{ duration:0 }]).then(()=>{
                        this.bool = false;
                    });
                });
                return;
            }
            animate(this.$refs.box,[{ transform:{ translateX:-this.meanValue*this.index+'%' } }]).then(()=>{
                this.bool = false;
            });
        },
        run(){
            this.timer = setInterval(()=>{
                this.next();
            },this.ms);
        },
        close(){
            clearInterval(this.timer);
        },
        init(){
            let slots = this.$slots.default;
            if(!slots) return;
            let first = slots[0].elm.cloneNode(true);
            let last = slots[slots.length-1].elm.cloneNode(true);
            let box = this.$refs.box;
            let one = box.querySelector('*');
            box.insertBefore(last,one);
            box.appendChild(first);
            slots.forEach(vNode=>{
                vNode.tag && this.eles.push(vNode.elm);
            });
            this.eles.unshift(first);
            this.eles.push(last);
            this.length = this.eles.length-2;
            animate(this.$refs.box,[{ transform:{ translateX:-this.meanValue*this.index+'%' } },{ duration:0 }]);
            this.run();
        }
    },
    mounted(){
        this.init();
    }
}
</script>

<style lang="less" scoped>
.slideX{
    position:relative;
    box-shadow: 0 0 1px #000;
    overflow: hidden;

    .box{
        display:flex;
        >*{
            flex:1;
        }
    }
    
    .point{
        position:absolute;
        bottom:10%;
        width:100%;
        text-align: center;
        >span{
            display:inline-block;
            width:10px;
            height:10px;
            box-shadow: 1px 1px 1px #000;
            padding:1px;
            background-color: rgba(164, 164, 247, 0.575);
            background-clip: content-box;
            border-radius: 50%;
            cursor:pointer;
        }
        >span:not(:first-child){
            margin-left:25px;
        }
        >.active{
            background-color: rgb(168, 54, 50);
        }
    }

    &:hover>.dot{
        display:block;
    } 
}
</style>