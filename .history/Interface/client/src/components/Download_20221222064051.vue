<template >
  <el-container class="homecontainer">
    <el-header>
      <div class="head">
        <el-menu class="el-menu-demo" mode="horizontal" text-color="#333" active-text-color="#545c64">
          <el-menu-item index="1"><router-link to="/home_page">Home</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/Upload">Upload</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/Download">Download</router-link></el-menu-item>
          <el-menu-item index="4"><router-link to="/Authorization">Authorization</router-link></el-menu-item>

        </el-menu>
      </div>
    </el-header>
    <el-main height="300px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home_page' }">Main Page</el-breadcrumb-item>
        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
      </el-breadcrumb>

      <h1>Search Medical record</h1>
      <div class="posts">
        <el-input v-model="input" placeholder="Enter docter's username" size="0px" style="width:450px"></el-input>
        <div class="submit_btn">
          <el-button type="primary" @click="query_record">Sreach</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
          <el-table-column prop="name" label="File Name" sortable width="180">
          </el-table-column>
          <el-table-column prop="time" label="Upload Timestamp" sortable width="180">
          </el-table-column>
          <el-table-column prop="uploadby" label="Upload By" sortable width="180">
          </el-table-column>
          <el-table-column prop="dataOwner" label="Owned By" sortable width="180">
          </el-table-column>
          <el-table-column align="center" label="Action">
            <template slot-scope="scope">
              <el-button @click="Preview(scope.row)" type="text">Preview</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog class ="" title= "Record" :visible.sync="dialogVisible" fullscreen:true >

        <span v-if = "recordData">
          <b>{{ recordData }}</b>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>
   

<script>
import PostsService from "@/services/apiService";

export default {
  name: "response",
  data() {
    return {
      input: "",
      tableData: [],
      dialogVisible: false,
      recordData:""
    };
  },

  methods: {
    async query_record() {
      const cookie = this.$cookies.get("current_user")
      if (cookie == null) {
        this.$message.closeAll();
        this.$message({
          onclose: true,
          message: "Your session is expired, please log in again",
          type: 'warning'
        });
        this.$router.push({ name: 'Login' })

      } else {
        if (this.input == "") {
          this.$message.closeAll();
          this.$message({
            showClose: true,
            message: "You must enter a vaild username",
            type: 'error'
          });

        } else {
          this.tableData = [];
          const apiResponse = await PostsService.getRecord(this.input, cookie.name)
          if (apiResponse.data.success == true) {
            const respondList = JSON.parse(apiResponse.data.description);
            let FileData = {
              name: respondList.recordName,
              time: respondList.timeStamp,
              uploadby: respondList.uploadby,
              dataOwner: respondList.dataOwner
            }
            this.tableData.push(FileData);
          } else {
            this.$message.closeAll();
            this.$message({
              showClose: true,
              message: apiResponse.data.description,
              type: 'error'
            });
          }
        }
      }
    },
    async Preview(row) {

      const cookie = this.$cookies.get("current_user")
      if (cookie == null) {
        this.$message.closeAll();
        this.$message({
          onclose: true,
          message: "Your session is expired, please log in again",
          type: 'warning'
        });
        this.$router.push({ name: 'Login' })
      } else {
        const apiResponse = await PostsService.previewFile(
          row.name
        )
        if (apiResponse.data.success == true) {
          console.log(apiResponse.data.description)
          this.dialogVisible = true;
          this.recordData = apiResponse.data.description;
        } else {
          this.$message({
            showClose: true,
            message: apiResponse.data.description,
            type: 'error'
          });
        }
        console.log(apiResponse.data);
      }
    },
    formatter(row, column) {
      return row.address;
    }
  }
};
</script>
  
<style scoped>
.homecontainer {
  height: 763px;
  width: 100%;

}
.dialog-innertext{
  white-space: :pre-wrap;
}
.roll-dialog{
    padding: 3px 30px;
    overflow-y: scroll;
    height: 400px;

}
.head {
  display: flex;
  flex-direction: row;
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



.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 10px;
}

.submit_btn {
  margin-top: 10px;
  margin-bottom: 25px;
}
</style>
  