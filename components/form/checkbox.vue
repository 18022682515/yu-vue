<template>
	<div class="checkbox-box">
		<label class="checkbox" for="#yu-checked">
			<input type="checkbox" :name="name" :value="value" :checked="checked.includes(value)" @input="input">
			<div></div>
		</label>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name:"yuCheckbox",
	model:{
		prop:'checked'
	},
	props:{
		checked:{
			type:Array,
			required: true
		},
		value:{
			type:String,
			required: true
		},
		name:{
			type:String
		}
	},
	methods:{
		input(e){
			if(e.currentTarget.checked){
				this.checked.push(e.currentTarget.value);
			}else{
				let index = this.checked.indexOf(e.currentTarget.value)
				index!==-1 && this.checked.splice(index,1)
			}
			this.$emit('input',this.checked)
		}
	}
}
</script>

<style lang="less" scoped>
	.checkbox-box{
		display:flex;
		align-items:center;
	}
	.checkbox{
		position:relative;
		width:12px;
		height:12px;
		padding:1px;
		margin-right:8px;
		border:1px solid #abc;
		overflow: hidden;
		
		&>div{
			box-sizing: border-box;
			width:100%;
			height:100%;
			pointer-events: none;
		}
		input[type="checkbox"]:checked ~ div {
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