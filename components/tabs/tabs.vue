<template>
<div class="tabs" :style="{ height:height }">
    <ul ref="title" class="title">
        <slot></slot>
    </ul>
    <div class="mark" :style="{ width:width+'px',height:markHeight+'px',left:left+'px' }">{{text}}</div>
</div>
</template>

<script>
let num = 0;
import Vue from 'vue';
export default {
    name:"tabs",
    props:{
        value:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            height:'auto',
            width:0,
            markHeight:0,
            left:0,
            text:'',
        }
    },
    watch:{
        value(n,o){
            this.text = this.$children[n].value;
            let lastData = this.$children[o];
            let nextData = this.$children[n];
            lastData.active = !lastData.active;
            nextData.active = !nextData.active;
            this.setHeight(n);
        }
    },
    methods:{
        setHeight(n){
            Vue.nextTick(()=>{
                let el = this.$children[n].$el;
                this.width = el.offsetWidth;
                this.markHeight = el.offsetHeight;
                this.left = el.offsetLeft;
                let uHeight = this.$children[n].$refs.ul.offsetHeight;
                let tHeight = this.$refs.title.offsetHeight;
                uHeight>1 && (this.height = uHeight+tHeight+'px');
            });
        },
        childClick(vms){
            vms.forEach((vm,i)=>{
                let ele = vm.$el;
                ele.addEventListener('click',()=>{
                    this.$emit('input',i);
                });
            });
        }
    },
    mounted(){
        let childs = this.$children;
        this.childClick(childs);
        childs[this.value].active = true;
        this.text = childs[this.value].value;
        this.setHeight(this.value);
    }
}
</script>

<style lang="less" scoped>
.tabs{
    position:relative;
    margin:4px 2px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 2px #000, 1px 1px 2px #000;

    >.title{
        display:flex;

        >*{
            flex:auto;
            box-shadow: 0 0 1px #000;
        }
    }
    >.mark{
        position:absolute;
        box-sizing: border-box;
        top:0;
        background: rgba(28, 112, 155,1);
        color:#FFF;
        transition:left .2s;
        text-align: center;
        &:after{
            content:"";
            display:inline-block;
            vertical-align: middle;
            height:100%;
        }
    }
}

</style>