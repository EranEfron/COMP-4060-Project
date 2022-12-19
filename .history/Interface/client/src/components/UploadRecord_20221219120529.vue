Skip to content
Search or jump to…
Pull requests
Issues
Codespaces
Marketplace
Explore
 
@Taotaoop 
liupengzhouyi
/
newworld
Public
Code
Issues
Pull requests
25
Actions
Projects
Security
Insights
newworld/src/components/AddFile.vue
@liupengzhouyi
liupengzhouyi 学生注册 V 1.0.7
Latest commit 640c2a5 on Apr 16, 2020
 History
 1 contributor
143 lines (135 sloc)  4.2 KB

<template>
    <div class="man-container">
        <div class="el-card">
            <div class="el-card__header">
                <slot name="header">
                    <p>文件上传</p>
                </slot>
            </div>
            <div class="el-card__body">
                <el-row style="margin: 0px">
                    <ul style="margin: 0;display: inline-block;">
                        <li>
                            <el-upload
                                    class="upload"
                                    ref="upload"
                                    action="string"
                                    :file-list="fileList"
                                    :auto-upload="false"
                                    :http-request="uploadFile"
                                    :on-change="handleChange"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    multiple="multiple">
                                <el-button slot="trigger" size="small" type="primary" @click="delFile">选取文件</el-button>
                                <el-button
                                        style="margin-left: 10px;"
                                        size="small"
                                        type="success"
                                        @click="submitUpload"
                                >上传到服务器</el-button>
                            </el-upload>
                        </li>
                    </ul>
                </el-row>
            </div>
        </div>
        <div>
            <h3>
                {{ info }}
            </h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddFile",
        data() {
            return {
                info: null,
                user: {},
                fileList: [],
                multiple: true,
                formData: "",
                options: [
                    {
                        value: "工作报告",
                        label: "工作报告"
                    },
                    {
                        value: "会议记录",
                        label: "会议记录"
                    }
                ],
                theme: ""
            };
        },
        mounted() {
            let user = window.localStorage.getItem("access-user");
            if (user) {
                user = JSON.parse(user);
                this.user = user;
            }
        },
        methods: {
            delFile() {
                this.fileList = [];
            },
            handleChange(file, fileList) {
                this.fileList = fileList;
            },
            uploadFile(file) {
                this.formData.append("file", file.file);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            submitUpload() {
                let that = this;
                let formData = new FormData();
                formData.append("theme", this.theme);
                formData.append("file", this.fileList[0].raw);
                this.$axios.post('/File/uploadFile', formData,
                    {"Content-Type": "multipart/form-data;charset=utf-8"}).
                then(
                    function (response) {
                        that.info = response.data
                    }
                )
            }
        }
    };
</script>

<style scoped>
    .man-container {
        margin: 0px;
        overflow: hidden;
        bottom: 0px;
        right: 0px;
        width: 100%;
        padding: 50px 20px 0px 20px;
    }
    .el-card {
        text-align: start;
        margin-left: auto;
        margin-right: auto;
        margin-top: 8px;
        border: 1px solid #ddd;
        width: 98%;
    }
    .el-card__header {
        border-top: 1px solid #373d41;
        border-bottom: 1px solid #ddd;
        padding: 8px 10px !important;
    }
    .el-card__body {
        padding: 15px !important;
    }
    .upload {
        min-width: 400px;
        width: 40%;
    }
</style>

Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
newworld/AddFile.vue at master · liupengzhouyi/newworld 