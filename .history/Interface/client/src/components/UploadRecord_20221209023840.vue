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
            <el-upload class="upload-demo" 
            drag 
            action="" 
            :auto-upload = false
            limit = 1>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drag file here or<em>click to upload</em></div>
            </el-upload>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Upload</el-button>
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
  