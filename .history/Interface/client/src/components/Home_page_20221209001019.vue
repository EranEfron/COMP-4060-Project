<template >
  <el-container class="homecontainer">
  <Header_page />
  <h2>Hhh</h2>
    <
  </el-container>
</template>
 
<script>
import Header_page from './Header_page.vue';
export default{
  name:"Home_page",
  components:{
    Header_page
  }
}
</script>
   
<style scoped>
.homecontainer {
  height: 763px;
  width: 100%;
  background-color: #E9EEF3;
}

.head {
  display: flex;
  flex-direction: row;
}

.div1 {
  width: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 2vw;
  text-align:center;
}

.div2 {
  margin-left: 1270px;
  margin-top: 30px;
  float: right;
  font-size: 12px;
}

.el-header {
  padding-top: 1px;
  padding-bottom: 1px;
  border-radius: 7px;
  justify-content: center;
  margin: auto;
  min-width: 50vw;
  background: "#E9EEF3";
  /* background-color: #4799e6aa; */
  color: #333;
  text-align: center;
  line-height: 10px;
  overflow: hidden;
}
.el-menu-demo{
  border-radius: 3px;
  background-color:#4799e6aa;
  overflow: hidden;
  margin-left: auto;
  float: right;
  
}
.el-menu--horizontal>.el-menu-item {
  border-radius: 3px;
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
}
.el-menu-item:hover {
  background-color: black;
  color:white
}
li.el-menu-item{
  border-radius: 10px;
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

.el-breadcrumb{
    background-color: rgb(230, 230, 230);
    height: 20px;
    width: max-content;
    padding: 1px 0.5vw;
    font-size: unset;
}

</style>

