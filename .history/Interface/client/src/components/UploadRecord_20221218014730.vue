<template >
    <el-container class="homecontainer">
        <el-header>
            <div class="head">
                <el-menu class="el-menu-demo" mode="horizontal" text-color="#333" active-text-color="#545c64">
                    <el-menu-item index="1"><router-link to="/home_page">Home</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link to="/Upload">Upload</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link to="/QueryByID">Query By ID</router-link></el-menu-item>
                </el-menu>
            </div>
        </el-header>
        <el-main height="300px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home_page' }">Main Page</el-breadcrumb-item>
                <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <h1>Upload Medical record</h1>
            <el-upload action class="upload-demo" drag :limit="1" :on-change="fileChange" :auto-upload="false"
                :on-exceed="handleExceed">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drag file here or <em>click to upload</em></div>
            </el-upload>
            <div class="submit_btn">
                <span slot="footer" class="footer">
                    <el-button type="primary" @click="submitUpload">Upload</el-button>
                </span>
            </div>
        </el-main>
    </el-container>
</template>
   
<script>
import PostsService from "@/services/apiService";

export default {
    name: "file",
    data() {
        return {
            fileDataList: [],
            file: ''
        }
    },
    methods: {
        async submitUpload() {
            if (this.file == '') {
                this.$message.warning('please select a file');
            } else {
                const cookie = this.$cookies.get("current_user")
                const apiResponse = await PostsService.UploadFile(
                cookie.name,
                cookie.identity,
                this.file
                )

            }

        },
        fileChange(file, fileList) {
            this.file = file.raw;
        },
        handleExceed() {
            this.$message.warning(`Limit to upload only 1 document, please merge if you have mutiple files`);
        },
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
  