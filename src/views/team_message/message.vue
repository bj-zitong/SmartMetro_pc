<template>
  <div class="container">
    <div class="container-head">
      <div style="margin-top:33px; position: absolute;">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="班组名称:">
            <el-input v-model="form.className" style="height:35px;width:500px;"></el-input>
            <i
              class="el-icon-search"
              style="position: absolute;top:8px;right: 8px;"
              @click="searchClass()"
            ></i>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container-content">
      <div style="margin-top:30px;margin-left:30px;height:60px;width:100%;">
        <el-button @click="dialogFormVisible = true" class="addStyle">
          <span class="addStyle-title">新增</span>
        </el-button>
        <el-button
          type="info"
          @click="deleteAll"
          style="color:black;font-wight:bold;margin-left:15px;"
        >删除</el-button>
      </div>

      <div class="table-content">
        <el-table
          :data="tableData"
          ref="multipleTable"
          @selection-change="changeFun"
          stripe
          :header-cell-style="{background:'#0058A2'}"
        >
          <el-table-column type="selection" prop="userId" @selection-change="changeFun"></el-table-column>
          <el-table-column prop="projectName" label="工程名称" width="150"></el-table-column>
          <el-table-column prop="className" label="班组名称" width="150"></el-table-column>
          <el-table-column prop="classType" label="班组类型" width="100"></el-table-column>
          <el-table-column prop="classLeader" label="班组长" width="100"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="createDate" label="创建日期" width="150"></el-table-column>
          <el-table-column label="操作" width="500" fixed="right">
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
          hide-on-single-page
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 新增-->
    <el-dialog :visible.sync="dialogFormVisible" width="20%" title="新增班组" :center="true">
      <div class="addUser-content">
        <!-- <div class="button-head">
          <span class="button-head-title"></span>
        </div>-->
        <div class="login_box">
          <el-form
            method="post"
            enctype="multipart/form-data"
            ref="form"
            :rules="formRules"
            :model="formClass"
            action="http://192.168.1.164:8001/auth/user/baseUser"
          >
            <el-form-item prop="projectName">
              <el-input v-model="form.projectName" type="text" placeholder="工程名称"></el-input>
            </el-form-item>
            <el-form-item prop="groupName">
              <el-input v-model="form.groupName" placeholder="班组名称"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input v-model="form.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="groupLeader">
              <el-input v-model="form.groupLeader" placeholder="班组长"></el-input>
            </el-form-item>
            <el-select v-model="form.profession" placeholder="请选择班组类型" @change="selectProfession">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select
              v-model="form.profession"
              placeholder="请选择班组类型"
              @change="selectProfession"
              hidden="true"
            >
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false" class="cancel-style">取 消</el-button>
              <el-button type="primary" @click="addClass('form')" style="border-radius:18px">确 定</el-button>
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
            <el-select
              v-model="formSpeech.protective"
              placeholder="请选择"
              @change="selectProtective"
              hidden="true"
            >
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
            <el-button type="primary" @click="innerVisible = true">点击选择</el-button>
          </el-form-item>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false" class="cancel-style">取 消</el-button>
            <el-button type="primary" @click="addClass('form')" style="border-radius:18px">确 定</el-button>
          </div>
        </el-form>
      </div>
      <el-dialog width="25%" title="选择人员" :visible.sync="innerVisible" append-to-body>
        <el-input v-model="checkedCities" placeholder></el-input>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
 const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      token: null, // token
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      ids: null, //选中的id
      form: {
        className: "" //搜索内容
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
        profession: ""
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
        { id: 1, name: "类型一" },
        { id: 2, name: "类型二" },
        { id: 3, name: "类型三" }
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
        { id: 1, name: "xxxxxx" },
        { id: 2, name: "kkkkkk" },
        { id: 3, name: "tttttt" }
      ],
      checkPerson: null, //选中的人员
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  created: function() {
    this.getTalks();
  },
  methods: {
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      // this.getTalks()
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.getTalks();
      console.log(this.page); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      console.log("cpage" + cpage);
      // this.getTalks()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      console.log("下一页" + cpage);
      // this.getTalks()
    },
    //搜索
    searchClass() {
      console.log(this.form.className);
    },
    getTalks() {
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page
      });
      var url = "";
      var result = [
        {
          userId: 1,
          projectName: "工程1",
          className: "班组一",
          classType: "工地",
          classLeader: "XXX",
          phone: "15236985369",
          createDate: "2020-4-12"
        },
        {
          userId: 2,
          projectName: "工程2",
          className: "班组二",
          classType: "工地",
          classLeader: "XXX",
          phone: "15236984469",
          createDate: "2020-4-15"
        }
      ];
      this.tableData = result;
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].userId;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
      // console.log("选中的ids"+ids);
      //  this.multipleSelection = val;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      console.log(ids);
      var url = "";
      // this.$http({
      //   // 头部信息及编码格式设置
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: sessionStorage.getItem('token')
      //   },
      //   method: 'DELETE', // 请求的方式
      //   url: url, // 请求地址
      //   // 传参
      //   data: ids
      // })
      //   .then(function(response) {
      //     var res = response.data
      //     // 请求失败
      //     if (res.code != '200') {
      //     }
      //     // 请求成功
      //     if (res.code == '200') {
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error)
      //   })
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
      console.log("选中" + this.evaluated);
    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.userId;
      var url = "";
      console.log(uid);
      // this.$http({
      //   // 头部信息及编码格式设置
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: sessionStorage.getItem("token")
      //   },
      //   method: "DELETE", // 请求的方式
      //   url: url, // 请求地址
      //   // 传参
      //   data: uid
      // })
      //   .then(function(response) {
      //     var res = response.data;
      //     // 请求失败
      //     if (res.code != "200") {
      //     }
      //     // 请求成功
      //     if (res.code == "200") {
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    uploadVideo(row) {
      var uid = row.userId;
      console.log(uid);
    },
    //编辑
    handleEdit(row) {
      var uid = row.userId;
      console.log(uid);
    },
    //新增
    addClass(form) {
      console.log(this.form);
    },
    //评价
    evaluate() {
      this.dialogVisible = false;
      console.log(this.evaluated);
    },
    addEvalte(row) {
      var uid = row.userId;
      console.log(uid);
      this.dialogVisible = true;
    },
    //讲话
    addSpeech(row) {
      this.outerVisible = true;
    },
    cencal() {
      this.dialogFormVisible = false;
    },
   handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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

  .container-content {
    // width: 100%;
    // height: 600px;
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
