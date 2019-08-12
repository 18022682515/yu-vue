<template>
<div class="scale">
    <div ref="box" class="box" @mouseenter="show=true" @mouseleave="show=false" @mousemove="move">
        <img :src="img" alt="" width="100%" @load="load">
        <div ref="lens" class="lens" :style="{ top:lensTop+'px',left:lensLeft+'px',opacity:show?1:0,backgroundImage:`url('${url}')` }"></div>
    </div>
    <div class="detail" v-show="show" :style="{...detailStyle}">
        <div class="img" :style="{ width:boxWidth*2+'px',transform:`translate(-${x}%,-${y}%)` }"><img :src="img" alt="" width="100%"></div>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
export default {
    name:"scale",
    props:{
        img:{
            type:String,
            required: true
        },
        url:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            x:0,
            y:0,
            show:false,
            box:null,
            top:0,
            left:0,
            boxWidth:0,
            boxHeight:0,
            lensTop:0,
            lensLeft:0,
            lensWidth:0,
            lensHeight:0
        }
    },
    computed:{
        detailStyle(){
            return { top:this.top+'px',left:this.left+this.boxWidth+'px',width:this.boxWidth+'px',height:this.boxHeight+'px' }
        }
    },
    methods:{
        load(){
            let box = this.box = this.$refs.box;
            this.boxWidth = box.offsetWidth;
            this.boxHeight = box.offsetHeight;
            let lens = this.$refs.lens;
            this.lensWidth = lens.offsetWidth;
            this.lensHeight = lens.offsetHeight;
        },
        move(e){
            if(!this.box) return;
            this.left = this.box.offsetLeft;
            this.top = this.box.offsetTop;
            let x = e.pageX - this.left;
            let y = e.pageY - this.top;
            let maxWidth = this.boxWidth-this.lensWidth;
            let maxHeight = this.boxHeight-this.lensHeight;
            let half_w = this.lensWidth/2;
            let left = x-half_w;
            this.lensLeft = left<0? 0 :(left>maxWidth? maxWidth: left);
            let top = y-this.lensHeight/2;
            this.lensTop = top<0? 0: (top>maxHeight? maxHeight: top);
            this.getPoint(this.lensLeft,this.lensTop);
        },
        getPoint(x,y){
            this.x = x/this.boxWidth*100;
            this.y = y/this.boxHeight*100;
        }
    }
}
</script>

<style lang="less" scoped>
.scale{
    margin:4px 2px;
    box-shadow: 0 0 2px #000, 1px 1px 2px #000;

    .box{
        position:relative;
        overflow: hidden;

        .lens{
            position:absolute;
            box-sizing: border-box;
            width:50%;
            height:50%;
            box-shadow: 0 0 2px #000;
            background: rgba(0,0,0,.1);
        }
    }

    .detail{
        position: absolute;
        overflow: hidden;
        box-shadow: 0 0 2px #000,1px 1px 2px #000;
        margin-left:5px;
        z-index:999;
    }
}

</style>