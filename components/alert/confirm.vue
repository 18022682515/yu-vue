<template>
<transition>
    <div class="alert" v-show="value">
        <slot></slot>
        <transition name="f">
            <div class="frame" v-show="value">
                <h3>{{content.title}}</h3>
                <p>{{content.text}}</p>
                <div>
                    <yu-button @btn-click="change($event,'cancel')">取消</yu-button>
                    <yu-button @btn-click="change($event,'confirm')">确定</yu-button>
                </div>
            </div>
        </transition>
    </div>
</transition>

</template>

<script>
export default {
    name:"yuAlert",
    props:{
        value:{
            type:Boolean,
            default:false
        },
        content:{
            type:Object
        }
    },
    methods:{
        change(e,str){
            this.$emit(str,e);
            this.$emit('input',!this.value);
        }
    }
}
</script>

<style lang="less" scoped>
.alert{
    position:fixed;
    top:0;
    left:0;
    z-index:999;
    width:100%;
    height:100%;
    background: rgba(0,0,0,.5);

    >.frame{
        width:40%;
        background: #FFF;
        box-shadow: 0 0 2px #000, 1px 1px 2px #000;
        border-radius: 5px;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%) scale(1,1);

        h3{
            padding:5px 20px;
        }
        p{
            border-top:1px solid #EEE;
            border-bottom:1px solid #EEE;
            padding:10px 20px;
        }
        div{
            box-sizing: border-box;
            padding:0 20px;
            text-align: right;
        }
    }
    .f-enter,.f-leave-to{
        transform:translate(-50%,-50%) scale(0,0);
    }
    .f-enter-active,.f-leave-active{
        transition:all .5s cubic-bezier(0.5,-0.5,0,2);
    }
}
.v-enter,.v-leave-to{
    opacity: 0;
}
.v-enter-active,.v-leave-active{
    transition:all .5s;
}
</style>