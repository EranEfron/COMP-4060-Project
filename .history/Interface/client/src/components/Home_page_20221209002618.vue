<template >
  <el-container class="homecontainer">
    <el-header>
      <div class="head">
        <el-menu class="el-menu-demo" mode="horizontal" text-color="#333" active-text-color="#ffd04b">
          <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/Update">Updata information</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/AddCar">Add car</router-link></el-menu-item>
          <el-menu-item index="4"><router-link to="/QueryByVim">Query By Vim</router-link></el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <el-container>
      <el-container>
        <el-main height="300px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">Main Page</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
 
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
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #73ace6;
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
</style>
