<template>
  <div id="login">
    <img src="@/assets/pop.gif" alt="" class="popgif" @mouseover="moveGif" :style="popStyle">
    <a-card title="login" :bordered="false" style="width: 300px">
        <a-form :form="form" @submit="handleSubmit">
            <a-form-item>
                <a-input placeholder="请输入" 
                v-decorator="['username', {rules:[{required:true,message:'未输入用户名'}]} ]" >
                    <a-icon slot="addonBefore" type="user"/>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input placeholder="请输入" type="password"
                v-decorator="['psw', {rules:[{required:true,message:'未输入密码'}]} ]" >
                    <a-icon slot="addonBefore" type="key"/>
                </a-input>
            </a-form-item>
            <a-form-item style="float:right">
                <a-col>
                    <a-button type="primary" html-type="submit">登录</a-button>
                </a-col>
            </a-form-item>
        </a-form>
  </a-card>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data:function() {
      return {
        loading:false,
        popStyle:{
            top:'20px',
            right:'20px'
        }
        //   form:this.$form.createForm(this)
      }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods:{
      moveGif:function() {
          console.log('hahahahaha');
          let top = Math.random() * 100;
          let right = Math.random() * 100;
          this.popStyle = {
              top:top +'%',
              right:right +'%'
          }
      },
      handleSubmit:function(e) {
        e.preventDefault();
        let vm = this;
        vm.loading = true;
        this.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let formVal = vm.form.getFieldsValue();
                axios.post('/login',{
                    name:formVal.username,
                    psw:formVal.psw
                }).then((resp) => {
                    if (resp.status == 200) {
                        localStorage.setItem('name', formVal.username);
                        localStorage.setItem('psw', formVal.psw);
                        vm.$router.push({name:'home'})
                    } else {
                        vm.$message.info('用户名与密码不对，请重新输入');
                        vm.form.resetFields();
                    }
                }).catch(err => {
                    vm.$message.info('用户名与密码不对，请重新输入');
                    vm.form.resetFields();
                }).finally(() => vm.loading = false)
            }
        });
      }
  }
}
</script>

<style>
#login{
    width: 100%;
    height: 100%;
    background: #eee !important;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.popgif{
    position: absolute;
    width: 200px;
    right: 0px;
    top: 0px;
    transition: all 0.5s;
}
.ant-form-item{
    margin-bottom: 10px !important;
}
</style>
