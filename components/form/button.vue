<template>
<button 
	class="button" 
	@click="$emit('click',$event)" 
	:style="{ backgroundColor:backgroundColor,color:fontColor }" 
	@mouseover="backgroundColor='#FFF',fontColor='#000'" 
	@mouseout="backgroundColor=background,fontColor=color"
>
	<slot></slot>
</button>
</template>

<script>
export default {
    name:"yuButton",
    props:{
			background:{
				type:String,
				default:'rgb(28, 112, 155)'
			},
			color:{
				type:String,
				default:'#FFF'  
				//28, 112, 155  蓝色
				//92, 138, 51  绿色
				//158, 31, 59  红色
			}
    },
    data(){
        return {
					backgroundColor:this.background,
					fontColor:this.color
        }
    }
}
</script>

<style lang="less" scoped>
.button{
    display:inline-block;
    transition:all .1s;
    padding:5px 10px;
    outline: none;
    border:none;
    color:#FFF;
    box-shadow: 1px 1px 2px #000,0 0 1px #000;
    border-radius: 3px;
    cursor: pointer;

    &:hover{
        color:#000;
        box-shadow:inset 0 0 2px rgb(2, 64, 158),1px 1px 2px #000,;
    }
    &:active{
       box-shadow:inset 0 0 2px rgb(2, 64, 158),inset 1px 1px 2px #000;
    }
}
</style>