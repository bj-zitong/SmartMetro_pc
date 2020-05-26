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

    <div class="container-content">
      <div style="margin-left:30px;height:60px;width:100%;">
        <!-- <el-button @click="dialogFormVisible = true" class="T-H-B-DarkBlue">新增</el-button> -->
        <el-button @click="deleteAll" class="T-H-B-Grey">删除</el-button>
      </div>
      <div class="table-content">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="changeFun"
          stripe
          :header-cell-style="headClass"
        >
          <el-table-column type="selection" prop="teamMasterId" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="projectName" label="工程名称" width="150"></el-table-column>
          <el-table-column prop="teamName" label="班组名称" width="150"></el-table-column>
          <el-table-column prop="teamType" label="班组类型" width="100"></el-table-column>
          <el-table-column prop="teamLeaderName" label="班组长" width="100"></el-table-column>
          <el-table-column prop="teamLeaderPhone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="150"></el-table-column>
          <el-table-column label="操作" width="400" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)" class="T-R-B-Green">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.row)" class="T-R-B-Grey">删除</el-button>
              <el-button size="mini" class="T-R-B-Orange" @click="addEvalte(scope.row)">评价</el-button>
              <el-button size="mini" @click="addSpeech(scope.row)" class="T-R-B-Blue">新增讲话</el-button>
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
    </div>
    <!-- 新增 修改-->
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="20%"
      title="修改班组"
      :center="true"
      :show-close="false"
      class="popupDialog"
    >
      <el-form
        method="post"
        enctype="multipart/form-data"
        ref="formClass"
        :rules="formRules"
        :model="formClass"
        label-width="80px"
        action="http://192.168.1.164:8001/auth/user/baseUser"
      >
        <el-form-item prop="teamMasterId">
          <el-input v-model="formClass.teamMasterId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="工程名称">
          <el-input v-model="formClass.projectName" type="text" placeholder="工程名称"></el-input>
        </el-form-item>
        <el-form-item prop="groupName" label="班组名称">
          <el-input v-model="formClass.groupName" placeholder="班组名称"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="formClass.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="groupLeader" label="班组长">
          <el-input v-model="formClass.groupLeader" placeholder="班组长"></el-input>
        </el-form-item>
        <el-form-item prop="profession" label="班组类型">
          <el-select
            v-model="formClass.profession"
            placeholder="请选择班组类型"
            @change="selectProfession"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <div class="dialog-footer">
          <el-button @click="cloneLaborForm('formClass')" round class="F-Grey">取 消</el-button>
          <el-button
            class="F-Blue"
            @click="addClass('formClass')"
            round
            style="margin-left:60px"
          >确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 评价-->
    <el-dialog
      title="评价"
      :visible.sync="dialogVisible"
      width="20%"
      :center="true"
      top="33vh"
      :show-close="false"
      class="popupDialog"
    >
      <span slot="footer" class="dialog-footer">
        <el-select
          v-model="evaluated"
          placeholder="请选择评价等级"
          @change="selectEvaluate"
          style="margin-bottom:25px;"
        >
          <el-option
            v-for="item in evaluatLevel"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="dialog-footer">
          <el-button @click="cancelEvate()" class="F-Grey" round>取 消</el-button>
          <el-button @click="evaluate()" class="F-Blue" style="margin-left:60px" round>确 定</el-button>
        </div>
      </span>
    </el-dialog>
    <!--新增讲话-->
    <el-dialog
      title="班前讲话记录"
      :visible.sync="outerVisible"
      width="25%"
      :center="true"
      :show-close="false"
      class="popupDialog abow_dialog"
    >
      <div>
        <el-form
          method="post"
          enctype="multipart/form-data"
          ref="formSpeech"
          :rules="formSpeechRules"
          :model="formSpeech"
          label-width="80px"
          action="http://192.168.1.164:8001/auth/user/baseUser"
        >
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
            <el-input
              type="textarea"
              :rows="6"
              placeholder="作业内容"
              v-model="formSpeech.speachContent"
            ></el-input>
          </el-form-item>
          <el-form-item label="班前讲话内容:" prop="classContent">
            <el-input type="textarea" :rows="6" placeholder="内容" v-model="formSpeech.classContent"></el-input>
          </el-form-item>
          <el-form-item label="参加活动人员名单:">
            <el-button type="primary" @click="selectPerson()">点击选择</el-button>
          </el-form-item>
          <div class="dialog-footer">
            <el-button @click="cancelSpeachForm('formSpeech')" class="F-Grey" round>取 消</el-button>
            <el-button
              class="F-Blue"
              @click="addFormSpeech('formSpeech')"
              round
              style="margin-left:60px"
            >确 定</el-button>
          </div>
        </el-form>
      </div>
      <el-dialog
        width="25%"
        title="选择人员"
        :visible.sync="innerVisible"
        append-to-body
        :center="true"
        :show-close="false"
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
          <el-button @click="innerVisible= false" class="F-Blue" round style="margin-left:60px">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "../../components/pagination";
