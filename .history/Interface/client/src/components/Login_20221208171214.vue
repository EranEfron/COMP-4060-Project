<template>
  
  <div class="loginBox">
    <h1>Log in to your account</h1>
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

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.loginBox {
  width: 340px;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background-color: #eee;
  border-radius: 15px;
}

.loginbody {
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
<script>
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
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>