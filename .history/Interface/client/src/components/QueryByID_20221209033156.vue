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
            <h1>Query Medical record</h1>
            <div class="posts">
                <h1>Query By Vim</h1>
                <form v-on:submit="queryByVim">
                    <input type="text" v-model="input.vim" placeholder="Enter Vim to Query">
                    <br>
                    <input type="submit" value="Query">
                    <br>
                    <br>
                    <span v-if="input">
                        <b>{{ input.data }}</b>
                    </span>
                    <br>
                </form>

                <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
                    <el-table-column prop="date" label="Timestamp" sortable width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="Name" sortable width="180">
                    </el-table-column>
                    <el-table-column prop="milage" label="Milage">
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
</template>
   
<script>
export default {
    name: "file",
    data() {
        return {
            fileDataList: [],
            file: ''
        }
    },
    methods: {
        submitUpload() {
            if (this.file == '') {
                this.$message.warning('please select a file');
            } else {
                console.log(this.file.name);

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
  