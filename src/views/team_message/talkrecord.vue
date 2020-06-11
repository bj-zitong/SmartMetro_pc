<template>
  <div class="container">
    <div style="padding:30px;">
      <el-container>
        <el-menu class="main-top-box pl30">
          <el-form :inline="true" ref="form" :model="form">
            <el-form-item prop="laborCompany" label="劳务公司">
              <el-select v-model="form.laborCompany" placeholder="请选择" @change="selectCompanys">
                <el-option
                  v-for="item in companys"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getTalks()" style="margin-left:30px;">查询</el-button>
            </el-form-item>
          </el-form>
        </el-menu>
      </el-container>
    </div>
    <div class="main-content">
      <el-main class="button-head">
        <el-button
          class="T-H-B-Grey"
          @click="deleteAll"
          style="margin-left:30px;color:black;font-wight:bold"
        >删除</el-button>
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun"
            :header-cell-style="headClass"
            stripe
          >
            <el-table-column
              type="selection"
              width="65"
              prop="pShiftMeetingId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="uid" label="编号" width="50"></el-table-column>
            <el-table-column prop="homeworkPart" label="作业部位" width="100"></el-table-column>
            <el-table-column prop="homeworkNumber" label="作业人数" width="80"></el-table-column>
            <el-table-column prop="jobContent" label="作业内容" width="200"></el-table-column>
            <el-table-column prop="isSafety" label="安全防护用品配套使用" width="100"></el-table-column>
            <el-table-column prop="meetingContent" label="班前讲话内容" width="150"></el-table-column>
            <el-table-column prop="workerInfoIds" label="参加活动作业人员名单" width="200"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="150"></el-table-column>
            <el-table-column prop="updateTime" label="修改日期" width="150"></el-table-column>
            <!-- accessoryPath 路径-->
            <el-table-column label="视频附件" width="100" fixed="right">
              <template slot-scope="scope">
                <img
                  src="../../../static/image/shangchuan.png"
                  style="width:26px;height:26px"
                  @click="uploadVideo(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)" class="T-R-B-Green">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" class="T-R-B-Grey">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            class="pagination-box"
            v-if="total>0"
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getTalks"
          />
        </div>
      </el-main>
    </div>
    <!--编辑讲话-->
    <el-dialog
      top="30px"
      title="班前讲话记录"
      :visible.sync="outerVisible"
      width="25%"
      style="height:100%"
      :center="true"
      :show-close="false"
      class="popupDialog"
    >
      <el-form
        method="post"
        enctype="multipart/form-data"
        ref="formSpeech"
        :rules="formSpeechRules"
        :model="formSpeech"
        label-width="80px"
        action
      >
        <el-form-item prop="pshiftMeetingId">
          <el-input v-model="formSpeech.pshiftMeetingId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="homeworkPart" label="作业部位:">
          <el-input v-model="formSpeech.homeworkPart" placeholder="作业部位"></el-input>
        </el-form-item>
        <el-form-item prop="homeworkNumber" label="作业人数：">
          <el-input v-model="formSpeech.homeworkNumber" placeholder="作业人数"></el-input>
        </el-form-item>
        <el-form-item label="安全防护用品配套使用：" prop="isSafety">
          <el-select v-model="formSpeech.isSafety" placeholder="请选择" @change="selectProtective">
            <el-option
              v-for="item in protectives"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业内容:" prop="jobContent">
          <el-input type="textarea" :rows="6" placeholder="作业内容" v-model="formSpeech.jobContent"></el-input>
        </el-form-item>
        <el-form-item label="班前讲话内容:" prop="meetingContent">
          <el-input type="textarea" :rows="6" placeholder="内容" v-model="formSpeech.meetingContent"></el-input>
        </el-form-item>
        <el-form-item label="参加活动人员名单:">
          <el-button type="primary" @click="selectPerson()">点击选择</el-button>
        </el-form-item>
        <div class="dialog-footer" style="text-align:center;">
          <el-button @click="cancelForm('formSpeech')" class="F-Grey" round>取 消</el-button>
          <el-button
            type="primary"
            @click="editFormSpeech('formSpeech')"
            class="F-Blue"
            round
            style="margin-left:60px"
          >确 定</el-button>
        </div>
      </el-form>
      <el-dialog
        width="25%"
        title="选择人员"
        :visible.sync="innerVisible"
        append-to-body
        :center="true"
      >
        <el-table
          :data="persons"
          style="width: 100%"
          ref="multipleTable2"
          @selection-change="changeFunPerson"
          :header-cell-style="headClass"
          stripe
        >
          <el-table-column type="selection" prop="personId" @selection-change="changeFunPerson"></el-table-column>
          <el-table-column prop="jobNumber" label="工号" width="180"></el-table-column>
          <el-table-column prop="personName" label="姓名" width="180"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false" class="F-Grey" round>取 消</el-button>
          <el-button
            type="primary"
            @click="innerVisible= false"
            class="F-Blue"
            round
            style="margin-left:60px"
          >确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
    <!--- 视频上传-->
    <el-dialog :visible.sync="csvVisible" width="50%">
      <div>
        <el-form ref="file" label-width="120px">
          <el-form-item label="视频上传：" prop="videoForm">
            <el-upload
              class="upload-demo"
              v-model="videoForm.getVideo"
              action
              accept=".mp4, .qlv, .qsv, .ogg, .flv, .avi, .wmv, .rmvb"
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="false"
              :limit="1"
              :show-file-list="true"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">上传视频</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="csvVisible = false">取消</el-button>
        <el-button type="primary" @click="impotVideo()">导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "../../components/pagination";
