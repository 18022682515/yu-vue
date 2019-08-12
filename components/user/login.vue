<template>
<div class="login" v-show="value.show" @keydown.enter="login" @mousedown="$emit('input',{ show:false,user:'' })">
    <div class="box" @mousedown.stop>
        <h3>请登录</h3>
        <div class="hint">{{hint}}</div>
        <form action="">
            <div class="left">
                <p>用户名：</p>
                <p>密码：</p>
            </div>
            <div class="right">
                <p>
                    <yu-input type="user" name="user" v-model="user"></yu-input>
                    <span :class="{ active:!userBool }">x</span>
                </p>
                <p>
                    <yu-input type="password" name="password" v-model="password"></yu-input>
                    <span :class="{ active:!passBool }">x</span>
                </p>
            </div>
        </form>
        <p>
            <yu-button @btn-click="$emit('input',{ show:false,user:'' })">取消</yu-button>
            <yu-button @btn-click="login">注册</yu-button>
        </p>
    </div>
</div>
</template>

<script>
import { ajax,examineUser } from 'yu-front';

export default {
    name:"login",
    props:{
        value:{
            type:Object,
            default:()=>({ show:false,user:'' })
        },
        userUrl:{
            type:String,
            required: true
        },
        loginUrl:{
            type:String,
            required: true
        }
    },
    data(){
        return {
            hint:'',
            user:'',
            password:'',
            userBool:false,
            passBool:false
        }
    },
    methods:{
        login(){
            if(this.userBool && this.passBool){
                ajax('get',this.loginUrl,{ user:this.user,password:this.password }).then(res=>{
                    if(res.data){
                        this.$emit('input',{ show:false,user:this.user });
                    }else{
                        this.hint = '密码错误';
                    }
                });
            }
        },
        input(){
            this.hint = '';
            this.userBool = examineUser(this.user);
            this.userBool && ajax('get',this.userUrl,{ user:this.user }).then(res=>{
                if(!res.data){
                    this.hint = '用户名不存在';
                    this.userBool = false;
                }
            });
            this.passBool = examineUser(this.password);
        }
    },
    watch:{
        value(n,o){
            n.show && this.input();
        },
        user(){
            this.input();
        },
        password(){
            this.input();
        }
    }
}
</script>

<style lang="less" scoped>
.login{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:9;
    background: rgba(49, 46, 45,.8);

    .box{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background: #FFF;
        box-shadow: 0 0 2px #000,1px 1px 2px #000;
        border-radius: 5px;
        overflow: hidden;

        .hint{
            position:absolute;
            width:100%;
            left:0;
            color:#F00;
            padding:10px;
            text-align: center;
        }
        >h3{
            color:#FFF;
            background: rgb(28, 112, 155);
            text-align: center;
            padding:5px 20px;
        }
        >p{
            padding:10px 40px 10px 0;
            text-align: right;
        }
        >form{
            padding:30px 40px 10px;
            display:flex;
            .left,.right{
                flex:auto;
                display:flex;
                flex-direction: column;

                >*{
                    flex:1;
                    text-align: right;
                    &:after{
                        content:"";
                        display:inline-block;
                        vertical-align: middle;
                        height:100%;
                    }
                }
                >p{
                    .active{
                        opacity: 1;
                    }
                    span{
                        color:#f00;
                        opacity: 0;
                    }
                }
            }
        }
    }
}
</style>