<template>

  <div class="loginBox">
    <h1>Register your account</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-ruleForm"
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
      <el-form-item label="Health Card ID" prop="id" :required="isHaveTo">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
        <el-button type="primary" @click="Login()">Login</el-button>
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

body {
  background-color: rgb(154, 193, 226);
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
    let validateID = (rule, value, callback) => {
      
        if(this.ruleForm.id == "" && this.isHaveTo){ 
          callback(new Error("Please input your Health card ID"))
        }else{  
          callback();
        }
    };
    return {

      ruleForm: {
        name: '',
        password: '',
        identity: '',
        id: ''
      },

      rules: {
        name: [
          { required: true, message: 'Please input username', trigger: 'blur' },
        ],
        identity: [
          { required: true, message: 'please select your identity', trigger: 'change' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' }
        ],
        id:[
          {validator: validateID}
        ]

      }
    };
  },
  computed:{
    isHaveTo: function() {
      return this.ruleForm.identity ==`Patient`;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerUser();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    Login() {
      this.$router.push({ name: 'Login' })
    },
    async registerUser() {
      const apiResponse = await PostsService.registerUser(
        this.ruleForm.name,
        this.ruleForm.password,
        this.ruleForm.identity,
        this.ruleForm.id
      )
      if(apiResponse.data.success == true){
        this.$message({
          message: apiResponse.data.description,
          type: 'success'
        });
      }else{
        this.$message.error(apiResponse.data.description,);
      }
      console.log(apiResponse.data.description)
    }
  }
}
</script>