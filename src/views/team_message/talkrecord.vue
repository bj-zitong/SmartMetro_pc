<template>
  <div>
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
            <el-table-column type="selection" width="65" prop="pShiftMeetingId" @selection-change="changeFun"></el-table-column>
            <el-table-column prop="uuid" label="编号" width="150"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="120"></el-table-column>
            <el-table-column prop="homeworkPart" label="作业部位" width="120"></el-table-column>
            <el-table-column prop="homeworkNumber" label="作业人数" width="120"></el-table-column>
            <el-table-column prop="jobContent" label="作业内容" width="200"></el-table-column>
            <el-table-column prop="isSafety" label="安全防护用品配套使用" width="120"></el-table-column>
            <el-table-column prop="meetingContent" label="班前讲话内容" width="100"></el-table-column>
            <el-table-column prop="workerInfo" label="参加活动作业人员名单" width="200"></el-table-column>
            <el-table-column label="视频附件" width="100" fixed="right">
              <template slot-scope="scope">
                <el-form :model="videoForm" ref="videoForm">
                  <el-form-item label="" prop="getVideo">
                    <el-upload
                      action
                      :on-change="handleChange(scope.row)"
                      :file-list="fileList"
                      accept=".mp4, .qlv, .qsv, .ogg, .flv, .avi, .wmv, .rmvb"
                      multiple
                      v-model="videoForm.getVideo"
                      @click="uploadVideo(scope.row)"
                      :auto-upload="false"
                    >
                  <img src="../../../static/image/shangchuan.png" style="width:26px;height:26px" />
                </el-upload>
                  </el-form-item>
                </el-form>

                <!--
                <i class="el-icon-upload" style="width:26px;height:26px"></i>-->
                <!-- <img
                  src="../../../static/image/shangchuan.png"
                  style="width:26px;height:26px"
                  @click="uploadVideo(scope.row)"
                />-->
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)" class="T-R-B-Green">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" class="T-R-B-Grey">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 total  //这是显示总共有多少数据，
                    pagesize //显示当前行的条数
                    sizes这是下拉框可以选择的，每选择一行，要展示多少内容
                     :page-sizes="[5, 10, 20, 40]" 下拉选择
                     layout="total, sizes, prev, pager, next, jumper"
        -->
        <el-pagination
          class="page-view"
          background
          @size-change="handleSizeChange"
          :current-page="page"
          layout="total, prev, pager,next"
          :page-size="pageSize"
          @prev-click="pre"
          @next-click="next"
          @current-change="handleCurrentChange"
          :total="total"
        ></el-pagination>
      </el-main>
    </div>
    <!--编辑讲话-->
    <el-dialog title="班前讲话记录" :visible.sync="outerVisible" width="25%" :center="true" :show-close="false" class="abow_dialog popupDialog">
      <el-form
        method="post"
        enctype="multipart/form-data"
        ref="formSpeech"
        :rules="formSpeechRules"
        :model="formSpeech"
        label-width="80px"
        action="http://192.168.1.164:8001/auth/user/baseUser"
      >
        <el-form-item prop="pShiftMeetingId">
          <el-input v-model="formSpeech.pShiftMeetingId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="jobsite" label="作业部位:">
          <el-input v-model="formSpeech.jobsite" placeholder="作业部位"></el-input>
        </el-form-item>
        <el-form-item prop="jobNum" label="作业人数：">
          <el-input v-model="formSpeech.jobNum" placeholder="作业人数"></el-input>
        </el-form-item>
        <el-form-item label="安全防护用品配套使用：" prop="protective">
          <el-select v-model="formSpeech.protective" placeholder="请选择" @change="selectProtective">
            <el-option
              v-for="item in protectives"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业内容:" prop="speachContent">
          <el-input type="textarea" :rows="6" placeholder="作业内容" v-model="formSpeech.speachContent"></el-input>
        </el-form-item>
        <el-form-item label="班前讲话内容:" prop="classContent">
          <el-input type="textarea" :rows="6" placeholder="内容" v-model="formSpeech.classContent"></el-input>
        </el-form-item>
        <el-form-item label="参加活动人员名单:">
          <el-button type="primary" @click="selectPerson()">点击选择</el-button>
        </el-form-item>
        <div class="dialog-footer" style="text-align:center;">
          <el-button @click="outerVisible = false" class="F-Grey" round>取 消</el-button>
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
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
export default {
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
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 0, //总条数
      ids: null, //选中的id
      outerVisible: false, //新增讲话
      innerVisible: false, //二层
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
        protective: [{ required: true, message: "请选择", trigger: "blur" }],
        speachContent: [
          { required: true, message: "请输入作业内容", trigger: "blur" }
        ],
        classContent: [
          { required: true, message: "请输入班前讲话内容", trigger: "blur" }
        ]
      },
      protectives: [
        { id: "", name: "请选择" },
        { id: "1", name: "xxxxxx" },
        { id: "2", name: "kkkkkk" },
        { id: "3", name: "tttttt" }
      ],
      selectedPersonIds: [],
      uploadUrl: "",
      videoForm:{
        getVideo :""
      }
    };
  },
  created: function() {
    this.getTalks();
  },
  methods: {
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    },
    handleChange(row,file, fileList) {
      // this.$refs.form.clearValidate();
      this.videoForm.getVideo=fileList;
      console.log(row.pShiftMeetingId);
      console.log(file);
      console.log(fileList);
    },
    handlePreview(row, file) {},
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      // this.getTalks()
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.getTalks();
      // console.log(this.page); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      // console.log("cpage" + cpage);
      // this.getTalks()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      // console.log("下一页" + cpage);
      // this.getTalks()
    },
    getTalks() {
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page
      });
      var url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/meeting/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.total;
          var rows = res.rows;
          this.tableData = rows;
          this.total = total;
        }
      });
      var result = [
        {
          pShiftMeetingId: 1,
          uuid: "001",
          createTime: "2020-4-12",
          homeworkPart: "作业部位1",
          workerInfo: "安保部一",
          homeworkNumber: 12,
          jobContent: "内容一",
          isSafety: "安全防护用品配套使用",
          meetingContent: "eeeeeee",
          workNum: "44444444444",
          accessoryPath: "22222222"
        },
        {
          pShiftMeetingId: 2,
          uuid: "002",
          createTime: "2020-4-13",
          homeworkPart: "作业部位2",
          workerInfo: "安保部2",
          homeworkNumber: 23,
          jobContent: "内容2",
          isSafety: "安全防护用品配套使用2",
          meetingContent: "33333333",
          workNum: "44444322222",
          accessoryPath: "444323222"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].pShiftMeetingId;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
      //  this.multipleSelection = val;
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
      // console.log("选中的pids" + ids);
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
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team/meeting";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
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
      var uid = row.pShiftMeetingId;
      var ids = [];
      ids.push(uid);
      var data = JSON.stringify(ids);
      handleCofirm("确认删除", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team/meeting";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
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
    uploadVideo(row) {
      var uid = row.pShiftMeetingId;
      this.id = uid;
      this.uploadUrl =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/" +
        uid +
        "/meeting/upload";
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
      if (this.selectedPersonIds != undefined) {
        for (var i = 0; i < this.selectedPersonIds.length; i++) {
          if (this.persons[i].containSpace == 1) {
            //这是默认选中上的
            this.$refs.multipleTable2.toggleRowSelection(this.persons[i], true);
          }
        }
      }
    },
    //编辑讲话
    handleEdit(row) {
      var uid = row.pShiftMeetingId;
      //获得详情
      var url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/" +
        uid +
        "/meeting";
      var datas = null;
      this.http.get(url, datas).then(res => {
        if (res.code == 200) {
          //回显
          var result = res.data;
          this.formSpeech.jobsite = result.homeworkPart;
          this.formSpeech.jobNum = result.homeworkNumber;
          this.formSpeech.protective = result.isSafety;
          this.formSpeech.speachContent = result.jobContent;
          this.formSpeech.classContent = result.meetingContent;
          this.formSpeech.checkIds = result.workerInfo;
          this.formSpeech.pShiftMeetingId =result.pShiftMeetingId;
        }
      });
       this.formSpeech.pShiftMeetingId =uid;
      this.outerVisible = true;
    },
    //修改讲话
    editFormSpeech(formSpeech) {
      this.$refs[formSpeech].validate(valid => {
        if (valid) {
          var form = this.$refs["formSpeech"].model;
          var datas = new FormData();
          datas.append("homeworkPart", form.jobsite);
          datas.append("homeworkNumber", form.jobNum);
          datas.append("isSafety", form.protective);
          datas.append("jobContent", form.speachContent);
          datas.append("meetingContent", form.classContent);
          datas.append("workerInfo", this.selectedPersonIds);
          datas.append("pShiftMeetingId", form.pShiftMeetingId);
          var url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team/"+form.pShiftMeetingId+"/meeting";
          this.http.put(url, datas).then(res => {
            if (res.code == 200) {
              this.outerVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus">
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
  margin-top: 10px;
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
