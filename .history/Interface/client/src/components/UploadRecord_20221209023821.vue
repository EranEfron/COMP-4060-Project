<template>
    <div class="app-container">
      <div class="the-container">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          :action="actionUrl"
          :multiple="true"
          :show-file-list="true"
          :file-list="fileList"
          accept=".zip,.txt"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="handleBeforeUpload"
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :auto-upload="false"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
        <el-dialog
          title="请输入密码"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" show-password />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submitPass">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Index',
    data() {
      return {
        fileList: [],
        // 实际开发中actionUrl为后台API 比如`${location.origin}/demo/apis/test/api/upload`
        actionUrl: 'https://jsonplaceholder.typicode.com/posts/',
        // 此参数为是否显示对话框
        dialogVisible: false,
        ruleForm: {
          pass: ''
        }
      }
    },
    methods: {
      // 上传成功
      handleSuccess() {
        this.$refs.uploadRef.clearFiles()
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      },
      // 上传失败
      handleError() {
        this.$message({
          message: '上传失败',
          type: 'error'
        })
      },
      // 上传文件之前
      handleBeforeUpload(file) {
        const fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        const fileTypeList = ['zip', 'txt']
        if (!fileTypeList.includes(fileType)) {
          this.$message({
            message: '上传文件只能是zip,txt格式',
            type: 'error'
          })
          this.fileList = []
          return false
        }
        return true
      },
      // 上传文件数超过限制
      handleExceed() {
        this.$message({
          message: '最大上传文件个数为1',
          type: 'error'
        })
      },
      // 文件状态改变时
      handleChange(file) {
        console.log(file.status)
        if (file.status === 'ready') {
          this.dialogVisible = true
        }
      },
      // 关掉对话框时
      handleClose() {
        this.$refs.uploadRef.clearFiles()
        this.dialogVisible = false
      },
      // 提交密码
      submitPass() {
        console.log(this.ruleForm.pass)
        if (this.ruleForm.pass === '111111') {
          this.$refs.uploadRef.submit()
          this.dialogVisible = false
        } else {
          this.$message({
            message: '请输入正确的密码',
            type: 'error'
          })
          this.dialogVisible = false
          this.$refs.uploadRef.clearFiles()
        }
      }
    }
  }
  </script>
  
  <style scoped>
    .app-container {
      height: 100%;
      background-color: #f1f1f1;
    }
    .the-container{
      padding: 20px;
      height: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
    }
  </style>
