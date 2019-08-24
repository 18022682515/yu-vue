<template>
    <div class="tab">
        <div class="tab-box">
            <div class="box" v-for="(title,i) in titles" @click="click(i)">
                <p>{{title}}</p>
                <transition :name="types[i]">
                    <div class="describe" v-show="index===i">{{title}}</div>
                </transition>
            </div>
        </div>
        <div class="list">
            <slot></slot>
        </div>
    </div>
    
</template>

<script>
    export default {
        name:"yuTab",
        props:{
            titles:{
                type:Array,
                required:true
            }
        },
        data(){
            return {
                types:this.titles.concat().fill('left',0),
                childs:[],
                index:0
            }
        },
        watch:{
            index(n,o){
                this.childs[n].style.display = "block";
                this.childs[o].style.display = "none";
                if(n>o){
                    this.types[o] = "right";
                    this.types[n] = "left";
                }else{
                    this.types[o] = "left";
                    this.types[n] = "right";
                }
            }
        },
        methods:{
            click(i){
                this.index = i;
            }
        },
        mounted(){
            this.$slots.default.forEach(vNode=>{
                vNode.tag && this.childs.push(vNode.elm);
            });
            this.childs[this.index].style.display = "block";
        }
    }
</script>

<style lang="less" scoped>
.tab{
    border:1px solid #EEE;
}
.list{
    >*{
        display:none;
    }
}
.tab-box{
    border-bottom:1px solid #eee;
    display:flex;
    flex-wrap: wrap;
    >*:not(:last-child){
        border-right:1px solid #EEE;
    }
    .box{
        flex:auto;
        padding:5px 0;
        position:relative;
        overflow: hidden;
        text-align: center;
        .describe{
            position:absolute;
            bottom:0;
            width:100%;
            height:100%;
            background: rgba(0,0,0,.8);
            color:#FFF;
            &:after{
                content:"";
                height:100%;
                display: inline-block;
                vertical-align: middle;
            }
        }
        .left-enter,.left-leave-to{
            transform:translateX(-100%);
        }
        .right-enter,.right-leave-to{
            transform:translateX(100%);
        }
        .bottom-enter,.bottom-leave-to{
            transform:translateY(100%);
        }
        .left-enter-active,.left-leave-active,
        .right-enter-active,.right-leave-active,
        .bottom-enter-active,.bottom-leave-active{
            transition:all .2s linear;
        }
    }
}

</style>