<template>
  
  <div class="loginBox">
    <h1>Log in to your account</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="login-ruleForm"
      label-position="right">
      <el-form-item label="Identity" prop="identity">
        <el-select v-model="ruleForm.identity" placeholder="Select your identity">
          <el-option label="Patient" value="Patient"></el-option>
          <el-option label="Hospital" value="Hospital"></el-option>
          <el-option label="Insurence" value="Insurence"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Username" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button  @click="resetForm('ruleForm')">Reset</el-button>
        <el-button type="primary" @click="register()">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.loginBox {
  width: 500px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(67, 82, 126, 0.7);
  opacity: 1;
  background-color: #eee;
  border-radius: 15px;
}
body{
  background-color: rgb(235, 90, 24);
}
.loginbody {
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>

<script>
import PostsService from "@/services/apiService";

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        password: '',
        identity: ''
      },

      rules: {
        name: [
          { required: true, message: 'Please input username', trigger: 'blur' },
        ],
        identity: [
          { required: true, message: 'please select your identity', trigger: 'change' }
        ],
        password: [
          { required: true, message: 'Please input username', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.Login();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register(){
      this.$router.push({name:'Register'})
    },
    async Login(){
      
      this.$cookies.set("token","test",{expires: 60})
      console.log(this.$cookies.get("token"));
      if (this.$cookies.get(this.ruleForm.name) != null){

      }else{
        alert("ADAD")
      }
      // const apiResponse = await PostsService.Login(
      //   this.ruleForm.name,
      //   this.ruleForm.password,
      //   this.ruleForm.identity
      // )
      // console.log(apiResponse)
      // if(apiResponse.data.success == true){
      //   this.$message({
      //     message: apiResponse.data.description,
      //     type: 'success'
      //   });
      //   let store_info = {name:this.ruleForm.name, identity:this.ruleForm.identity}
      //   localStorage.setItem("user-info", JSON.stringify(store_info))
        
      //   this.$router.push({name:'Home_page'})
      // }else{
      //   this.$message.error(apiResponse.data.description,);
      // }
    }
  }
}
</script>