import axios from "axios";
export default {
  name: "container",
  components: {
    Pagination
  },
  data() {
    return {
      id: null, //当前选中的id
      updateForm: {
        file: ""
      },
      token: null, // token
      // 动态数据
      tableData: [],
      persons: [],
      total: 0, //总条数
      ids: null, //选中的id
      outerVisible: false, //新增讲话
      innerVisible: false, //二层
      csvVisible: false,
      fileList: [], //上传
      formSpeech: {
        //班前讲话
        jobsite: "",
        jobNum: null,
        protective: null,
        speachContent: "",
        classContent: "",
        numbers: null,
        pShiftMeetingId: null
      },
      formSpeechRules: {
        jobsite: [
          { required: true, message: "请输入作业部位", trigger: "blur" }
        ],
        jobNum: [
          { required: true, message: "请输入作业人数", trigger: "blur" }
        ],
        protective: [{ required: true, message: "请选择", trigger: "change" }],
        speachContent: [
          { required: true, message: "请输入作业内容", trigger: "blur" }
        ],
        classContent: [
          { required: true, message: "请输入班前讲话内容", trigger: "blur" }
        ]
      },
      protectives: [
        { id: "", name: "请选择" },
        { id: "0", name: "是" },
        { id: "1", name: "否" }
      ],
      selectedPersonIds: [],
      uploadUrl: "",
      videoForm: {
        getVideo: ""
      },
      form: {
        laborCompany: ""
      },
      companys: [],
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      }
    };
  },
  activated: function() {
    this.getTalks();
    this.companys = [];
    var data = JSON.stringify({
      pageSize: 100,
      page: 1
    });
    //请求
    var url =
      "/bashUrl/smart/worker/labour/" +
      sessionStorage.getItem("userId") +
      "/company/management";
    this.http.post(url, data).then(res => {
      if (res.code == 200) {
        var rows = res.data.rows;
        this.companys.push({ id: 0, name: "请选择" });
        for (var i = 0; i < rows.length; i++) {
          this.companys.push({
            id: rows[i].pLabourCompanyId,
            name: rows[i].company
          });
        }
      }
    });
  },
  methods: {
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    },
    handleChange(file, fileList) {
      this.$refs.file.clearValidate();
      // this.file.uploadFile = fileList;
      this.videoForm.getVideo = file.raw;
    },
    impotVideo() {
      var url =
        "/bashUrl/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/" +
        "/meeting/" +
        this.id +
        "/upload";
      var data = new FormData();
      data.append("file", this.videoForm.getVideo);
      // this.http.post(url, data).then(res => {
      //   if (res.code == 200) {
      //     this.getOtherStaffs();
      //   }
      // });
      axios({
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.getItem("token")
        },
        url: url,
        data: data,
        timeout: 5000 //响应时间
      }).then(
        res => {
          if (res.code == 200) {
            this.getOtherStaffs();
            this.csvVisible = false;
            this.$message({
              type: "success",
              message: "上传成功!"
            });
          }
        },
        err => {}
      );
      // axios.post(url, data, {headers: {'Content-Type': 'multipart/form-data',Authorization: sessionStorage.getItem("token")}}).then(res => {
      //   if (res.code == 200) {

      //   }
      // }).catch(error => {
      //   alert('更新用户数据失败' + error)
      // })
    },
    handlePreview(row, file) {},
    getTalks() {
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        pLabourCompanyId: this.form.laborCompany
      });
      var url =
        "/bashUrl/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/meeting/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.data.total;
          var rows = res.rows;
          this.tableData = res.data.rows;
          this.total = total;
        }
      });
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].pshiftMeetingId;
        ids.push(id);
      }
      return ids;
    },
    changeFunPerson() {
      var ids = [];
      var arrays = this.$refs.multipleTable2.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        ids.push(arrays[i].personId);
      }
      this.selectedPersonIds = ids;
      return ids;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team/meeting";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTalks();
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
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.pshiftMeetingId;
      var ids = [];
      ids.push(uid);
      var data = JSON.stringify(ids);
      handleCofirm("确认删除", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team/meeting";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTalks();
            }
          });
          this.getTalks();
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    uploadVideo(row) {
      var uid = row.pshiftMeetingId;
      this.id = uid;
      this.csvVisible = true;
    },
    //选择下拉安全用品
    selectProtective(vid) {
      let obj = {};
      obj = this.protectives.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.formSpeech.protective = obj.id;
    },
    selectPerson() {
      this.innerVisible = true;
      this.persons = [
        { personId: 1, jobNumber: "1111", personName: "aaaaa" },
        { personId: 2, jobNumber: "2222", personName: "b5bbbb" },
        { personId: 3, jobNumber: "3333", personName: "cc999ccc" }
      ];
      // if (this.selectedPersonIds != undefined) {
      //   for (var i = 0; i < this.selectedPersonIds.length; i++) {
      //     if (this.persons[i].containSpace == 1) {
      //       //这是默认选中上的
      //       this.$refs.multipleTable2.toggleRowSelection(this.persons[i], true);
      //     }
      //   }
      // }
    },
    //编辑讲话
    handleEdit(row) {
      var uid = row.pshiftMeetingId;
      // this.formSpeech = row;
      //获得详情
      var url =
        "/bashUrl/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/meeting/" +
        uid;
      var datas = null;
      this.http.get(url, datas).then(res => {
        if (res.code == 200) {
          //回显
          this.formSpeech = res.data;
          this.selectedPersonIds = res.data.workerInfoIds;
          // this.formSpeech.jobsite = result.homeworkPart;
          // this.formSpeech.jobNum = result.homeworkNumber;
          // this.formSpeech.protective = result.isSafety;
          // this.formSpeech.speachContent = result.jobContent;
          // this.formSpeech.classContent = result.meetingContent;
          // this.formSpeech.checkIds = result.workerInfo;
          // this.formSpeech.pShiftMeetingId = result.pShiftMeetingId;
        }
      });
      this.formSpeech.pShiftMeetingId = uid;
      this.outerVisible = true;
    },
    //修改讲话
    editFormSpeech(formSpeech) {
      this.$refs[formSpeech].validate(valid => {
        if (valid) {
          var form = this.$refs[formSpeech].model;
          var ids = this.changeFunPerson().toString();
          form.workerInfoIds = ids;
          var datas = JSON.stringify(form);
          var url =
            "/bashUrl/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team/meeting";
          this.http.put(url, datas).then(res => {
            if (res.code == 200) {
              this.$refs[formSpeech].resetFields();
              this.outerVisible = false;
              this.$message({
                type: "success",
                message: "编辑成功!"
              });
              this.getTalks();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelForm(formSpeech) {
      this.outerVisible = false;
      this.$refs[formSpeech].resetFields();
    },
    //选择劳务公司
    selectCompanys(vid) {
      let obj = {};
      obj = this.companys.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.form.laborCompany = obj.id;
    }
  }
};
</script>
<style scoped lang="stylus">
.container-head {
  // width: 100%;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
  margin: 0px 30px 0 30px;
}

.el-header, .el-footer {
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
  padding: 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  color: #333;
  opacity: 1;
  border-radius: 10px;
  height: 100px;
}

.el-container {
  margin-bottom: 36px;
}

.glry {
  padding-top: 30px;

  .demo-form-inline {
    margin-left: 30px;
  }

  .region {
    margin-left: 60px;
  }

  el-input {
    width: 180px;
  }
}

.main-content {
  margin-top: -60px;
  margin-left: 30px;
  margin-right: 30px;

  .button-head {
    padding: 30px;
    height: 600px;
  }

  .table-content {
    margin-top: 30px;
  }

  .page-view {
    text-align: center;
    margin-top: 30px;
  }
}
</style>


