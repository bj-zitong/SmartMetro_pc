<template>
  <div class="main-box">
    <!-- 筛选 -->
    <div class="R-L-S screen-form">
      <el-form :inline="true" ref="screenForm" :model="screenForm" class="screen-form-h">
        <el-form-item label="姓名：">
          <el-input placeholder="请输入姓名" v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryClick">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="R-L-T table-main">
      <div style="margin-bottom: 30px;">
        <el-upload
          style="display:inline-block; margin-right: 10px;"
          class="upload-demo"
          ref="upload"
          v-model="file.uploadFile"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :show-file-list="showFileList"
          :on-change="changeImg"
        >
          <el-button slot="trigger" class="T-H-B-SkyBlue" type="primary">上传</el-button>
        </el-upload>
        <el-button class="T-H-B-Grey" @click="deleteAllClick">删除</el-button>
        <!-- <el-button class="T-H-B-DarkGreen" @click="downloadClick">下载</el-button> -->
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        :header-cell-style="headClass"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="changeFun"
      >
        <el-table-column
          type="selection"
          width="65"
          prop="pOutlanderId"
          @selection-change="changeFun"
        ></el-table-column>
        <el-table-column prop="rank" label="名次"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="labourCompany" label="劳务单位"></el-table-column>
        <el-table-column prop="team" label="所在班组"></el-table-column>
        <el-table-column prop="workType" label="工种"></el-table-column>
        <el-table-column prop="trainingType" label="培训类型"></el-table-column>
        <el-table-column prop="score" label="分数"></el-table-column>
        <el-table-column prop="examTime" label="考试时间" width="180"></el-table-column>
        <el-table-column prop="examPath" label="试卷"></el-table-column>
        <el-table-column label="关联闸机" fixed="right" prop="isRelationQate">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              class="T-R-B-Green"
              size="mini"
              @click="fillinScoreClick(scope.$index, scope.row)"
            >填写分数</el-button>
            <el-button
              class="T-R-B-Grey"
              size="mini"
              @click="downloadClick(scope.$index, scope.row)"
            >下载试卷</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
          class="pagination-box"
          v-if="total>0"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getDatelist"
        />
    </div>
    <el-dialog :visible.sync="dialogFormVisible" width="20%" center :show-close="false">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        :label-position="labelPosition"
      >
        <el-form-item label="分数" prop="score">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEvate()" class="F-Grey" round>取 消</el-button>
        <el-button
          @click="determineClick('ruleForm')"
          class="F-Blue"
          style="margin-left:60px"
          round
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "@/components/pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      value: true,
      csvVisible: false,
      showFileList: false,
      tableData: [
        {
          pScoreId: 0,
          pInfoId: 0,
          rank: "一级",
          name: "地铁安保部",
          labourCompany: "210234567898765876",
          team: 15236985236,
          workType: "木工",
          trainingType: "安保部一",
          score: "100",
          examTime: "10:00",
          examPath: "试卷",
          isRelationQate: "true",
          status:true
        },
        {
          pScoreId: 1,
          pInfoId: 1,
          name: "地铁安保部",
          rank: "二级",
          labourCompany: "210234567898765876",
          team: 15236985236,
          workType: "木工",
          trainingType: "安保部一",
          score: "100",
          examTime: "10:00",
          examPath: "试卷",
          isRelationQate: "true",
          status:false
        }
      ],
      rules: {
        score: [{ required: true, message: "请输入分数", trigger: "blur" }]
      },
      form: {
        score: ""
      },
      labelPosition: "left",
      name: "",
      //分页
      total: 50,
      dialogFormVisible: false,
      pInfoId: "",
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      multipleSelection: [],
      screenForm: {
        grouping: "",
        person: "",
        type: ""
      },
      file: {
        uploadFile: ""
      },
      fileList: []
    };
  },
  mounted() {
    this.getDatelist();
  },
  methods: {
    //列表请求
    getDatelist() {
      var params = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        name: this.name
      });
      // ​/smart​/worker​/train​/{userId}​/score​/management
      var url =
        "​/smart​/worker​/train​/" +
        sessionStorage.getItem("userId") +
        "/score​/management";
      this.http.post(url, params).then(res => {
        if (res.code == 200) {
          var rows = res.rows;
          this.tableData = rows;
          this.total = res.total;
        }
        var result = [
          {
            pInfoId: 0,
            name: "地铁安保部",
            labourCompany: "210234567898765876",
            team: 15236985236,
            workType: "木工",
            trainingType: "安保部一",
            score: "100",
            examTime: "10:00",
            examPath: "试卷",
            isRelationQate: "true"
          },
          {
            pInfoId: 1,
            name: "地铁安保部",
            labourCompany: "210234567898765876",
            team: 15236985236,
            workType: "木工",
            trainingType: "安保部一",
            score: "100",
            examTime: "10:00",
            examPath: "试卷",
            isRelationQate: "true"
          }
        ];
        this.tableData = result;
        this.total = result.length;
      });
    },
    changeImg(file, fileList) {
      this.file.uploadFile = fileList;
      console.log(this.file.uploadFile);
      console.log(this.file.uploadFile[0].raw);
    },


    //下载试卷
    downloadClick(index,row) {
      handleCofirm("确认下载吗")
        .then(res => {
          // var data = JSON.stringify(ids);
          var url =
            "/smart/worker/train/" +
            sessionStorage.getItem("userId") +
            "/common/"+row.pScoreId+"/download";
            // /smart/worker/train/{userId}/common/{resourcePoolId}/download
          this.http.get(url, {}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "下载成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消下载"
          });
        });
    },
    //查询
    queryClick() {
      this.getDatelist();
    },
    //关联闸机
    changeSwitch(state) {
      console.log(state);
    },
    changeFun() {},
    //点击填写分数弹出框
    fillinScoreClick(index, row) {
      this.pInfoId = row.pInfoId;
      this.dialogFormVisible = true;
    },
    myUpload(content) {
      console.log(content);
      let formData = new FormData();
      formData.append("file", content.file); // 'file[]' 代表数组 其中`file`是可变的
      // request
      //   .post(content.action, formData)
      //   .then(rs => {
      //     this.$store.dispatch("GetInfo");
      //   })
      //   .catch(err => {
      //     this.$store.dispatch("LogMessage", "用户头像上传失败!");
      //     console.log(err);
      //   });
    },
    //上传文件
    uploadFile(row) {
      this.csvVisible = true;
    },
    //文件导入
    importCsv() {
      // console.log(this.file.uploadFile[0].raw);
      console.log(this.file.uploadFile);
      var url =
        "/smart/worker/train/" +
        sessionStorage.getItem("userId") +
        "/score/upload";
      var data = new FormData();
      data.append("file", this.file.uploadFile[0].raw);
      this.http.get(url, data).then(res => {
        if (res.code == 200) {
          // this.getOtherStaffs();
        }
      });
    },
    handleChange() {},
    //确认填写分数
    determineClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = JSON.stringify({
            pScoreId: this.pInfoId,
            score: this.form.score
          });
          var url =
            "​/smart/worker/train/" +
            sessionStorage.getItem("userId") +
            "​/score​";
          this.http.put(url, params).then(res => {
            if (res.code == 200) {
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //多选
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].pInfoId;
        ids.push(id);
      }
      return ids;
    },
    //多选删除
    deleteAllClick() {
      var ids = this.changeFun();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除吗")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/train/" +
            sessionStorage.getItem("userId") +
            "/score";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancelEvate() {
      this.dialogFormVisible = false;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    onScreen() {},
    uploadQuestionsClick() {},
    deleteBatchClick() {},
    downBatchClick() {},
    //  表格操作

    //  数据表格-表头样式
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    }
  }
};
</script>

<style lang="stylus" scoped>
.R-L-wrap {
  width: 100%;
  height: 100%;
}

.R-L-S, .R-L-T {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
}

.upload-demo {
  float: left;
}

.screen-form-h {
  height: 36px;
}
</style>

