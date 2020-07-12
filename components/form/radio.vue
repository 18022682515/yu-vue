<template>
	<div class="radio-box">
		<label class="radio" for="">
			<input type="radio" :name="name" :value="value" :checked="checked===value?true:false" @input="$emit('input',$event.currentTarget.value)">
			<div></div>
		</label>
		<slot></slot>
	</div>
	
	
</template>

<script>
export default {
	name:"yuRadio",
	model:{
		prop:'checked'
	},
	props:{
		checked:{
			type:String,
			required: true
		},
		value:{
			type:String,
			required: true
		},
		name:{
			type:String
		}
	}
}
</script>

<style lang="less" scoped>
	.radio-box{
		display:flex;
		align-items:center;
	}
	.radio{
		position:relative;
		width:12px;
		height:12px;
		padding:1px;
		margin-right:8px;
		border:1px solid #abc;
		overflow: hidden;
		border-radius: 50%;
		
		&>div{
			box-sizing: border-box;
			width:100%;
			height:100%;
			border-radius: 50%;
			pointer-events: none;
		}
		input[type="radio"]:checked ~ div {
			background-color: rgb(111,22,33);
			padding: 1px;
		}
		input{
			position:absolute;
			width:100%;
			height:100%;
			opacity:0;
		}
	}
</style>