<template>
  <div class="container">
    <!-- <div class="container-head">
      <div style="margin-top:33px; position: absolute;">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="班组名称:">
            <el-input v-model="form.teamName" style="height:35px;width:500px;"></el-input>
            <i
              class="el-icon-search"
              style="position: absolute;top:8px;right: 8px;"
              @click="searchClass()"
            ></i>
          </el-form-item>
        </el-form>
      </div>
    </div>-->
    <div class="container-content">
      <div style="margin-top:30px;margin-left:30px;height:60px;width:100%;">
        <!-- <el-button @click="dialogFormVisible = true" class="addStyle">
          <span class="addStyle-title">新增</span>
        </el-button>-->
        <el-button type="info" @click="dialogFormVisible = true" class="T-H-B-DarkBlue">新增</el-button>
        <el-button type="info" @click="deleteAll" class="T-H-B-Grey">删除</el-button>
      </div>

      <div class="table-content" style="line-height:26px">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="changeFun"
          stripe
          :header-cell-style="headClass"
        >
          <el-table-column type="selection" prop="id" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="projectName" label="工程名称" width="150"></el-table-column>
          <el-table-column prop="teamName" label="班组名称" width="150"></el-table-column>
          <el-table-column prop="teamType" label="班组类型" width="100"></el-table-column>
          <el-table-column prop="teamLeaderName" label="班组长" width="100"></el-table-column>
          <el-table-column prop="teamLeaderPhone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="150"></el-table-column>
          <el-table-column label="操作" width="400" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)" type="success">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.row)" type="info">删除</el-button>
              <el-button size="mini" type="danger" @click="addEvalte(scope.row)">评价</el-button>
              <el-button size="mini" @click="addSpeech(scope.row)" type="primary">新增讲话</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 total  //这是显示总共有多少数据，
                    pagesize //显示当前行的条数
                    sizes这是下拉框可以选择的，每选择一行，要展示多少内容
                     :page-sizes="[5, 10, 20, 40]" 下拉选择
                     layout="total, sizes, prev, pager, next, jumper"
        -->
        <el-pagination
          style="text-align:center;padding:10px;"
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
      </div>
    </div>
    <!-- 新增 修改-->
    <el-dialog :visible.sync="dialogFormVisible" width="20%" title="新增班组" :center="true">
      <div class="addUser-content">
        <div class="login_box">
          <el-form
            method="post"
            enctype="multipart/form-data"
            ref="formClass"
            :rules="formRules"
            :model="formClass"
            action="http://192.168.1.164:8001/auth/user/baseUser"
          >
            <el-form-item prop="id">
              <el-input v-model="formClass.id" type="text" hidden></el-input>
            </el-form-item>
            <el-form-item prop="projectName">
              <el-input v-model="formClass.projectName" type="text" placeholder="工程名称"></el-input>
            </el-form-item>
            <el-form-item prop="groupName">
              <el-input v-model="formClass.groupName" placeholder="班组名称"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input v-model="formClass.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="groupLeader">
              <el-input v-model="formClass.groupLeader" placeholder="班组长"></el-input>
            </el-form-item>
            <el-select
              v-model="formClass.profession"
              placeholder="请选择班组类型"
              @change="selectProfession"
            >
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false" class="cancel-style">取 消</el-button>
              <el-button
                type="primary"
                @click="addClass('formClass')"
                style="border-radius:18px"
              >确 定</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!-- 评价-->
    <el-dialog title="评价" :visible.sync="dialogVisible" width="20%" :center="true" top="33vh">
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
          <el-button @click="dialogVisible = false" class="cancel-style">取 消</el-button>
          <el-button type="primary" @click="evaluate()" style="border-radius:18px">确 定</el-button>
        </div>
      </span>
    </el-dialog>
    <!--新增讲话-->
    <el-dialog title="班前讲话记录" :visible.sync="outerVisible" width="25%" :center="true">
      <div>
        <el-form
          method="post"
          enctype="multipart/form-data"
          ref="formSpeech"
          :rules="formSpeechRules"
          :model="formSpeech"
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
          <el-form-item label="参加活动人员名单:" prop="classContent">
            <el-button type="primary" @click="selectPerson()">点击选择</el-button>
          </el-form-item>
          <div class="dialog-footer">
            <el-button @click="outerVisible = false" class="cancel-style">取 消</el-button>
            <el-button
              type="primary"
              @click="addFormSpeech('formSpeech')"
              style="border-radius:18px"
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
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible= false" style="border-radius:18px">确 定</el-button>
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
      token: null, // token
      // 动态数据
      tableData: [],
      persons: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 0, //总条数
      ids: null, //选中的id
      form: {
        teamName: "" //搜索内容
      },
      dialogFormVisible: false, //新增
      dialogVisible: false, //评价
      outerVisible: false, //新增讲话
      innerVisible: false, //二层
      formClass: {
        projectName: "",
        groupName: "",
        phone: "",
        groupLeader: "",
        profession: "",
        id: null
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
          { required: true, message: "请选择班组类型", trigger: "blur" }
        ]
      },
      options: [
        // 来访部门
        { id: "", name: "请选择班组类型" },
        { id: "1", name: "类型一" },
        { id: "2", name: "类型二" },
        { id: "3", name: "类型三" }
      ],
      evaluatLevel: [
        { id: 1, name: "优" },
        { id: 2, name: "良" },
        { id: 3, name: "差" }
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
      ]
    };
    selectedPersonIds: [];
  },
  created: function() {
    this.getTalks();
  },
  methods: {
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    },
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      this.getTalks();
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
      this.getTalks();
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      // console.log("下一页" + cpage);
      this.getTalks();
    },
    getTalks() {
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page
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
          id: 1,
          projectName: "工程1",
          teamName: "班组一",
          teamType: "工地",
          teamLeaderName: "XXX",
          teamLeaderPhone: "15236985369",
          createTime: "2020-4-12"
        },
        {
          id: 2,
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
      console.log(this.$refs.multipleTable);
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].id;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
      //  this.multipleSelection = val;
    },
    changeFunPerson() {

      var ids =[];
      var arrays = this.$refs.multipleTable2.selection;
      console.log(this.$refs.multipleTable2)
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        ids.push(arrays[i].personId);
      }
      console.log(ids)
      this.selectedPersonIds = ids;
      return ids;
      // console.log("选中的pids" + ids);
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      // console.log(ids);
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
    selectEvaluate(vid) {
      let obj = {};
      obj = this.evaluatLevel.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.evaluated = obj.id;
      // console.log("选中" + this.evaluated);
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.id;
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
    uploadVideo(row) {
      var uid = row.id;
      // console.log(uid);
    },
    //编辑
    handleEdit(row) {
      var uid = row.id;
      this.id = uid;
      // console.log(uid);
      //获得详情
      var params = null;
      this.formClass.projectName = "123";
      this.formClass.id = 1;
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
        }
      });
      this.dialogFormVisible = true;
    },
    //新增
    addClass(formClass) {
      //this.$refs['formClass'].model.groupLeader
      //新增 id为空
      var form = this.$refs[formClass].model;
      if (form.id == null) {
        var params = JSON.stringify({
          projectName: form.projectName,
          teamName: form.groupName,
          teamType: form.profession,
          teamLeaderName: form.groupLeader,
          teamLeaderPhone: form.phone
        });
        var url =
          "/smart/worker/labour/" + sessionStorage.getItem("userId") + "/team";
        this.http.post(url, params).then(res => {
          if (res.code == 200) {
            this.dialogFormVisible = false;
          }
        });
      }
      //修改
      else {
        var params = JSON.stringify({
          projectName: form.projectName,
          teamName: form.groupName,
          teamType: form.profession,
          teamLeaderName: form.groupLeader,
          teamLeaderPhone: form.phone,
          id: form.id
        });
        var url =
          "/smart/worker/labour/" + sessionStorage.getItem("userId") + "/team";
        this.http.put(url, params).then(res => {
          if (res.code == 200) {
            this.dialogFormVisible = false;
          }
        });
      }
    },
    //评价
    evaluate() {
      //选中等级
      var evaluated = this.evaluated;
      var id = this.id;
      ///smart/worker/labour/{userId}/team
      var url =
        "/smart/worker/labour/" + sessionStorage.getItem("userId") + "/team";
      var params = JSON.stringify({ id: id, evaluate: evaluated });
      this.http.put(url, params).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false;
          this.getTalks();
        }
      });
      console.log(this.evaluated);
    },
    //添加评价
    addEvalte(row) {
      var uid = row.id;
      console.log(uid);
      this.dialogVisible = true;
      //设置全局变量
      this.id = uid;
    },
    //选择人员赋值
    selectPerson() {
      this.innerVisible = true;
      this.persons = [
        { personId: 1, jobNumber: "1111", personName: "aaaaa" },
        { personId: 2, jobNumber: "2222", personName: "bbbbb" },
        { personId: 3, jobNumber: "3333", personName: "ccccc" }
      ];
       if (this.selectedPersonIds != undefined) {
        for (var i = 0; i < this.selectedPersonIds.length; i++) {
          console.log(this.persons[i]);
          // this.$refs.multipleTable2.toggleRowSelection(
          //   this.persons[i],
          //   true
          // );
        }
      }
    },
    //讲话
    addSpeech(row) {
      this.outerVisible = true;
      this.id = row.id;
    },
    addFormSpeech(formSpeech) {
      var form = this.$refs["formSpeech"].model;
      var datas = new FormData();
      var pids = this.changeFunPerson();
      datas.append("homeworkPart", form.jobsite);
      datas.append("homeworkNumber", form.jobNum);
      datas.append("isSafety", form.protective);
      datas.append("jobContent", form.speachContent);
      datas.append("meetingContent", form.classContent);
      datas.append("workerInfoIds", pids);

      var url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/meeting";
      this.http.post(url, datas).then(res => {
        if (res.code == 200) {
          this.outerVisible = false;
        }
      });
    },
    cencal() {
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style scoped lang="stylus">
.container {
  background-color: rgba(246, 247, 248, 1);
  opacity: 1;
  background: rgba(246, 247, 248, 1);
  opacity: 1;

  .container-head {
    height: 100px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
    opacity: 1;
    border-radius: 10px;
    margin: 30px 30px 0 30px;
  }

  .container-content {
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 10px;
    padding: 30px;
    margin: 30px 30px 0 30px;

    .addStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(54, 130, 243, 1) 0%,
        rgba(0, 88, 162, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
      text-align: center;
    }

    .addStyle-title {
      color: #ffffff;
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }

  .table-content {
    margin-top: 10px;
  }
}

.dialog-footer {
  text-align: center;
  margin-top: 20px;
}

.cancel-style {
  border-radius: 18px;
  width: 80px;
  height: 35px;
  background: linear-gradient(180deg, rgba(225, 225, 225, 1) 0%, rgba(190, 190, 190, 1) 100%);
  opacity: 1;
}
</style>
<style lang="stylus">
.el-dialog__header {
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
}
</style>
