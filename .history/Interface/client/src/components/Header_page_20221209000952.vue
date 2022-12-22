<template>
     <el-header>
      
        <el-menu class="el-menu-demo" mode="horizontal" text-color="#333" active-text-color="#ffd04b">
          <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/Update">Updata information</router-link></el-menu-item>
          <el-menu-item index="3" ><router-link to="/AddCar">Add car</router-link></el-menu-item>
          <el-menu-item index="4" ><router-link to="/QueryByVim">Query By Vim</router-link></el-menu-item>
          
        </el-menu>
     
    </el-header>
</template>


<script>
export default{
    name:'Header_page'
}
</script>