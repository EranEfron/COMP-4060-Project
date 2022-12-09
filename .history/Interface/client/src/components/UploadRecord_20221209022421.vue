<template >
    <el-container class="homecontainer">
        <el-header>
            <div class="head">
                <el-menu class="el-menu-demo" mode="horizontal" text-color="#333" active-text-color="#545c64">
                    <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link to="/Update">Updata information</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link to="/AddCar">Add car</router-link></el-menu-item>
                    <el-menu-item index="4"><router-link to="/QueryByVim">Query By Vim</router-link></el-menu-item>
                </el-menu>
            </div>
        </el-header>
        <el-main height="300px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/main' }">Main Page</el-breadcrumb-item>
                <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <h1>Upload Medical record</h1>
            <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <el-row style="float: left;margin-top: 10px;margin-bottom: 10px ">
            <el-col :span="24">
              <el-button type="primary" @click="dialogVisible=true">上传</el-button>
            </el-col>
          </el-row>
          <el-table
            stripe
            highlight-current-row
            border
            :data="fileDataList"
            style="width: 100%">
            <el-table-column
              prop="fileName"
              label="文件名"
              align="center"
              width="200">
            </el-table-column>
            <el-table-column
              prop="fileSize"
              label="文件大小"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fileTime"
              align="center"
              label="上传时间">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="downLoad(scope.row)" type="text">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="文件上传"
      :visible.sync="dialogVisible"
      center
      width="30%">
      <div style="text-align: center">
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
    </el-dialog>
  </div>
        </el-main>
    </el-container>
</template>
   
<script>
export default {
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        }
    }
}
</script>
<style scoped>
.homecontainer {
    height: 763px;
    width: 100%;

}

.head {
    display: flex;
    flex-direction: row;
}

.div1 {
    /* margin-top: 0px;
    margin-left: 0px; */
    text-align: center;
}

.div2 {
    margin-left: 1270px;
    margin-top: 30px;
    float: right;
    font-size: 12px;
}

.el-menu-demo {
    border-radius: 3px;
    background-color: #4799e6aa;
    overflow: hidden;

    float: left;

}

.el-header {
    background-color: #4799e6aa;
    color: #333;
    text-align: center;
    line-height: 10px;
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #010b16;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 10px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #010e1b;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.submit_btn {
    margin-top: 50px;
}
</style>
  