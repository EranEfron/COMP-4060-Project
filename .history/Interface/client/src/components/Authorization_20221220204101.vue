<template >
    <el-container class="homecontainer">
        <el-header>
            <div class="head">
                <el-menu class="el-menu-demo" mode="horizontal" text-color="#333" active-text-color="#545c64">
                    <el-menu-item index="1"><router-link to="/home_page">Home</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link to="/Upload">Upload</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link to="/QueryByID">Query By ID</router-link></el-menu-item>
                    <el-menu-item index="4"><router-link to="/Authorization">Authorization</router-link></el-menu-item>

                </el-menu>
            </div>
        </el-header>
        <el-main height="300px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home_page' }">Main Page</el-breadcrumb-item>
                <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <h1>Enter username to give access</h1>
            <div class="posts">
                <el-input v-model="input" placeholder="Enter docter's username" size="0px"></el-input>
                <br>
                <div class="submit_btn">
                    <el-button type="primary" @click="submit_auth">Submit</el-button>
                    <el-button type="primary" @click="query_auth">See the current docter</el-button>
                </div>

                <h1>Current docter with access</h1>
                <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'time', order: 'descending' }">
                    <el-table-column prop="name" label="Username" sortable width="180">
                    </el-table-column>
                    <!-- <el-table-column prop="size" label="File size" sortable width="180">
                    </el-table-column> -->
                    <el-table-column prop="time" sortable width="180" label="Access given time">
                    </el-table-column>
                    <el-table-column align="center" label="Action">
                        <template slot-scope="scope">
                            <el-button @click="delete_auth(scope.row)" type="text">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
            tableData: []
        };
    },

    methods: {
        async query_auth(){
            const cookie = this.$cookies.get("current_user")
            const apiResponse = await PostsService.queryCurrent_Auth(cookie.name);
            const JsonUser_list = JSON.parse(apiResponse.data.description)
            if(JsonUser_list.length == 0){
               
                this.$message({
                        showClose: true,
                        message: "You have not give access to anyone yet",
                        type: 'warning'
                    });

            }else{
            this.tableData = [];
            for(let i = 0; i<JsonUser_list.length;i++){
                let respond = JsonUser_list[i]
                let docter = {
                    name:respond.name,
                    time:respond.time
                }
                this.tableData.push(docter)
            }
        }
        },
        async delete_auth(row){
           console.log(row)
        },
        async submit_auth() {
            const cookie = this.$cookies.get("current_user")

            if (this.input.length > 0) {
                const apiResponse = await PostsService.Authorize(
                cookie.name,
                cookie.identity,
                this.input
                )
                console.log(apiResponse.data)
                if (apiResponse.data.success == true) {
                    this.$message({
                        showClose: true,
                        message: apiResponse.data.description,
                        type: 'success'
                    });

                } else {
                    this.$message.error(apiResponse.data.description);
                }
            } else {
                this.$message.closeAll();
                this.$message.error("You must enter a vaild username");
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
    margin-top: 20px;
}
</style>
  