export default {
  name: "container",
  components: {
    Pagination
  },
  data() {
    return {
      id: null, //当前选中的id
      token: null, // token
      // 动态数据
      tableData: [],
      persons: [],
      total: 0, //总条数
      ids: null, //选中的id
      form: {
        laborCompany: "" //搜索内容
      },
      dialogFormVisible: false, //新增
      dialogVisible: false, //评价
      outerVisible: false, //新增讲话
      innerVisible: false, //二层
      loading:true,
      formClass: {
        projectName: "",
        groupName: "",
        phone: "",
        groupLeader: "",
        profession: "",
        teamMasterId: null
      },
      formRules: {
        projectName: [
          { required: true, message: "请输入工程名称", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码"
          }
        ],
        groupName: [
          { required: true, message: "请输入班组名称", trigger: "blur" }
        ],
        groupLeader: [
          { required: true, message: "请输入班组长", trigger: "blur" }
        ],
        profession: [
          { required: true, message: "请选择班组类型", trigger: "change" }
        ]
      },
      options: [
        // 来访部门
        { id: undefined, name: "请选择班组类型" },
        { id: "1", name: "类型一" },
        { id: "2", name: "类型二" },
        { id: "3", name: "类型三" }
      ],
      evaluatLevel: [
        { id: 1, name: "优" },
        { id: 2, name: "良" },
        { id: 3, name: "差" }
      ],
      companys: [
        { id: 1, name: "劳务公司一" },
        { id: 2, name: "劳务公司二" },
        { id: 3, name: "劳务公司三" }
      ],
      evaluated: null, //选中的评价等级
      formSpeech: {
        //班前讲话
        jobsite: "",
        jobNum: null,
        protective: null,
        speachContent: "",
        classContent: "",
        numbers: null
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
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      }
    };
  },
  activated: function() {
    this.getTalks();
  },
  methods: {
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    },
    getTalks() {
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        company: this.form.laborCompany
      });
      //请求
      var url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/management";
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
          teamMasterId: 1,
          projectName: "工程1",
          teamName: "班组一",
          teamType: "工地",
          teamLeaderName: "XXX",
          teamLeaderPhone: "15236985369",
          createTime: "2020-4-12"
        },
        {
          teamMasterId: 2,
          projectName: "工程2",
          teamName: "班组二",
          teamType: "工地",
          teamLeaderName: "XXX",
          teamLeaderPhone: "15236984469",
          createTime: "2020-4-15"
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
        var id = arrays[i].teamMasterId;
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
      handleCofirm("确认删除")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
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
    // 下拉框获得值
    selectProfession(vid) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.form.profession = obj.id;
    },
    //选择下拉安全用品
    selectProtective(vid) {
      let obj = {};
      obj = this.protectives.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.formSpeech.protective = obj.id;
    },
    //选择劳务公司
    selectCompanys(vid) {
      let obj = {};
      obj = this.companys.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.form.laborCompany = obj.id;
    },
    selectEvaluate(vid) {
      let obj = {};
      obj = this.evaluatLevel.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.evaluated = obj.id;
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.teamMasterId;
      var ids = [];
      ids.push(uid);
      handleCofirm("确认删除", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team";
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
    //编辑
    handleEdit(row) {
      var uid = row.teamMasterId;
      this.id = uid;
      this.formClass = row;
      //获得详情
      var params = null;
      this.formClass.projectName = "123";
      this.formClass.teamMasterId = uid;
      var url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/" +
        uid +
        "/detail";
      this.http.get(url, params).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          var form = this.formClass;
          form.projectName = result.projectName;
          (form.groupName = result.teamName),
            (form.phone = result.teamLeaderPhone),
            (form.groupLeader = result.teamLeaderName),
            (form.profession = result.teamType),
            (form.teamMasterId = result.teamMasterId);
        }
      });
      this.dialogFormVisible = true;
    },
    //新增
    addClass(formClass) {
      this.$refs[formClass].validate(valid => {
        //校验
        if (valid) {
          //新增 id为空
          var form = this.$refs[formClass].model;
          var params = JSON.stringify({
            projectName: form.projectName,
            teamName: form.groupName,
            teamType: form.profession,
            teamLeaderName: form.groupLeader,
            teamLeaderPhone: form.phone,
            teamMasterId: form.teamMasterId
          });
          var url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team";
          this.http.put(url, params).then(res => {
            if (res.code == 200) {
              this.dialogFormVisible = false;
              this.$refs[formClass].resetFields();
            }
          });
        } else {
          return false;
        }
      });
    },
    cloneLaborForm(formClass) {
      this.$refs[formClass].resetFields();
      this.dialogFormVisible = false;
    },
    //评价
    evaluate() {
      //选中等级
      var evaluated = this.evaluated;
      var id = this.id;
      if (!evaluated) {
        this.$message("请选择");
        return false;
      }
      var url =
        "/smart/worker/labour/" + sessionStorage.getItem("userId") + "/team";
      var params = JSON.stringify({ teamMasterId: id, evaluate: evaluated });
      this.http.put(url, params).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false;
          this.evaluated = null;
          this.getTalks();
        }
      });
    },
    //取消
    cancelEvate() {
      this.dialogVisible = false;
      this.evaluated = null;
    },
    //添加评价
    addEvalte(row) {
      var uid = row.teamMasterId;
      this.dialogVisible = true;
      //设置全局变量
      this.id = uid;
    },
    //选择人员赋值
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
    //讲话
    addSpeech(row) {
      this.outerVisible = true;
      this.id = row.teamMasterId;
    },
    addFormSpeech(formSpeech) {
      this.$refs[formSpeech].validate(valid => {
        if (valid) {
          var form = this.$refs["formSpeech"].model;
          var datas = new FormData();
          var pids = this.changeFunPerson();
          datas.append("homeworkPart", form.jobsite);
          datas.append("homeworkNumber", form.jobNum);
          datas.append("isSafety", form.protective);
          datas.append("jobContent", form.speachContent);
          datas.append("meetingContent", form.classContent);
          datas.append("workerInfo", pids);
          datas.append("pTeamMasterId", this.id);
          var url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team/meeting";
          this.http.post(url, datas).then(res => {
            if (res.code == 200) {
              this.outerVisible = false;
              this.$refs[formSpeech].resetFields();
            }
          });
        } else {
          return false;
        }
      });
    },
    //cancelSpeachForm
    cancelSpeachForm(formSpeech) {
      this.outerVisible = false;
      this.$refs[formSpeech].resetFields();
    }
  }
};
</script>
<style scoped lang="stylus">
.container {
  .container-head {
    // width: 100%;
    height: 100px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
    opacity: 1;
    border-radius: 10px;
    margin: 30px 30px 0 30px;
  }

  background-color: rgba(246, 247, 248, 1);
  opacity: 1;
  background: rgba(246, 247, 248, 1);
  opacity: 1;

  .container-content {
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 10px;
    padding: 30px;
    margin: -30px 30px 0 30px;
  }

  .table-content {
    margin-top: 10px;
    line-height: 26px;
  }
}

.dialog-footer {
  text-align: center;
  margin-top: 20px;
}
</style>

