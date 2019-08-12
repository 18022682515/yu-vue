<template>
<div class="pageCode">
    <yu-button @btn-click="up">上页</yu-button>
    <p v-for="num in pages" @click="$emit('input',num)"><yu-button :class="{ active:num==value }">{{num}}</yu-button></p>
    <yu-button @btn-click="down">下页</yu-button>
</div>
</template>

<script>
export default {
    name:"pageCode",
    data(){
        return {
            pages:[]
        }
    },
    props:{
        value:{
            type:Number,
            default:1
        },
        sum:{
            type:Number,
            required: true
        }
    },
    watch:{
        value(n,o){
            n===1 && this.downPages();
        }
    },
    methods:{
        upPages(){
            let offset = this.value;
            this.pages.splice(0);
            let length = offset<5 ? 5 : offset;
            for(let i=length-4; i<=length; i++){
                this.pages.push(i);
            }
        },
        downPages(){
            let offset = this.value;
            this.pages.splice(0);
            let length = this.sum-5>offset ? offset+5 : this.sum;
            for(let i=length-5; i<length; i++){
                this.pages.push(i);
            }
        },
        up(){
            let offset = this.value;
            offset>1 && this.$emit('input',--offset);
            this.upPages();
        },
        down(){
            let offset = this.value;
            this.value<this.sum-1 && this.$emit('input',++offset);
            this.downPages();
        },
    },
    mounted(){
        this.downPages();
    }
}
</script>

<style lang="less" scoped>
.pageCode{
    position:fixed;
    right:0;
    top:50%;
    transform:translateY(-50%);
    display:flex;
    flex-direction:column;
    align-items:center;
    >*{
        margin:10px 0;
    }
    .active{
        background-color: #f00!important;
    }
}
</style>