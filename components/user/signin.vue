<template>
<transition>
    <div class="conteiner-signin">
        <div class="signin" v-show="value" @keydown.enter="signin" @mousedown="$emit('input',!value)">
            <div class="box" @mousedown.stop>
                <h3>注册</h3>
                <p class="hint">{{hint}}</p>
                <form action="">
                    <div class="left">
                        <span>用户名：</span>
                        <span>密码：</span>
                        <span>确认密码：</span>
                        <span>验证码：</span>
                        <span>输入验证码：</span>
                    </div>
                    <div class="right">
                        <p>
                            <yu-input type="text" name="user" v-model="user" @input.native="input('user')"></yu-input>
                            <span style="color:#f00" :class="{ show:!userBool }">x</span>
                        </p>
                        <p>
                            <yu-input type="password" name="password" v-model="password" @input.native="input"></yu-input>
                            <span style="color:#f00" :class="{ show:!passBool }">x</span>
                        </p>
                        <p>
                            <yu-input type="password" name="password" v-model="confirmPassword" @input.native="input"></yu-input>
                            <span style="color:#f00" :class="{ show:!confirmBool }">x</span>
                        </p>
                        <div v-html="svg" @click="req"></div>
                        <p>
                            <yu-input type="text" name="captcha" width="60%" v-model="captcha" @input.native="input"></yu-input>
                            <span style="color:#f00" :class="{ show:!captchaBool }">x</span>
                        </p>
                    </div>
                </form>
                <p class="btn-group">
                    <yu-button  @btn-click="$emit('input',!value)">取消</yu-button>
                    <yu-button @btn-click="signin">注册</yu-button>
                </p>
            </div>
        </div>
        <yu-alert text="注册成功" v-model="show"></yu-alert>
    </div>
</transition>

</template>

<script>
import { ajax,examineUser } from 'yu-front';

export default {
    name:"signin",
    props:{
        value:{
            type:Boolean,
            default:false
        },
        svgUrl:{
            type:String,
            required: true
        },
        userUrl:{
            type:String,
            required: true
        },
        signinUrl:{
            type:String,
            required: true
        }

    },
    data(){
        return {
            show:false,
            hint:'',
            svg:'',
            all:{},
            user:'',
            password:'',
            confirmPassword:'',
            captcha:'',
            userBool:false,
            passBool:false,
            confirmBool:false,
            captchaBool:false
        }
    },
    methods:{
        userExist(){
            this.hint = '';
            ajax('get',this.userUrl,{ user:this.user }).then(res=>{
                if(res.data){
                    this.hint = '用户名已存在';
                }
            });
        },
        req(){
            ajax('get',this.svgUrl).then(res=>{
                let data = res.data.replace('height="50"','height="34"');
                this.svg = data;
            });
        },
        signin(){
            let count = 0, o = {};
            Object.keys(this.all).forEach(key=>{
                this.all[key] && count++;
                if(key==='confirmPassword') return;
                o[key] = this.all[key];
            }); 
            if(count===4 && this.hint!=='用户名已存在'){
                ajax('get',this.signinUrl,o).then(res=>{
                    if(res.data){
                        this.$emit('input',!this.value);
                        this.show = true;
                    }else{
                        this.hint = '验证码错误';
                    }
                });
            }
        },
        input(type){
            this.userBool = examineUser(this.user);
            this.userBool && type==='user' && this.userExist();
            this.all['user'] = this.userBool ? this.user : null;

            this.passBool = examineUser(this.password);
            this.all['password'] = this.passBool ? this.password : null;

            this.confirmBool = this.confirmPassword === this.password;
            this.all['confirmPassword'] = this.confirmBool ? this.confirmPassword : null;

            this.captchaBool = this.captcha.length===4 ? true : false;
            this.all['captcha'] = this.captchaBool ? this.captcha : null;
        },
        init(){
            this.user = '';
            this.password = '';
            this.confirmPassword = '';
            this.captcha = '';
            this.userBool = false;
            this.passBool = false;
            this.confirmBool = false;
            this.captchaBool = false;
            this.all = {};
            this.hint = '';
        }
    },
    watch:{
        value(n,o){
            if(n){
                document.body.style.overflow = 'hidden'
                this.init();
                this.req();
            }else{
                document.body.style.overflow = 'auto'
            }
        }
    },
    mounted(){
        this.req();
    }
}
</script>

<style lang="less" scoped>
.v-enter,.v-leave-to{
    opacity: 0;
}
.v-enter-active,.v-leave-active{
    transition:all .5s;
}
body{
    overflow: hidden;
}
.signin{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:9;
    background: rgba(49, 46, 45,.8);
    .box{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background: #FFF;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 2px #000,1px 1px 2px #000;

        >h3{
            text-align: center;
            padding:5px;
            color:#FFF;
            background: rgb(28, 112, 155);
        }
        .hint{
            position:absolute;
            width:100%;
            text-align: center;
            padding:5px;
            color:#F00;
        }
        .btn-group{
            text-align: right;
            padding:0 30px 10px 0;
            >*{
                margin-left:10px;
            }
        }
        >form{
            padding:30px 30px;
            display:flex;
            >*{
                flex:auto;
            }
            .left{
                display:flex;
                flex-direction:column;
                text-align: right;
                >*{
                    flex:1;
                    &:after{
                        content:"";
                        display:inline-block;
                        vertical-align: middle;
                        height:100%;
                    }
                }
            }
            .right{
                height:200px;
                display:flex;
                flex-direction:column;

                .show{
                    opacity: 1;
                }
                >div{
                    margin:4px 2px;
                    background: rgba(55,55,155,.25);
                }
                >*{
                    flex:1;
                    height:0;
                    >span{
                        opacity: 0;
                    }
                    >*{
                        display:inline-block;
                    }
                    &:after{
                        content:"";
                        display:inline-block;
                        vertical-align: middle;
                        height:100%;
                    }
                }
            }
        }
    }
}
</style>