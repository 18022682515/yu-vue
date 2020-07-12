<template>
	<div class="slide" @mousedown="stop" @mouseup="run" :style="{ width }">
		<transition-group :name="name" tag="ul" class="slide-box">
			<li :style="{ height }" :key="Math.random()"></li>
			<li class="item" v-for="(img,i) in imgs" v-show="index===i" :key="''+i">
				<img :src="img" alt="" width="100%" @load="load($event,i)">
			</li>
		</transition-group>
		<div class="icon-group">
			<yu-icon class="left" icon="icon-zuojiantou" @click.native="minus"></yu-icon>
			<yu-icon class="right" icon="icon-youjiantou" @click.native="add"></yu-icon>
		</div>
		<div class="num-group">
			<p v-for="(img,i) in imgs" :class="{ active:index===i }" @click="setIndex(i)">{{i+1}}</p>
		</div>
	</div>

</template>

<script>
export default {
  name: 'slide',
  props: {
    y: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    imgs: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      height: 0,
      name: 'right-left',
      index: 0,
      timer: null
    }
  },
  methods: {
    setIndex (i) {
      if (this.index > i) {
        this.name = this.y ? 'top-bottom' : 'left-right'
      } else {
        this.name = this.y ? 'bottom-top' : 'right-left'
      }
      this.index = i
    },
    load (e,i) {
			if(i!==this.index) return;
      this.height = getComputedStyle(e.currentTarget).height
      this.$el.style.overflow = 'hidden'
    },
    add () {
      this.name = this.y ? 'bottom-top' : 'right-left'
      this.index++
      this.index = this.index > this.imgs.length - 1 ? 0 : this.index
    },
    minus () {
      this.name = this.y ? 'top-bottom' : 'left-right'
      this.index--
      this.index = this.index < 0 ? this.imgs.length - 1 : this.index
    },
    run () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.add()
      }, 2000)
    },
    stop () {
      clearInterval(this.timer)
    }
  },
  mounted () {
    this.run()
  }
}
</script>

<style scoped lang="less">
	.slide{
		position:relative;
		.slide-box{
			position:relative;
			display:flex;
			.item{
				position:absolute;
				top:0;
				left:0;
				width:100%;
			}
		}
		.icon-group{
			width:100%;
			position:absolute;
			top:50%;
			transform:translateY(-50%);
			>*{
				opacity:.3;
				font-size: 30px;
				&:hover{
					opacity:1;
				}
			}
			.left{
				float:left;
			}
			.right{
				float:right;
			}
		}
		.num-group{
			width:100%;
			position:absolute;
			bottom:0;
			display:flex;
			align-items:center;
			justify-content: center;
			>p{
				margin:10px;
				width:20px;
				height:20px;
				line-height:20px;
				text-align:center;
				font-size: 10px;
				color:#FFF;
				border-radius: 50%;
				background-color: rgba(222,0,0,.1);;
			}
			.active{
				background-color: #F00;
			}
		}
	}

	.left-right-enter{
		transform:translateX(-100%);
	}
	.left-right-leave-to{
		transform:translateX(100%);
	}
	.left-right-enter-active,
	.left-right-leave-active,
	.right-left-enter-active,
	.right-left-leave-active{
		transition:all .5s;
	}

	.right-left-enter{
		transform:translateX(100%);
	}
	.right-left-leave-to{
		transform:translateX(-100%);
	}

	.top-bottom-enter{
		transform:translateY(-100%);
	}
	.top-bottom-leave-to{
		transform:translateY(100%);
	}
	.top-bottom-enter-active,
	.top-bottom-leave-active,
	.bottom-top-enter-active,
	.bottom-top-leave-active{
		transition:all .5s;
	}

	.bottom-top-enter{
		transform:translateY(100%);
	}
	.bottom-top-leave-to{
		transform:translateY(-100%);
	}
</style>
