<template>
<div class="nav">
    <div 
        class="child" 
        v-for="(item,i) in options" 
        :class="{ active:i===index }"
        @mouseenter="$set(select,i,true)"
        @mouseleave="$set(select,i,false)"
        @click="index=i"
        
    >   
        <div class="title">
            <router-link class="router-link" :to="'/'+item.title">{{item.title}}</router-link>
            <transition :name="types[i]">
                <div class="box" v-show="index===i">
                    <span>{{item.title}}</span>
                </div>
            </transition>
        </div>
        <transition>
            <div class="select" v-if="item.menu" v-show="select[i]">
                <router-link v-for="(val,j) in item.menu" :key="j" :to="'/'+val">{{val}}</router-link>
            </div>
        </transition>
    </div>
</div>
</template>

<script>
export default {
    name:"yuNav",
    props:{
        options:{
            type:Array,
            required: true
        }
    },
    data(){
        return {
            index:0,
            select:this.options.concat().fill(false,0),
            types:this.options.concat().fill("left",0)
        }
    },
    watch:{
        index(n,o){
            if(n>o){
                this.types[n] = "left";
                this.types[o] = "right";
            }else{
                this.types[n] = "right";
                this.types[o] = "left";
            }
        }
    }
}
</script>

<style lang="less" scoped>
.nav{
    margin-top:50px;
    padding-left:5%;
    display:flex;
    background: rgba(0, 0, 0, 0.74);
    >.child{
        border-left:1px solid #FFF;
    }
    >.child:last-child{
        border-right:1px solid #FFF;
    }
    >.child{
        position:relative;
        border-top:1px solid rgba(0, 0, 0, 0.753);
        .v-enter,.v-leave-to{
            transform:scaleY(0);
            
        }
        .v-enter-active,.v-leave-active{
            transition:all .2s;
        }
        .select{
            z-index:999;
            position:absolute;
            width:100%;
            border:1px solid #EEE;
            background: #FFF;
            transform-origin: center top;
            display:flex;
            flex-direction: column;

            >*{
                padding:5px 20px;
                color:#000;

                &:hover{
                    background: #abc;
                }
            }
        }
        .title{
            position:relative;
            overflow: hidden;
            text-align: center;

            .router-link{
                display:block;
                color:#FFF;
                padding:5px 60px;
            }
            .box{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                pointer-events:none;
                background: #FFF;
                color:#000;
                &:after{
                    content:"";
                    height:100%;
                    display:inline-block;
                    vertical-align: middle;
                }
                >*{
                    display:inline-block;
                    vertical-align: middle;
                }
            }
            .left-enter,.left-leave-to{
                transform:translateX(-100%);
            }
            .right-enter,.right-leave-to{
                transform:translateX(100%);
            }
            .left-enter-active,.left-leave-active,
            .right-enter-active,.right-leave-active{
                transition:all .5s;
            }
        }
    }
    
}
</style>