<template>
<input class="input" :type="type" :name="name" v-model="val" :placeholder="`请输入${name}`" :style="{ width:width }">
</template>

<script>
export default {
	name:"yuInput",
	props:{
		value:{},
		type:{
				type:String,
				default:'text'
		},
		name:{
				type:String,
				default:''
		},
		width:{
				type:String,
				default:'auto'
		}
	},
	data(){
		return {
			val:''
		}
	},
	watch:{
		val(n,o){
			this.$emit('input',n)
		}
	}
}
</script>

<style lang="less" scoped>
input:-webkit-autofill {
	transition:background-color 5000s ease-in-out 0s;
}
.input{
	display:inline-block;
	padding:5px 10px;
	outline: none;
	border:none;
	border-radius: 3px;
	box-shadow: inset 0 0 1px #000;

	&:focus{
		box-shadow: inset 0px 0px 2px  rgb(12, 3, 90),inset 0 0 1px #000;
	}
}
</style>