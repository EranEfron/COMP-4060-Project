<template>
    <div>
      <el-row>
        <el-col :span="24">
          
            <el-row style="float: left;margin-top: 10px;margin-bottom: 10px ">
              <el-col :span="24">
                <el-button type="primary" @click="dialogVisible=true">上传</el-button>
              </el-col>
            </el-row>
        </el-col>
      </el-row>
      
          <el-upload
            action
            class="upload-demo"
            drag
            :on-change="fileChange"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="httpRequest">确 定</el-button>
        </span>
      
    </div>
  
  </template>
  
  <script>
      export default {
          name: 'file',
          data() {
              return {
                  form: {
                      fileName: '',
                      current: 1,
                      size: 10
                  },
                  fileDataList: [],
                  dialogVisible: false,
                  file: ''
              }
          },
          methods: {
              // 下载文件
              downLoad(row) {
                  this.$http.get(
                      '/sysFile/downLoadFile',
                      {params: {fileId: row.fileId}},
                      {responseType: "blob"}
                  ).then((res) => {
                      let url = window.URL.createObjectURL(new Blob([res.data]));
                      let link = document.createElement("a");
                      link.style.display = "none";
                      link.href = url;
                      link.setAttribute("download", row.fileName); //指定下载后的文件名，防跳转
                      document.body.appendChild(link);
                      link.click();
                       // 释放内存
                      window.URL.revokeObjectURL(link.href)
                  }).catch(function (error) {
                      console.log(error);
                  });
              },
              // 加载文件
              async getFileList() {
                  this.$http.get('/sysFile/selectAll', {params: this.query}).then((res) => {
                      if (res.data.code == 0) {
                          this.fileDataList = res.data.data.records;
                          // this.total = res.data.data.total;
                      }
                  }).catch(function (error) {
                      console.log(error);
                  });
              },
              // 上传文件
              httpRequest() {
                  if (this.file == null) {
                      this.$message.warning('请选择需要上传的文件');
                      return false;
                  }
                  let params = new FormData();
                  params.append('file', this.file);
                  let config = {
                      headers: {'Content-Type': 'multipart/form-data'}
                  };
                  this.$http.post('/sysFile/uploadFile', params, config).then((res) => {
                      if (res.data.code == 0 || res.data.data.result == 'success') {
                          this.$message.success('文件上传成功');
                          this.dialogVisible = false;
                          this.file = '';
                          this.getFileList();
                      }
                  }).catch(function (error) {
                      console.log(error);
                  });
  
              },
              fileChange(file, fileList) {
                  this.file = file.raw;
              },
          },
          created() {
              this.getFileList();
          }
      }
  </script>
  <style scoped>
  </style>