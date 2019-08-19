<template>
<div class="screenY" @mouseenter="close" @mouseleave="run" @mousewheel="wheel" :style="{ height }">
    <div ref="box" class="box" :style="{ boxHeight }">
        <slot></slot>
    </div>
    <div class="point">
        <span v-for="i in length" @mouseenter="enter(i)" :class="{ active:point===i }"></span>
    </div>
</div>
</template>

<script>
import { animate } from 'yu-front'; 

export default {
    name:"screenY",
    props:{
        value:{
            type:Number,
            default:1
        },
        height:{
            type:String,
            default:'100%'
        },
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
    watch:{
        value(n,o){
            n!=this.point && this.enter(n);
        }
    },
    computed:{
        point(){
            let index = this.index;
            let length = this.eles.length;
            index = index==0 ? length-2 : (index==length-1 ? 1 : index);
            this.$emit('input',index);
            return index;
        },
        boxHeight(){
            let length = this.eles.length;
            let height = parseFloat(this.height);
            let unit = this.getUnit();
            return height*length+unit;
        },
        meanValue(){
            return 100/this.eles.length;
        }
    },
    methods:{
        wheel(e){
            if(e.wheelDelta>0){
                this.up();
            }else{
                this.next();
            }
        },
        getUnit(){
            return /%/.test(this.height) ? '%' : 'px'; 
        },
        enter(i){
            if(i==0){
                this.index = this.eles.length-2;
                animate(this.$refs.box,[{ transform:{ translateY:-this.meanValue*i+'%' } },{ duration:300 }]).then(()=>{
                    animate(this.$refs.box,[{ transform:{ translateY:-this.meanValue*this.index+'%' } },{ duration:0 }]).then(()=>{
                        this.bool = false;
                    });
                });
                return;
            }else if(i==this.eles.length-1){
                this.index = 1;
                animate(this.$refs.box,[{ transform:{ translateY:-this.meanValue*i+'%' } },{ duration:300 }]).then(()=>{
                    animate(this.$refs.box,[{ transform:{ translateY:-this.meanValue*this.index+'%' } },{ duration:0 }]).then(()=>{
                        this.bool = false;
                    });
                });
                return;
            }
            this.index = i;
            animate(this.$refs.box,[{ transform:{ translateY:-this.meanValue*i+'%' } },{ duration:300 }]).then(()=>{
                this.bool = false;
            });
        },
        up(){
            if(this.bool) return;
            this.bool = true;
            let index = this.value-1;
            index = index<0 ? this.eles.length-2 : index;
            this.enter(index);
        },
        next(){
            if(this.bool) return;
            this.bool = true;
            let index = this.value+1;
            index = index>this.eles.length-1 ? 1 : index;
            this.enter(index);
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
            animate(this.$refs.box,[{ transform:{ translateY:-this.meanValue*this.index+'%' } },{ duration:0 }]);
            this.run();
        }
    },
    mounted(){
        this.init();
        let childs = [...document.querySelectorAll('.box>*')];
        childs.forEach(child=>{
            child.style.height = getComputedStyle(this.$el).height;
        });
    }
}
</script>

<style lang="less" scoped>
.screenY{
    position:relative;
    box-shadow: 0 0 1px #000;
    height:100px;
    background: #00f;
    overflow: hidden;

    .box{
        display:flex;
        flex-direction: column;
        >*{
            flex:auto;
        }
    }
    
    .point{
        position:absolute;
        top:50%;
        right:2%;
        transform:translateY(-50%);
        display:flex;
        flex-direction: column;
        text-align: center;
        >span{
            width:10px;
            height:10px;
            border:1px solid #FFF;
            padding:1px;
            background-color: #FFF;
            background-clip: content-box;
            border-radius: 50%;
            cursor:pointer;
            transition:all .2s;
        }
        >span:not(:last-child){
            margin-bottom:25px;
        }
        >.active{
            transform:scale(2,2);
            background-color: #F00;
        }
    }

    &:hover>.dot{
        display:block;
    } 
}
</style>