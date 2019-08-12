<template>
<div class="tabs">
    <ul class="title">
        <li v-for="(tab,i) in tabs" :class="{ active:i===index }" @click="click($event,i)">{{tab.title}}</li>
    </ul>
    <ul class="content">
        <li v-for="(tab,i) in tabs" :class="{ active:i===index }">
            <p v-for="val in tab.content">{{val}}</p>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name:'textTabs',
    props:{
        tabs:{
            type:Array,
            default:()=>{
                return [
                    {title:'标题1',content:[1,2,3,4]},
                    {title:'标题2',content:["a","b","c"]}
                ]
            }
        }
    },
    data(){
        return {
            index:0
        }
    },
    methods:{
        click(e,i){
            this.index = i;
        }
    }
}
</script>

<style lang="less" scoped>
.tabs{
    margin:4px 2px;
    border-radius: 5px 5px 10px 10px;
    box-shadow: 0 0 2px #000, 1px 1px 2px #000;
    overflow: hidden;
}
.title{
    display: flex;
    
    >*{
        flex:1;
        padding:5px 0;
        cursor: pointer;
        text-align: center; 
        color:#FFF;
        background: rgba(28, 112, 155, 1);
        border-bottom:1px solid #999;
    }
    >*:not(:last-child){
        border-right:1px solid #999;
    }
    &>.active{
        background: #FFF;
        color:#000;
        // border-bottom:1px solid #EEE;
    }
}
.content{
    position: relative;
    
    li{
        display:none;
        position:absolute;
        width:100%;
        p{
            padding:5px 10px;
            &:hover{
                background: #abc;
            }
        }
        
        background: #FFF;
        border-top:none;
    }
    .active{
        position:static;
        display:block;
    }
}
</style>